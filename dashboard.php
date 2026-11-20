<?php
require_once __DIR__ . '/api/db.php';
cssp_start_session();

try {
  $dashboardConnection = cssp_db();
  $dashboardUser = cssp_current_user($dashboardConnection);
} catch (PDOException $error) {
  error_log('CSSP dashboard database error: ' . $error->getMessage());
  http_response_code(503);
  exit('The dashboard is unavailable. Check the database setup and try again.');
}

if (!$dashboardUser) {
  header('Location: ./products.php?auth=required');
  exit;
}
if (!in_array($dashboardUser['role'], array('owner', 'admin'), true)) {
  http_response_code(403);
  exit('Administrator access is required.');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>People &amp; Access | CSSP Garments Trading</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <script src="./js files/site_state.js?v=1"></script>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter+Tight:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
  <link rel="stylesheet" href="./css files/dashboard.css?v=3">
</head>
<body>
<div class="app">

  <!-- SIDEBAR -->
  <aside class="side" id="side">
    <div class="side-brand">
      <img src="assets/logo.png" alt="" onerror="this.remove()">
      <div><b>CSSP GARMENTS</b><span>Trading Dashboard</span></div>
    </div>
    <div class="side-lbl">Workspace</div>
    <nav class="side-nav" id="sideNav">
      <button class="on" data-view="overview"><em>01</em>Overview</button>
      <button data-view="accounts"><em>02</em>User Accounts &amp; Logs</button>
      <button data-view="products"><em>03</em>Product Workspace</button>
      <button data-view="orders"><em>04</em>Orders</button>
    </nav>
    <div class="side-foot">
      <a href="./products.php"><i class="fa-solid fa-arrow-left"></i>Back to shop</a>
      <button type="button" class="side-logout" id="dashboardLogout" data-csrf="<?= htmlspecialchars($_SESSION['csrf_token'], ENT_QUOTES, 'UTF-8') ?>"><i class="fa-solid fa-right-from-bracket"></i>Logout</button>
    </div>
  </aside>

  <!-- MAIN -->
  <div class="main">
    <header class="top">
      <button class="ic menu-btn" id="menuBtn" aria-label="Menu"><i class="fa-solid fa-bars"></i></button>
      <h1 id="topTitle">People &amp; Access</h1>
      <div class="top-r">
        <span class="who">Signed in as <b><?= htmlspecialchars($dashboardUser['full_name'], ENT_QUOTES, 'UTF-8') ?></b></span>
        <button class="ic" id="themeBtn" aria-label="Toggle theme"><i class="fa-solid fa-circle-half-stroke"></i></button>
      </div>
    </header>

    <!-- OVERVIEW -->
    <section class="view on" id="v-overview">
      <div class="head">
        <div>
          <p class="eyebrow">CSSP Garments Trading / People</p>
          <h2>Welcome, <?= htmlspecialchars($dashboardUser['full_name'], ENT_QUOTES, 'UTF-8') ?>.</h2>
          <p class="sub">Manage account access and review recent sign-in activity.</p>
        </div>
        <span class="chip y">Administrator view</span>
      </div>
      <div class="stats" id="stats"></div>

      <div class="grid2">
        <div class="card">
          <div class="card-h"><h3>Recent sign-ins</h3><button class="link" data-go="accounts" data-tab="logs">View all logs</button></div>
          <div id="recentLogs"></div>
        </div>
        <div class="card">
          <div class="card-h"><h3>Needs attention</h3></div>
          <div id="attention"></div>
        </div>
      </div>
    </section>

    <!-- ACCOUNTS & LOGS -->
    <section class="view" id="v-accounts">
      <div class="head">
        <div>
          <p class="eyebrow">People &amp; access</p>
          <h2>Registered accounts</h2>
          <p class="sub">Review registrations, edit details and control account access in one place.</p>
        </div>
        <button class="btn dark" id="addBtn"><i class="fa-solid fa-plus"></i><span id="addLbl">Add account</span></button>
      </div>

      <div class="tabs" id="tabs">
        <button class="on" data-tab="users">User accounts</button>
        <button data-tab="logs">Login logs</button>
      </div>

      <div class="bar">
        <div class="search"><i class="fa-solid fa-magnifying-glass"></i><input id="q" placeholder="Search..." autocomplete="off"></div>
        <select id="f1"></select>
        <select id="f2"></select>
        <label class="sw"><input type="checkbox" id="showHidden"><span class="track"></span>Show hidden</label>
        <span class="count" id="count"></span>
        <span class="chip y push">Administrator controls enabled</span>
      </div>

      <div class="table-wrap">
        <table id="tbl"><thead></thead><tbody></tbody></table>
        <div class="empty" id="empty" hidden><i class="fa-regular fa-folder-open"></i><p>Nothing to show.</p></div>
      </div>
      <p class="note"><i class="fa-solid fa-circle-info"></i> "Hide" is a soft delete. The record stays in the database and can be restored any time. Nothing is permanently removed.</p>
    </section>

    <!-- PRODUCTS -->
    <section class="view" id="v-products">
      <div class="head">
        <div>
          <p class="eyebrow">Catalog</p>
          <h2>Product workspace</h2>
          <p class="sub">Products, prices and stock will be managed here.</p>
        </div>
      </div>
      <div class="card soon"><i class="fa-solid fa-shirt"></i><h3>Coming next</h3><p>This section is reserved for the product tables. We will connect it after the accounts side is done.</p></div>
    </section>

    <!-- ORDERS -->
    <section class="view" id="v-orders">
      <div class="head">
        <div>
          <p class="eyebrow">Sales</p>
          <h2>Customer orders</h2>
          <p class="sub">Orders placed by signed-in customers, including delivery details and selected sizes.</p>
        </div>
        <button class="btn dark" id="refreshOrders" type="button"><i class="fa-solid fa-rotate"></i> Refresh orders</button>
      </div>
      <p class="orders-status" id="ordersStatus" role="status" aria-live="polite"></p>
      <div class="table-wrap">
        <table class="orders-table" id="ordersTable">
          <thead><tr><th>Order</th><th>Customer &amp; delivery</th><th>Items</th><th>Total</th><th>Status</th><th>Placed</th></tr></thead>
          <tbody></tbody>
        </table>
        <div class="empty" id="ordersEmpty" hidden><i class="fa-regular fa-folder-open"></i><p>No customer orders yet.</p></div>
      </div>
      <p class="note"><i class="fa-solid fa-circle-info"></i> Delivery charges are confirmed separately. Order status starts as pending.</p>
    </section>
  </div>
</div>

<!-- MODAL -->
<div class="ov" id="ov">
  <form class="modal" id="modal" novalidate>
    <button type="button" class="ic x" data-close aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
    <h3 id="mTitle"></h3>
    <p class="mdesc" id="mDesc"></p>
    <div id="mBody"></div>
    <div class="m-actions">
      <button type="button" class="btn ghost" data-close>Cancel</button>
      <button class="btn dark" id="mOk">Save</button>
    </div>
  </form>
</div>

<div class="scrim" id="scrim"></div>
<script src="./js files/dashboard.js?v=4"></script>
</body>
</html>