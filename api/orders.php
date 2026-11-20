<?php

require_once __DIR__ . '/db.php';
cssp_start_session();

function cssp_order_size($type, $size)
{
    if ($type === 'Shoes') {
        $shoeSizes = array(
            '7' => array('PH 7', 'EU 41', '26.0 cm'),
            '8' => array('PH 8', 'EU 42', '26.7 cm'),
            '9' => array('PH 9', 'EU 43', '27.3 cm'),
            '10' => array('PH 10', 'EU 44', '28.0 cm'),
            '11' => array('PH 11', 'EU 45', '28.7 cm'),
        );
        return isset($shoeSizes[$size]) ? $shoeSizes[$size][0] : null;
    }

    $uniformSizes = array(
        'S' => 'Small',
        'M' => 'Medium',
        'L' => 'Large',
        'XL' => 'X-Large',
        '2XL' => 'XX-Large',
    );
    return isset($uniformSizes[$size]) ? $uniformSizes[$size] : null;
}

function cssp_admin_orders($connection)
{
    $statement = $connection->query(
        'SELECT o.id, o.order_no, o.status, o.currency, o.subtotal, o.shipping_fee, o.total,
                o.contact_name, o.contact_email, o.contact_phone, o.shipping_address, o.notes,
                o.created_at, u.full_name AS account_name,
                oi.product_name, oi.size, oi.unit_price, oi.quantity, oi.line_total
         FROM orders o
         LEFT JOIN users u ON u.id = o.user_id
         LEFT JOIN order_items oi ON oi.order_id = o.id
         ORDER BY o.created_at DESC, o.id DESC
         LIMIT 200'
    );

    $orders = array();
    while ($row = $statement->fetch()) {
        $id = (int) $row['id'];
        if (!isset($orders[$id])) {
            $orders[$id] = array(
                'order_no' => $row['order_no'],
                'status' => $row['status'],
                'currency' => $row['currency'],
                'subtotal' => (float) $row['subtotal'],
                'shipping_fee' => (float) $row['shipping_fee'],
                'total' => (float) $row['total'],
                'contact_name' => $row['contact_name'],
                'contact_email' => $row['contact_email'],
                'contact_phone' => $row['contact_phone'],
                'shipping_address' => $row['shipping_address'],
                'notes' => $row['notes'],
                'created_at' => $row['created_at'],
                'account_name' => $row['account_name'],
                'items' => array(),
            );
        }
        if ($row['product_name'] !== null) {
            $orders[$id]['items'][] = array(
                'product_name' => $row['product_name'],
                'size' => $row['size'],
                'unit_price' => (float) $row['unit_price'],
                'quantity' => (int) $row['quantity'],
                'line_total' => (float) $row['line_total'],
            );
        }
    }
    return array_values($orders);
}

