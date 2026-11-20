<?php

function cssp_start_session()
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $secure = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
    session_name('CSSPSESSID');
    session_set_cookie_params(array(
        'lifetime' => 0,
        'path' => '/',
        'secure' => $secure,
        'httponly' => true,
        'samesite' => 'Lax',
    ));
    session_start();

    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
}

function cssp_db()
{
    static $connection = null;
    if ($connection instanceof PDO) {
        return $connection;
    }

    $host = getenv('CSSP_DB_HOST') ?: '127.0.0.1';
    $name = getenv('CSSP_DB_NAME') ?: 'wbdv_dashboard';
    $user = getenv('CSSP_DB_USER') ?: 'root';
    $password = getenv('CSSP_DB_PASSWORD');
    if ($password === false) {
        $password = '';
    }

    $dsn = 'mysql:host=' . $host . ';dbname=' . $name . ';charset=utf8mb4';
    $connection = new PDO($dsn, $user, $password, array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ));
    return $connection;
}

function cssp_json_response($status, $payload)
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($payload);
    exit;
}

function cssp_json_input()
{
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        cssp_json_response(400, array('error' => 'Request body must be valid JSON.'));
    }
    return $data;
}

function cssp_require_csrf($data)
{
    $token = isset($data['csrf_token']) && is_string($data['csrf_token'])
        ? $data['csrf_token']
        : '';
    if (empty($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $token)) {
        cssp_json_response(403, array('error' => 'Your session expired. Refresh the page and try again.'));
    }
}

function cssp_current_user($connection)
{
    if (empty($_SESSION['user_id'])) {
        return null;
    }

    $statement = $connection->prepare(
        'SELECT id, full_name, email, phone, role FROM users
         WHERE id = :id AND status = \'active\' AND is_hidden = 0'
    );
    $statement->execute(array('id' => (int) $_SESSION['user_id']));
    $user = $statement->fetch();
    if (!$user) {
        unset($_SESSION['user_id']);
        session_regenerate_id(true);
        return null;
    }
    return $user;
}

function cssp_public_user($user)
{
    return array(
        'id' => (int) $user['id'],
        'full_name' => $user['full_name'],
        'email' => $user['email'],
        'phone' => isset($user['phone']) ? $user['phone'] : '',
        'role' => $user['role'],
    );
}

