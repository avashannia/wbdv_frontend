(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.from((c || document).querySelectorAll(s)); };

  /* =====================================================================
     DATA LAYER (sample data for now).
     Field names match the SQL columns you will use:
       users:       id, full_name, email, role, is_active, is_hidden, created_at, last_login
       login_logs:  log_id, user_id, email_tried, success, ip_address, logged_at, is_hidden
     Later, only the load/save functions below need to talk to the database.
     ===================================================================== */
  var ME = 4; /* signed-in owner: cannot change own role, deactivate or hide */
  var KEY = "cssp-dash-v1";
  var db = {
    users: [
      { id: 7, full_name: "SHANNIA PACLEB", email: "sapacleb1562ant@student.fatima.edu.ph", role: "customer", is_active: 0, is_hidden: 0, created_at: "2026-10-22 23:31:13", last_login: "2026-10-23 05:36:01" },
      { id: 8, full_name: "hgfhfg hfghgfhgf", email: "=ddffyhf@gmail.com", role: "customer", is_active: 0, is_hidden: 0, created_at: "2026-10-22 22:59:00", last_login: "2026-10-22 22:59:00" },
      { id: 5, full_name: "Staff CSSP", email: "staff@cssp.com", role: "staff", is_active: 1, is_hidden: 0, created_at: "2026-10-20 09:00:00", last_login: "2026-10-23 05:36:26" },
      { id: 4, full_name: "Owner CSSP", email: "cssgarmentstrading@gmail.com".replace("cssg", "cssp g").replace(" ", ""), role: "admin", is_active: 1, is_hidden: 0, created_at: "2026-10-20 09:00:00", last_login: "2026-11-19 22:43:01" },
      { id: 3, full_name: "Owner CSSP", email: "owner@cssp.com", role: "admin", is_active: 1, is_hidden: 0, created_at: "2026-10-20 09:00:00", last_login: null },
      { id: 6, full_name: "Shannia Pacleb", email: "pacleb.shannia@gmail.com", role: "customer", is_active: 1, is_hidden: 0, created_at: "2026-10-22 18:00:00", last_login: "2026-10-22 20:16:00" },
      { id: 9, full_name: "Shannia Pacleb", email: "shanniaavapacleb@gmail.com", role: "customer", is_active: 1, is_hidden: 0, created_at: "2026-10-22 19:30:00", last_login: "2026-10-22 19:41:00" }
    ],
    logs: [
      { log_id: 53, user_id: 4, email_tried: "csspgarmentstrading@gmail.com", success: 1, ip_address: "::1", logged_at: "2026-11-19 22:43:01", is_hidden: 0 },
      { log_id: 52, user_id: 5, email_tried: "staff@cssp.com", success: 0, ip_address: "::1", logged_at: "2026-11-19 22:41:10", is_hidden: 0 },
      { log_id: 51, user_id: null, email_tried: "sapacleb1562ant@student.fatima.edu.ph", success: 0, ip_address: "::1", logged_at: "2026-10-23 06:11:04", is_hidden: 0 },
      { log_id: 50, user_id: null, email_tried: "sapacleb1562ant@student.fatima.edu.ph", success: 0, ip_address: "::1", logged_at: "2026-10-23 06:10:52", is_hidden: 0 },
      { log_id: 49, user_id: 4, email_tried: "csspgarmentstrading@gmail.com", success: 1, ip_address: "::1", logged_at: "2026-10-23 06:08:04", is_hidden: 0 },
      { log_id: 48, user_id: 5, email_tried: "staff@cssp.com", success: 1, ip_address: "::1", logged_at: "2026-10-23 05:36:26", is_hidden: 0 },
      { log_id: 47, user_id: 7, email_tried: "sapacleb1562ant@student.fatima.edu.ph", success: 1, ip_address: "::1", logged_at: "2026-10-23 05:36:01", is_hidden: 0 },
      { log_id: 46, user_id: 7, email_tried: "sapacleb1562ant@student.fatima.edu.ph", success: 1, ip_address: "::1", logged_at: "2026-10-23 05:35:42", is_hidden: 0 },
      { log_id: 45, user_id: 4, email_tried: "csspgarmentstrading@gmail.com", success: 1, ip_address: "::1", logged_at: "2026-10-22 23:53:34", is_hidden: 0 },
      { log_id: 44, user_id: 7, email_tried: "sapacleb1562ant@student.fatima.edu.ph", success: 1, ip_address: "::1", logged_at: "2026-10-22 23:31:13", is_hidden: 0 },
      { log_id: 43, user_id: null, email_tried: "=ddffyhf@gmail.com", success: 0, ip_address: "::1", logged_at: "2026-10-22 23:30:47", is_hidden: 0 }
    ]
  };
  db.users[3].email = "cspgarmentstrading@gmail.com".replace("cspg", "csspg");

  function load() {
    try { var s = localStorage.getItem(KEY); if (s) db = JSON.parse(s); } catch (e) {}
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) {}
  }
  load();

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function initials(n) {
    var p = String(n).trim().split(/\s+/);
    return ((p[0] || "?")[0] + (p[1] ? p[1][0] : (p[0] || "")[1] || "")).toUpperCase();
  }
  var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function parse(s) { return s ? new Date(s.replace(" ", "T")) : null; }
  function fmtNice(s) {
    var d = parse(s); if (!d || isNaN(d)) return "Not signed in yet";
    var h = d.getHours(), m = ("0" + d.getMinutes()).slice(-2);
    return MON[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + " " + ((h % 12) || 12) + ":" + m + " " + (h >= 12 ? "PM" : "AM");
  }
  function since(s) { var d = parse(s); return d && !isNaN(d) ? MON[d.getMonth()] + " " + d.getFullYear() : ""; }
  function nowStr() {
    var d = new Date(), p = function (n) { return ("0" + n).slice(-2); };
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes()) + ":" + p(d.getSeconds());
  }
  function nextId(arr, key) { return arr.reduce(function (m, r) { return Math.max(m, r[key]); }, 0) + 1; }
  function toast(m) {
    var t = document.createElement("div"); t.className = "toast"; t.textContent = m;
    document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2200);
  }
  function userById(id) { return db.users.find(function (u) { return u.id === id; }); }
  function validEmail(v) { return /^\S+@\S+\.\S+$/.test(v); }

  /* ---------- theme ---------- */
  var root = document.documentElement;
  $("#themeBtn").onclick = function () {
    var t = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    window.CSSPSiteState.setTheme(t);
  };

  /* ---------- navigation ---------- */
  var TITLES = { overview: "People & Access", accounts: "User Accounts & Logs", products: "Product Workspace", orders: "Customer Orders" };
  var tab = "users";
  function go(view) {
    $$(".view").forEach(function (v) { v.classList.toggle("on", v.id === "v-" + view); });
    $$("#sideNav button").forEach(function (b) { b.classList.toggle("on", b.dataset.view === view); });
    $("#topTitle").textContent = TITLES[view];
    $("#side").classList.remove("open"); $("#scrim").classList.remove("on");
    window.scrollTo(0, 0);
    render();
    if (view === "orders") loadOrders();
  }
  $("#sideNav").onclick = function (e) { var b = e.target.closest("button"); if (b) go(b.dataset.view); };
  document.addEventListener("click", function (e) {
    var g = e.target.closest("[data-go]");
    if (g) { if (g.dataset.tab) setTab(g.dataset.tab); go(g.dataset.go); }
  });
  $("#menuBtn").onclick = function () { $("#side").classList.add("open"); $("#scrim").classList.add("on"); };
  $("#scrim").onclick = function () { $("#side").classList.remove("open"); $("#scrim").classList.remove("on"); };
  $("#refreshOrders").onclick = loadOrders;
  $("#dashboardLogout").onclick = async function () {
    var button = this;
    button.disabled = true;
    try {
      var response = await fetch("./api/auth.php?action=logout", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ csrf_token: button.dataset.csrf }),
      });
      var result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Could not sign out.");
      }
      window.location.href = "./products.php";
    } catch (error) {
      toast(error.message);
      button.disabled = false;
    }
  };

  function loadOrders() {
    var status = $("#ordersStatus"),
      body = $("#ordersTable tbody"),
      empty = $("#ordersEmpty");
    body.replaceChildren();
    empty.hidden = true;
    status.classList.remove("error");
    status.textContent = "Loading orders...";
    fetch("./api/orders.php", {
      credentials: "same-origin",
      headers: { Accept: "application/json" },
    })
      .then(async function (response) {
        var result;
        try {
          result = await response.json();
        } catch (error) {
          throw new Error("The server returned an invalid response.");
        }
        if (response.status === 401) {
          window.location.href = "./products.php?auth=required";
          return null;
        }
        if (!response.ok) {
          throw new Error(result.error || "Orders could not be loaded.");
        }
        return result;
      })
      .then(function (result) {
        if (!result) return;
        if (!Array.isArray(result.orders)) {
          throw new Error("The server returned an invalid orders list.");
        }
        result.orders.forEach(function (order) {
          var row = document.createElement("tr"),
            orderCell = document.createElement("td"),
            orderNumber = document.createElement("b"),
            customerCell = document.createElement("td"),
            customer = document.createElement("div"),
            itemsCell = document.createElement("td"),
            items = document.createElement("div"),
            totalCell = document.createElement("td"),
            statusCell = document.createElement("td"),
            statusBadge = document.createElement("span"),
            dateCell = document.createElement("td");
          orderNumber.className = "mono";
          orderNumber.textContent = order.order_no;
          orderCell.appendChild(orderNumber);

          customer.className = "order-contact";
          var customerName = document.createElement("b");
          customerName.textContent = order.contact_name;
          customer.appendChild(customerName);
          [order.contact_email, order.contact_phone, order.shipping_address]
            .filter(Boolean)
            .forEach(function (value, index) {
              var detail = document.createElement("span");
              if (index === 2) detail.className = "order-address";
              detail.textContent = value;
              customer.appendChild(detail);
            });
          if (order.notes) {
            var note = document.createElement("span");
            note.textContent = "Note: " + order.notes;
            customer.appendChild(note);
          }
          customerCell.appendChild(customer);

          items.className = "order-items";
          (Array.isArray(order.items) ? order.items : []).forEach(function (item) {
            var detail = document.createElement("span");
            detail.textContent =
              item.product_name +
              " - " +
              item.size +
              " x " +
              item.quantity +
              " (" +
              order.currency +
              " " +
              Number(item.line_total).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) +
              ")";
            items.appendChild(detail);
          });
          itemsCell.appendChild(items);

          totalCell.className = "order-total";
          totalCell.textContent =
            order.currency +
            " " +
            Number(order.total).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          statusBadge.className =
            "badge b-order-" + String(order.status).replace(/[^a-z_]/g, "");
          statusBadge.textContent = String(order.status).replace(/_/g, " ");
          statusCell.appendChild(statusBadge);
          dateCell.className = "mono";
          dateCell.textContent = fmtNice(order.created_at);
          [orderCell, customerCell, itemsCell, totalCell, statusCell, dateCell]
            .forEach(function (cell) {
              row.appendChild(cell);
            });
          body.appendChild(row);
        });
        empty.hidden = result.orders.length > 0;
        status.textContent = result.orders.length
          ? "Showing " + result.orders.length + " most recent order(s)."
          : "";
      })
      .catch(function (error) {
        status.classList.add("error");
        status.textContent = error.message;
      });
  }

  /* ---------- overview ---------- */
  function renderOverview() {
    var U = db.users.filter(function (u) { return !u.is_hidden; });
    var L = db.logs.filter(function (l) { return !l.is_hidden; });
    var c = function (f) { return U.filter(f).length; };
    var cards = [
      ["All accounts", U.length, "Registered people", "fa-circle-dot", ""],
      ["Customers", c(function (u) { return u.role === "customer"; }), "Customer accounts", "fa-user", ""],
      ["Staff members", c(function (u) { return u.role === "staff"; }), "Staff access accounts", "fa-star", ""],
      ["Administrators", c(function (u) { return u.role === "admin"; }), "Administrator access", "fa-shield-halved", ""],
      ["Inactive accounts", c(function (u) { return !u.is_active; }), "Accounts currently disabled", "fa-ban", ""],
      ["Failed logins", L.filter(function (l) { return !l.success; }).length, "Recorded unsuccessful attempts", "fa-bolt", "bad"]
    ];
    $("#stats").innerHTML = cards.map(function (k) {
      return '<button class="stat ' + k[4] + '" data-go="accounts"' + (k[0] === "Failed logins" ? ' data-tab="logs"' : "") + '><b>' + k[0] + '</b><strong>' + k[1] + '</strong><small>' + k[2] + '</small><i class="fa-solid ' + k[3] + '"></i></button>';
    }).join("");

    $("#recentLogs").innerHTML = L.slice(0, 5).map(function (l) {
      return '<div class="li"><span class="badge b-' + (l.success ? "success" : "failed") + '">' + (l.success ? "Success" : "Failed") + '</span><div class="grow"><div>' + esc(l.email_tried) + '</div><span>' + fmtNice(l.logged_at) + '</span></div></div>';
    }).join("") || '<p class="none">No sign-ins recorded.</p>';

    var inactive = U.filter(function (u) { return !u.is_active; });
    var fails = L.filter(function (l) { return !l.success; }).length;
    var html = inactive.map(function (u) {
      return '<div class="li"><div class="av">' + esc(initials(u.full_name)) + '</div><div class="grow"><div>' + esc(u.full_name) + '</div><span>Inactive · ' + esc(u.email) + '</span></div></div>';
    }).join("");
    if (fails) html += '<div class="li"><div class="grow"><div>' + fails + ' failed sign-in attempts</div><span>Review the login logs for repeated tries</span></div></div>';
    $("#attention").innerHTML = html || '<p class="none">All clear.</p>';
  }

  /* ---------- accounts & logs table ---------- */
  function setTab(t) {
    tab = t;
    $$("#tabs button").forEach(function (b) { b.classList.toggle("on", b.dataset.tab === t); });
    $("#addLbl").textContent = t === "users" ? "Add account" : "Add log entry";
    $("#q").value = "";
    $("#q").placeholder = t === "users" ? "Search name or email..." : "Search email or IP...";
    var f1 = $("#f1"), f2 = $("#f2");
    if (t === "users") {
      f1.innerHTML = '<option value="">All roles</option><option value="customer">Customer</option><option value="staff">Staff</option><option value="admin">Admin</option>';
      f2.innerHTML = '<option value="">All statuses</option><option value="1">Active</option><option value="0">Inactive</option>';
    } else {
      f1.innerHTML = '<option value="">All results</option><option value="1">Success</option><option value="0">Failed</option>';
      f2.innerHTML = '<option value="all">All time</option><option value="today">Today</option><option value="7">Last 7 days</option>';
    }
  }
  $("#tabs").onclick = function (e) { var b = e.target.closest("button"); if (b) { setTab(b.dataset.tab); renderTable(); } };
  ["q", "f1", "f2", "showHidden"].forEach(function (id) {
    $("#" + id).addEventListener(id === "q" ? "input" : "change", renderTable);
  });

  function renderTable() {
    var q = $("#q").value.toLowerCase().trim(), a = $("#f1").value, b = $("#f2").value;
    var showH = $("#showHidden").checked, rows, head, body;
    if (tab === "users") {
      rows = db.users.filter(function (u) {
        if (u.is_hidden && !showH) return false;
        if (q && (u.full_name + " " + u.email).toLowerCase().indexOf(q) < 0) return false;
        if (a && u.role !== a) return false;
        if (b !== "" && String(u.is_active) !== b) return false;
        return true;
      });
      head = ["Person", "Email", "Role", "Account status", "Last login", "Manage"];
      body = rows.map(function (u) {
        var self = u.id === ME, act;
        if (u.is_hidden) act = '<button class="mini pri" data-a="restore" data-id="' + u.id + '"><i class="fa-solid fa-rotate-left"></i> Restore</button>';
        else {
          act = '<button class="mini" data-a="edit" data-id="' + u.id + '">Edit</button><button class="mini" data-a="pw" data-id="' + u.id + '">Reset password</button>';
          if (!self) act += u.is_active
            ? '<button class="mini dng" data-a="toggle" data-id="' + u.id + '">Deactivate</button>'
            : '<button class="mini pri" data-a="toggle" data-id="' + u.id + '">Activate</button>';
          if (!self) act += '<button class="mini hide" data-a="hide" data-id="' + u.id + '" title="Soft delete"><i class="fa-regular fa-eye-slash"></i> Hide</button>';
        }
        return '<tr class="' + (u.is_hidden ? "hidden-row" : "") + '"><td><div class="person"><div class="av">' + esc(initials(u.full_name)) + '</div><div><b>' + esc(u.full_name) + '</b><span>Member since ' + since(u.created_at) + '</span></div></div></td>' +
          '<td>' + esc(u.email) + '</td><td><span class="badge b-' + u.role + '">' + u.role[0].toUpperCase() + u.role.slice(1) + '</span></td>' +
          '<td>' + (u.is_hidden ? '<span class="badge b-hidden">Hidden</span>' : '<span class="badge b-' + (u.is_active ? "active" : "inactive") + '">' + (u.is_active ? "Active" : "Inactive") + '</span>') + '</td>' +
          '<td class="mono">' + fmtNice(u.last_login) + '</td><td><div class="acts">' + act + '</div></td></tr>';
      });
    } else {
      var cut = null;
      if (b === "today") { cut = new Date(); cut.setHours(0, 0, 0, 0); }
      else if (b === "7") { cut = new Date(Date.now() - 7 * 864e5); }
      rows = db.logs.filter(function (l) {
        if (l.is_hidden && !showH) return false;
        if (q && (l.email_tried + " " + l.ip_address).toLowerCase().indexOf(q) < 0) return false;
        if (a !== "" && String(l.success) !== a) return false;
        if (cut && parse(l.logged_at) < cut) return false;
        return true;
      }).sort(function (x, y) { return y.log_id - x.log_id; });
      head = ["Log ID", "User ID", "Email tried", "Result", "IP address", "Logged at", "Manage"];
      body = rows.map(function (l) {
        var act = l.is_hidden
          ? '<button class="mini pri" data-a="restore" data-id="' + l.log_id + '"><i class="fa-solid fa-rotate-left"></i> Restore</button>'
          : '<button class="mini" data-a="edit" data-id="' + l.log_id + '">Edit</button><button class="mini hide" data-a="hide" data-id="' + l.log_id + '"><i class="fa-regular fa-eye-slash"></i> Hide</button>';
        return '<tr class="' + (l.is_hidden ? "hidden-row" : "") + '"><td class="mono">' + l.log_id + '</td><td class="mono">' + (l.user_id == null ? "—" : l.user_id) + '</td><td>' + esc(l.email_tried) + '</td>' +
          '<td>' + (l.is_hidden ? '<span class="badge b-hidden">Hidden</span> ' : "") + '<span class="badge b-' + (l.success ? "success" : "failed") + '">' + (l.success ? "Success" : "Failed") + '</span></td>' +
          '<td class="mono">' + esc(l.ip_address) + '</td><td class="mono">' + esc(l.logged_at) + '</td><td><div class="acts">' + act + '</div></td></tr>';
      });
    }
    $("#tbl thead").innerHTML = "<tr>" + head.map(function (h) { return "<th>" + h + "</th>"; }).join("") + "</tr>";
    $("#tbl tbody").innerHTML = body.join("");
    $("#empty").hidden = rows.length > 0;
    $("#count").textContent = "Showing " + rows.length + (tab === "users" ? " registered accounts" : " sign-in attempts");
  }

  /* ---------- modal ---------- */
  var onOk = null;
  function openModal(title, desc, html, ok, okLabel, danger) {
    $("#mTitle").textContent = title; $("#mDesc").textContent = desc || "";
    $("#mBody").innerHTML = html || "";
    var b = $("#mOk"); b.textContent = okLabel || "Save"; b.className = "btn " + (danger ? "red" : "dark");
    onOk = ok; $("#ov").classList.add("open");
    var f = $("#mBody input, #mBody select"); if (f) setTimeout(function () { f.focus(); }, 120);
  }
  function closeModal() { $("#ov").classList.remove("open"); onOk = null; }
  $("#ov").addEventListener("click", function (e) { if (e.target.id === "ov" || e.target.closest("[data-close]")) closeModal(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });
  $("#modal").onsubmit = function (e) {
    e.preventDefault();
    if (!onOk) return;
    var vals = {};
    $$("#mBody [name]").forEach(function (i) { vals[i.name] = i.value.trim(); });
    $$("#mBody .err").forEach(function (x) { x.textContent = ""; });
    var res = onOk(vals);
    if (res && typeof res === "object") { /* validation errors */
      Object.keys(res).forEach(function (k) { var el = $('#mBody [data-err="' + k + '"]'); if (el) el.textContent = res[k]; });
      return;
    }
    save(); closeModal(); render();
  };
  function field(label, name, val, type, extra) {
    return '<label class="field"><span>' + label + '</span><input name="' + name + '" type="' + (type || "text") + '" value="' + esc(val == null ? "" : val) + '" ' + (extra || "") + '><div class="err" data-err="' + name + '"></div></label>';
  }
  function select(label, name, val, opts) {
    return '<label class="field"><span>' + label + '</span><select name="' + name + '">' + opts.map(function (o) {
      return '<option value="' + o[0] + '"' + (String(o[0]) === String(val) ? " selected" : "") + '>' + o[1] + '</option>';
    }).join("") + '</select></label>';
  }
  var ROLES = [["customer", "Customer"], ["staff", "Staff"], ["admin", "Admin"]];
  var STAT = [[1, "Active"], [0, "Inactive"]];
  var RES = [[1, "Success"], [0, "Failed"]];

  function userForm(u, isNew) {
    var self = u && u.id === ME;
    openModal(isNew ? "Add account" : "Edit account", isNew ? "Create a new registered account." : "Update this person's details.",
      field("Full name", "full_name", u ? u.full_name : "") + field("Email", "email", u ? u.email : "", "email") +
      (isNew ? field("Temporary password", "pw", "", "password", 'minlength="6"') : "") +
      (self ? "" : select("Role", "role", u ? u.role : "customer", ROLES) + select("Account status", "is_active", u ? u.is_active : 1, STAT)),
      function (v) {
        var er = {};
        if (!v.full_name) er.full_name = "Please enter a name.";
        if (!validEmail(v.email)) er.email = "Please enter a valid email.";
        else if (db.users.some(function (x) { return x.email.toLowerCase() === v.email.toLowerCase() && (!u || x.id !== u.id); })) er.email = "This email is already registered.";
        if (isNew && (v.pw || "").length < 6) er.pw = "Password must be 6+ characters.";
        if (Object.keys(er).length) return er;
        if (isNew) {
          db.users.unshift({ id: nextId(db.users, "id"), full_name: v.full_name, email: v.email, role: v.role, is_active: +v.is_active, is_hidden: 0, created_at: nowStr(), last_login: null });
          toast("Account added");
        } else {
          u.full_name = v.full_name; u.email = v.email;
          if (!self) { u.role = v.role; u.is_active = +v.is_active; }
          toast("Account updated");
        }
      }, isNew ? "Add account" : "Save changes");
  }

  function logForm(l, isNew) {
    openModal(isNew ? "Add log entry" : "Edit log entry", isNew ? "Record a sign-in attempt manually." : "Correct this sign-in record.",
      field("Email tried", "email_tried", l ? l.email_tried : "", "email") +
      field("User ID (leave blank if unknown)", "user_id", l && l.user_id != null ? l.user_id : "", "number", 'min="1"') +
      select("Result", "success", l ? l.success : 1, RES) +
      field("IP address", "ip_address", l ? l.ip_address : "::1") +
      field("Logged at (YYYY-MM-DD HH:MM:SS)", "logged_at", l ? l.logged_at : nowStr()),
      function (v) {
        var er = {};
        if (!v.email_tried) er.email_tried = "Please enter the email used.";
        if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(v.logged_at)) er.logged_at = "Use the format 2026-11-19 22:43:01.";
        if (v.user_id && !userById(+v.user_id)) er.user_id = "No account has this ID.";
        if (Object.keys(er).length) return er;
        var data = { email_tried: v.email_tried, user_id: v.user_id ? +v.user_id : null, success: +v.success, ip_address: v.ip_address || "::1", logged_at: v.logged_at };
        if (isNew) { data.log_id = nextId(db.logs, "log_id"); data.is_hidden = 0; db.logs.unshift(data); toast("Log entry added"); }
        else { Object.assign(l, data); toast("Log entry updated"); }
      }, isNew ? "Add entry" : "Save changes");
  }

  $("#addBtn").onclick = function () { tab === "users" ? userForm(null, true) : logForm(null, true); };

  /* ---------- row actions ---------- */
  $("#tbl tbody").onclick = function (e) {
    var b = e.target.closest("[data-a]"); if (!b) return;
    var id = +b.dataset.id, a = b.dataset.a;
    var isU = tab === "users", rec = isU ? userById(id) : db.logs.find(function (l) { return l.log_id === id; });
    if (!rec) return;
    var label = isU ? rec.full_name : "log #" + id;
    if (a === "edit") return isU ? userForm(rec, false) : logForm(rec, false);
    if (a === "pw") {
      return openModal("Reset password", "Set a new password for " + rec.full_name + ".", field("New password", "pw", "", "password", 'minlength="6"'),
        function (v) { if ((v.pw || "").length < 6) return { pw: "Password must be 6+ characters." }; toast("Password reset for " + rec.full_name); }, "Reset password");
    }
    if (a === "toggle") {
      var to = rec.is_active ? 0 : 1;
      return openModal((to ? "Activate" : "Deactivate") + " account", (to ? "Allow " : "Block ") + rec.full_name + (to ? " to sign in again?" : " from signing in?"), "",
        function () { rec.is_active = to; toast("Account " + (to ? "activated" : "deactivated")); }, to ? "Activate" : "Deactivate", !to);
    }
    if (a === "hide") {
      return openModal("Hide " + (isU ? "account" : "log entry"), "",
        '<div class="warn"><i class="fa-regular fa-eye-slash"></i><div>"' + esc(label) + '" will be hidden from lists. It is a soft delete: the record stays in the database and you can restore it with "Show hidden".</div></div>',
        function () { rec.is_hidden = 1; toast("Hidden. You can restore it anytime."); }, "Hide", true);
    }
    if (a === "restore") { rec.is_hidden = 0; save(); toast("Restored"); render(); }
  };

  /* ---------- render ---------- */
  function render() {
    renderOverview();
    renderTable();
  }
  setTab("users");
  render();
})();