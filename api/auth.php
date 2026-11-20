<?php

require_once __DIR__ . '/db.php';
cssp_start_session();

function cssp_record_login($connection, $userId, $email, $result, $reason)
{
    $statement = $connection->prepare(
        'INSERT INTO login_logs (user_id, email_attempted, result, fail_reason, ip_address, user_agent)
         VALUES (:user_id, :email, :result, :reason, :ip, :agent)'
    );
    $statement->execute(array(
        'user_id' => $userId,
        'email' => substr($email, 0, 190),
        'result' => $result,
        'reason' => $reason,
        'ip' => isset($_SERVER['REMOTE_ADDR']) ? substr($_SERVER['REMOTE_ADDR'], 0, 45) : null,
        'agent' => isset($_SERVER['HTTP_USER_AGENT']) ? substr($_SERVER['HTTP_USER_AGENT'], 0, 255) : null,
    ));
}

function cssp_sign_in($connection, $user)
{
    session_regenerate_id(true);
    $_SESSION['user_id'] = (int) $user['id'];
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    $connection->prepare('UPDATE users SET last_login_at = NOW() WHERE id = :id')
        ->execute(array('id' => (int) $user['id']));
    cssp_record_login($connection, (int) $user['id'], $user['email'], 'success', null);
}

try {
    $connection = cssp_db();
    $method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';
    $action = isset($_GET['action']) ? $_GET['action'] : '';

    if ($method === 'GET' && $action === 'session') {
        $user = cssp_current_user($connection);
        cssp_json_response(200, array(
            'authenticated' => (bool) $user,
            'user' => $user ? cssp_public_user($user) : null,
            'csrf_token' => $_SESSION['csrf_token'],
        ));
    }

    if ($method !== 'POST') {
        header('Allow: GET, POST');
        cssp_json_response(405, array('error' => 'Method not allowed.'));
    }

    $data = cssp_json_input();
    cssp_require_csrf($data);

    if ($action === 'login') {
        $email = isset($data['email']) && is_string($data['email'])
            ? strtolower(trim($data['email']))
            : '';
        $password = isset($data['password']) && is_string($data['password'])
            ? $data['password']
            : '';
        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $password === '') {
            cssp_json_response(422, array('error' => 'Enter a valid email and password.'));
        }

        $statement = $connection->prepare(
            'SELECT id, full_name, email, phone, password_hash, role, status
             FROM users WHERE email = :email AND is_hidden = 0 LIMIT 1'
        );
        $statement->execute(array('email' => $email));
        $user = $statement->fetch();
        $valid = $user && $user['status'] === 'active' && password_verify($password, $user['password_hash']);
        if (!$valid) {
            cssp_record_login(
                $connection,
                $user ? (int) $user['id'] : null,
                $email,
                'failed',
                $user && $user['status'] !== 'active' ? 'account_not_active' : 'invalid_credentials'
            );
            cssp_json_response(401, array('error' => 'Email or password is incorrect, or the account is not active.'));
        }

        cssp_sign_in($connection, $user);
        cssp_json_response(200, array(
            'authenticated' => true,
            'user' => cssp_public_user($user),
            'csrf_token' => $_SESSION['csrf_token'],
        ));
    }

    if ($action === 'register') {
        $name = isset($data['full_name']) && is_string($data['full_name'])
            ? trim($data['full_name'])
            : '';
        $email = isset($data['email']) && is_string($data['email'])
            ? strtolower(trim($data['email']))
            : '';
        $password = isset($data['password']) && is_string($data['password'])
            ? $data['password']
            : '';
        if (strlen($name) < 2 || strlen($name) > 120) {
            cssp_json_response(422, array('error' => 'Enter your name (2 to 120 characters).'));
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 190) {
            cssp_json_response(422, array('error' => 'Enter a valid email address.'));
        }
        if (strlen($password) < 8) {
            cssp_json_response(422, array('error' => 'Password must be at least 8 characters.'));
        }

        $statement = $connection->prepare(
            'INSERT INTO users (full_name, email, password_hash, role, status)
             VALUES (:name, :email, :password_hash, \'customer\', \'active\')'
        );
        try {
            $statement->execute(array(
                'name' => $name,
                'email' => $email,
                'password_hash' => password_hash($password, PASSWORD_DEFAULT),
            ));
        } catch (PDOException $error) {
            if ($error->getCode() === '23000') {
                cssp_json_response(409, array('error' => 'An account already uses that email.'));
            }
            throw $error;
        }

        $user = array(
            'id' => (int) $connection->lastInsertId(),
            'full_name' => $name,
            'email' => $email,
            'phone' => '',
            'role' => 'customer',
        );
        cssp_sign_in($connection, $user);
        cssp_json_response(201, array(
            'authenticated' => true,
            'user' => cssp_public_user($user),
            'csrf_token' => $_SESSION['csrf_token'],
        ));
    }

    if ($action === 'logout') {
        cssp_require_csrf($data);
        $_SESSION = array();
        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $params['path'], '', $params['secure'], $params['httponly']);
        }
        session_destroy();
        cssp_json_response(200, array('authenticated' => false));
    }

    cssp_json_response(404, array('error' => 'Unknown authentication action.'));
} catch (PDOException $error) {
    error_log('CSSP auth database error: ' . $error->getMessage());
    cssp_json_response(503, array('error' => 'Account service is unavailable. Check the database setup and try again.'));
}