try {
    $connection = cssp_db();
    $user = cssp_current_user($connection);
    if (!$user) {
        cssp_json_response(401, array('error' => 'Sign in to continue.'));
    }

    $method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';
    if ($method === 'GET') {
        if (!in_array($user['role'], array('owner', 'admin'), true)) {
            cssp_json_response(403, array('error' => 'Administrator access is required.'));
        }
        cssp_json_response(200, array('orders' => cssp_admin_orders($connection)));
    }

    if ($method !== 'POST') {
        header('Allow: GET, POST');
        cssp_json_response(405, array('error' => 'Method not allowed.'));
    }

    $data = cssp_json_input();
    cssp_require_csrf($data);
    $phone = isset($data['phone']) && is_string($data['phone']) ? trim($data['phone']) : '';
    $address = isset($data['address']) && is_string($data['address']) ? trim($data['address']) : '';
    $city = isset($data['city']) && is_string($data['city']) ? trim($data['city']) : '';
    $postal = isset($data['postal_code']) && is_string($data['postal_code']) ? trim($data['postal_code']) : '';
    $notes = isset($data['notes']) && is_string($data['notes']) ? trim($data['notes']) : '';
    $currency = isset($data['currency']) && is_string($data['currency'])
        ? $data['currency']
        : 'PHP';
    $items = isset($data['items']) && is_array($data['items']) ? $data['items'] : array();

    if ($phone === '' || strlen($phone) > 30 || $address === '' || strlen($address) > 1200 ||
        $city === '' || strlen($city) > 120 || $postal === '' || strlen($postal) > 20) {
        cssp_json_response(422, array('error' => 'Complete the required delivery details.'));
    }
    if (strlen($notes) > 1000) {
        cssp_json_response(422, array('error' => 'Order notes must be 1,000 characters or fewer.'));
    }
    $rates = array('PHP' => 1, 'USD' => 0.0172, 'EUR' => 0.0159);
    if (!isset($rates[$currency])) {
        cssp_json_response(422, array('error' => 'Choose a supported currency.'));
    }
    if (!$items || count($items) > 40) {
        cssp_json_response(422, array('error' => 'Your cart is empty or has too many different items.'));
    }

    $requested = array();
    foreach ($items as $item) {
        if (!is_array($item)) {
            cssp_json_response(422, array('error' => 'One or more cart items are invalid. Review your cart and try again.'));
        }
        $sku = isset($item['sku']) && is_string($item['sku']) ? trim($item['sku']) : '';
        $size = isset($item['size']) && is_string($item['size']) ? trim($item['size']) : '';
        $quantityValue = isset($item['quantity']) ? $item['quantity'] : null;
        $quantity = is_int($quantityValue) || is_string($quantityValue)
            ? filter_var($quantityValue, FILTER_VALIDATE_INT)
            : false;
        if (!preg_match('/^[A-Z]{3}-PR[0-9]{1,2}$/', $sku) || !$quantity || $quantity < 1 || $quantity > 999) {
            cssp_json_response(422, array('error' => 'One or more cart items are invalid. Review your cart and try again.'));
        }
        $key = $sku . '|' . $size;
        if (!isset($requested[$key])) {
            $requested[$key] = array('sku' => $sku, 'size' => $size, 'quantity' => 0);
        }
        $requested[$key]['quantity'] += $quantity;
        if ($requested[$key]['quantity'] > 999) {
            cssp_json_response(422, array('error' => 'Item quantity exceeds the order limit.'));
        }
    }

    $connection->beginTransaction();
    $productQuery = $connection->prepare(
        'SELECT id, sku, name, type, price, stock_qty
         FROM products WHERE sku = :sku AND is_active = 1 AND is_hidden = 0
         FOR UPDATE'
    );
    $products = array();
    foreach ($requested as $key => $line) {
        $productQuery->execute(array('sku' => $line['sku']));
        $product = $productQuery->fetch();
        if (!$product) {
            $connection->rollBack();
            cssp_json_response(422, array('error' => 'A product in your cart is no longer available.'));
        }
        $storedSize = cssp_order_size($product['type'], $line['size']);
        if ($storedSize === null) {
            $connection->rollBack();
            cssp_json_response(422, array('error' => 'Choose a valid size for every item.'));
        }
        if ((int) $product['stock_qty'] < $line['quantity']) {
            $connection->rollBack();
            cssp_json_response(409, array('error' => $product['name'] . ' does not have enough stock for that quantity.'));
        }
        $line['product'] = $product;
        $line['stored_size'] = $storedSize;
        $products[$key] = $line;
    }

    $subtotal = 0;
    foreach ($products as $line) {
        $unitPrice = round((float) $line['product']['price'] * $rates[$currency], 2);
        $subtotal += $unitPrice * $line['quantity'];
    }
    $subtotal = round($subtotal, 2);
    $orderNo = 'CSSP-' . date('ymd') . '-' . strtoupper(bin2hex(random_bytes(4)));
    $shippingAddress = $address . "\n" . $city . ' ' . $postal;

    $connection->prepare(
        'INSERT INTO orders (order_no, user_id, status, currency, subtotal, shipping_fee, total,
                             contact_name, contact_email, contact_phone, shipping_address, notes)
         VALUES (:order_no, :user_id, \'pending\', :currency, :subtotal, 0, :total,
                 :contact_name, :contact_email, :phone, :address, :notes)'
    )->execute(array(
        'order_no' => $orderNo,
        'user_id' => (int) $user['id'],
        'currency' => $currency,
        'subtotal' => $subtotal,
        'total' => $subtotal,
        'contact_name' => $user['full_name'],
        'contact_email' => $user['email'],
        'phone' => $phone,
        'address' => $shippingAddress,
        'notes' => $notes !== '' ? $notes : null,
    ));
    $orderId = (int) $connection->lastInsertId();
    $insertItem = $connection->prepare(
        'INSERT INTO order_items (order_id, product_id, product_name, size, unit_price, quantity)
         VALUES (:order_id, :product_id, :product_name, :size, :unit_price, :quantity)'
    );
    $decrementStock = $connection->prepare(
        'UPDATE products SET stock_qty = stock_qty - :quantity_to_subtract
         WHERE id = :id AND stock_qty >= :minimum_quantity'
    );
    foreach ($products as $line) {
        $product = $line['product'];
        $unitPrice = round((float) $product['price'] * $rates[$currency], 2);
        $insertItem->execute(array(
            'order_id' => $orderId,
            'product_id' => (int) $product['id'],
            'product_name' => $product['name'],
            'size' => $line['stored_size'],
            'unit_price' => $unitPrice,
            'quantity' => $line['quantity'],
        ));
        $decrementStock->execute(array(
            'quantity_to_subtract' => $line['quantity'],
            'id' => (int) $product['id'],
            'minimum_quantity' => $line['quantity'],
        ));
        if ($decrementStock->rowCount() !== 1) {
            throw new RuntimeException('Stock changed during order creation.');
        }
    }
    $connection->commit();
    cssp_json_response(201, array(
        'order_no' => $orderNo,
        'status' => 'pending',
        'currency' => $currency,
        'total' => $subtotal,
    ));
} catch (PDOException $error) {
    if (isset($connection) && $connection->inTransaction()) {
        $connection->rollBack();
    }
    error_log('CSSP order database error: ' . $error->getMessage());
    cssp_json_response(503, array('error' => 'Orders are unavailable. Check the database setup and try again.'));
} catch (RuntimeException $error) {
    if (isset($connection) && $connection->inTransaction()) {
        $connection->rollBack();
    }
    error_log('CSSP order transaction error: ' . $error->getMessage());
    cssp_json_response(409, array('error' => 'Stock changed while you were checking out. Review your cart and try again.'));
}

