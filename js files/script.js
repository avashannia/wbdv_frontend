/* CSSP script.js | vanilla JS, one section per feature */
(function () {
  "use strict";
  var $ = function (s, c) {
      return (c || document).querySelector(s);
    },
    $$ = function (s, c) {
      return Array.from((c || document).querySelectorAll(s));
    },
    root = document.documentElement,
    store = {
      get: function (k) {
        try {
          return localStorage.getItem(k);
        } catch (e) {
          return null;
        }
      },
      set: function (k, v) {
        try {
          localStorage.setItem(k, v);
        } catch (e) {}
      },
    };

  /* ---- Catalog data: [category, name, PHP price, icon, badge]. 6 are previewed, all are searchable ---- */
  var CAT = {
    U: "Coveralls & Uniforms",
    K: "Chef & Kitchen",
    J: "Jackets & Rainwear",
    F: "Safety Footwear",
    H: "Head, Eye & Ear PPE",
    B: "Gloves & Body PPE",
    S: "Seafarer Essentials",
  };
  var P = [
    ["U", "Coveralls (Royal Blue)", 1000, "user-shield", "Bestseller"],
    ["U", "Coveralls (Orange)", 1000, "user-shield"],
    ["U", "Coveralls (Khaki)", 1000, "user-shield"],
    ["U", "Coveralls (Navy)", 1000, "user-shield"],
    ["U", "Coveralls (Grey)", 1000, "user-shield"],
    ["U", "Coveralls (White)", 1050, "user-shield"],
    ["K", "Chef Polo Long Sleeve", 800, "utensils", "New"],
    ["K", "Chef Polo Short Sleeve", 750, "utensils"],
    ["K", "Chef Pants (Checkered)", 700, "utensils"],
    ["K", "Kitchen Pants (Black)", 700, "utensils"],
    ["K", "Bib Apron", 350, "utensils"],
    ["K", "Chef Cap", 180, "utensils"],
    ["J", "Winter Jacket", 1500, "wind"],
    ["J", "Ordinary Jacket", 1500, "wind"],
    ["J", "Rain Jacket", 950, "cloud-showers-heavy"],
    ["J", "Reflective Jacket", 1300, "wind"],
    ["J", "Fleece Jacket", 1100, "wind"],
    ["J", "Thermal Parka", 2200, "snowflake"],
    ["F", "MG Safety BS-07 High Cut", 2100, "shoe-prints", "Bestseller"],
    ["F", "MG Safety BS-08 Low Cut", 1900, "shoe-prints"],
    ["F", "Rockwinner Safety Shoe", 2300, "shoe-prints"],
    ["F", "PVC Rubber Boots", 850, "shoe-prints"],
    ["F", "Steel-toe Rigger Boots", 2600, "shoe-prints"],
    ["F", "Anti-slip Galley Shoes", 1450, "shoe-prints"],
    ["F", "Safety Sandals", 1200, "shoe-prints"],
    ["F", "Insulated Deck Boots", 2800, "shoe-prints"],
    ["H", "Safety Helmet", 380, "helmet-safety", "New"],
    ["H", "Hard Hat with Chin Strap", 450, "helmet-safety"],
    ["H", "Welding Goggles", 260, "glasses"],
    ["H", "Clear Safety Glasses", 150, "glasses"],
    ["H", "Ear Muffs", 420, "headphones"],
    ["H", "Ear Plugs (Box of 50)", 280, "headphones"],
    ["H", "Face Shield", 320, "mask-face"],
    ["H", "Dust Mask (Pack of 20)", 240, "mask-face"],
    ["B", "Cotton Gloves (Dozen)", 300, "hand"],
    ["B", "Leather Work Gloves", 280, "hand"],
    ["B", "Rubber Gloves", 180, "hand"],
    ["B", "Cut-resistant Gloves", 390, "hand"],
    ["B", "Safety Harness", 1850, "link"],
    ["B", "Reflective Vest", 220, "vest"],
    ["B", "Life Jacket", 1600, "life-ring", "Bestseller"],
    ["B", "Rain Suit Set", 1100, "cloud-showers-heavy"],
    ["S", "Sailor Cap", 250, "anchor"],
    ["S", "Epaulettes (Pair)", 200, "anchor"],
    ["S", "Embroidered Name Tag", 90, "id-badge"],
    ["S", "Embroidered Patch", 120, "anchor"],
    ["S", "Cotton Socks (3 pairs)", 210, "socks"],
    ["S", "Thermal Underwear Set", 650, "temperature-low"],
    ["S", "Bath Towel", 320, "bath"],
    ["S", "Duffel Bag", 900, "bag-shopping"],
  ];
  var FEATURED = [0, 6, 12, 18, 26, 42];

  /* ---- Theme (saved, respects system preference) ---- */
  function setTheme(t) {
    root.setAttribute("data-theme", t);
    $("#tg").innerHTML =
      '<i class="fa-solid fa-' + (t === "dark" ? "sun" : "moon") + '"></i>';
    store.set("cssp-theme", t);
  }
  setTheme(
    store.get("cssp-theme") ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
  );
  $("#tg").onclick = function () {
    setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  };

  /* ---- Navbar: dropdowns (click, desktop hover, keyboard), mobile menu, scroll state ---- */
  var nav = $("#nav"),
    menu = $("#menu"),
    burger = $("#burger"),
    hoverMQ = matchMedia("(hover:hover) and (min-width:992px)"),
    hT;
  function closeDD() {
    $$(".dd.open").forEach(function (d) {
      d.classList.remove("open");
      $("button", d).setAttribute("aria-expanded", "false");
    });
  }
  function openDD(d, byHover) {
    closeDD();
    d.classList.add("open");
    d.dataset.h = byHover ? "1" : "";
    $("button", d).setAttribute("aria-expanded", "true");
  }
  function setMenu(o) {
    menu.classList.toggle("open", o);
    burger.setAttribute("aria-expanded", o);
  }
  $$(".dd").forEach(function (d) {
    $("button", d).addEventListener("click", function (e) {
      e.stopPropagation();
      var was = d.classList.contains("open") && d.dataset.h !== "1";
      was ? closeDD() : openDD(d, false);
    });
    if (!d.closest(".menu")) return;
    d.addEventListener("pointerenter", function (e) {
      if (e.pointerType === "mouse" && hoverMQ.matches) {
        clearTimeout(hT);
        hT = setTimeout(function () {
          openDD(d, true);
        }, 90);
      }
    });
    d.addEventListener("pointerleave", function (e) {
      if (e.pointerType === "mouse" && hoverMQ.matches) {
        clearTimeout(hT);
        hT = setTimeout(closeDD, 220);
      }
    });
  });
  burger.onclick = function (e) {
    e.stopPropagation();
    setMenu(!menu.classList.contains("open"));
  };
  $$(".panel a").forEach(function (a) {
    a.addEventListener("click", function () {
      closeDD();
      setMenu(false);
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dd")) closeDD();
    if (!e.target.closest("#menu,#burger")) setMenu(false);
  });

  /* ---- Scroll: navbar shrink, back-to-top, progress bar, scroll-fill statement ---- */
  var words = $("#fillText").textContent.trim().split(" ");
  $("#fillText").innerHTML = words
    .map(function (w) {
      return '<span class="w">' + w + "</span>";
    })
    .join(" ");
  var spans = $$("#fillText .w"),
    sec = $(".fill");
  function onScroll() {
    var h = root.scrollHeight - innerHeight;
    nav.classList.toggle("scrolled", scrollY > 30);
    $("#toTop").classList.toggle("show", scrollY > 500);
    $("#prog").style.width = (scrollY / h) * 100 + "%";
    var r = sec.getBoundingClientRect(),
      k = Math.min(
        Math.max(
          (innerHeight * 0.6 - r.top) / (r.height - innerHeight * 0.3),
          0,
        ),
        1,
      );
    spans.forEach(function (s, i) {
      s.classList.toggle("on", i < Math.round(k * spans.length));
    });
    closeDD();
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  $("#toTop").onclick = function () {
    scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---- Currency (base PHP) ---- */
  var rates = { PHP: 1, USD: 0.0172, EUR: 0.0159 },
    sym = { PHP: "₱", USD: "$", EUR: "€" },
    cur = store.get("cssp-cur") || "PHP";
  function fmt(p) {
    return (
      sym[cur] +
      (p * rates[cur]).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }
  function renderPrices() {
    $$("[data-price]").forEach(function (el) {
      $(".price", el).textContent = fmt(+el.dataset.price);
    });
    $("#curCode").textContent = cur;
    renderCart();
  }
  $$("[data-cur]").forEach(function (b) {
    b.onclick = function () {
      cur = b.dataset.cur;
      store.set("cssp-cur", cur);
      closeDD();
      renderPrices();
    };
  });

  /* ---- Cart ---- */
  var cart = [];
  function renderCart() {
    var n = 0,
      t = 0;
    $("#cartList").innerHTML = cart.length
      ? cart
          .map(function (i, x) {
            n += i.q;
            t += i.p * i.q;
            return (
              '<div class="ci"><b>' +
              i.n +
              " × " +
              i.q +
              "</b><span>" +
              fmt(i.p * i.q) +
              '</span><button data-rm="' +
              x +
              '" aria-label="Remove"><i class="fa-solid fa-trash"></i></button></div>'
            );
          })
          .join("")
      : "<p>Your cart is empty.</p>";
    $("#cartCount").textContent = n;
    $("#cartTot").textContent = fmt(t);
  }
  function add(i) {
    var f = cart.find(function (c) {
      return c.n === P[i][1];
    });
    f ? f.q++ : cart.push({ n: P[i][1], p: P[i][2], q: 1 });
    renderCart();
    toast(P[i][1] + " added to cart");
    var c = $("#cartCount");
    c.classList.remove("bump");
    void c.offsetWidth;
    c.classList.add("bump");
  }
  function toast(m) {
    var t = document.createElement("div");
    t.className = "toast";
    t.textContent = m;
    document.body.appendChild(t);
    setTimeout(function () {
      t.remove();
    }, 1800);
  }
  $("#cartList").onclick = function (e) {
    var b = e.target.closest("[data-rm]");
    if (b) {
      cart.splice(+b.dataset.rm, 1);
      renderCart();
    }
  };

  /* ---- Product preview cards (6 of 54) ---- */
  $("#pgrid").innerHTML =
    FEATURED.map(function (i) {
      var p = P[i];
      return (
        '<article class="pk rv" data-price="' +
        p[2] +
        '"><div class="pk-img">' +
        (p[4] ? '<span class="tagb">' + p[4] + "</span>" : "") +
        '<i class="fa-solid fa-' +
        p[3] +
        '"></i></div><div class="pk-b"><span class="pk-c">' +
        CAT[p[0]] +
        '</span><span class="pk-n">' +
        p[1] +
        '</span><span class="price"></span><span class="stk">Stock Available</span><button class="pill" data-add="' +
        i +
        '"><i class="fa-solid fa-cart-shopping"></i> Add to cart</button></div></article>'
      );
    }).join("") +
    '<article class="pk more rv"><b>+' +
    (P.length - FEATURED.length) +
    '</b><span>more items in 7 categories</span><button class="pill" data-open="quote">Request full catalog</button></article>';
  $("#pgrid").onclick = function (e) {
    var b = e.target.closest("[data-add]");
    if (b) add(+b.dataset.add);
  };

  /* ---- Overlays: drawer, modals, search, Esc ---- */
  function closeAll() {
    $$(".ov.open,.drawer.open").forEach(function (o) {
      o.classList.remove("open");
    });
  }
  function openOv(el) {
    closeAll();
    el.classList.add("open");
    var f = $("input", el);
    if (f)
      setTimeout(function () {
        f.focus();
      }, 120);
  }
  $("#cartBtn").onclick = function () {
    openOv($("#drawer"));
  };
  $("#searchBtn").onclick = function () {
    openOv($("#search"));
  };
  document.addEventListener("click", function (e) {
    var o = e.target.closest("[data-open]");
    if (o) {
      e.preventDefault();
      setMenu(false);
      openOv($("#" + o.dataset.open));
    }
    if (e.target.closest("[data-close]") || e.target.classList.contains("ov"))
      closeAll();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeAll();
      closeDD();
      setMenu(false);
      fmSet(false);
    }
  });

  /* ---- Live search over all 54 items ---- */
  $("#q").oninput = function () {
    var v = this.value.toLowerCase().trim();
    $("#sr").innerHTML = v
      ? P.map(function (p, i) {
          return p[1].toLowerCase().includes(v) ||
            CAT[p[0]].toLowerCase().includes(v)
            ? "<div><b>" +
                p[1] +
                "</b><span>" +
                fmt(p[2]) +
                '</span><button class="pill" data-add="' +
                i +
                '">Add</button></div>'
            : "";
        }).join("") || "<p>No matches.</p>"
      : "";
  };
  $("#sr").onclick = function (e) {
    var b = e.target.closest("[data-add]");
    if (b) add(+b.dataset.add);
  };

  /* ---- Forms with validation ---- */
  function validate(f) {
    var ok = true;
    $$("input[required]", f).forEach(function (i) {
      var bad =
        !i.value.trim() ||
        (i.type === "email" && !/^\S+@\S+\.\S+$/.test(i.value)) ||
        (i.minLength > 0 && i.value.length < i.minLength);
      i.nextElementSibling.textContent = bad
        ? "Please enter a valid " +
          (i.name === "pw" ? "password (6+ chars)" : i.name)
        : "";
      if (bad) ok = false;
    });
    return ok;
  }
  $$("form.box").forEach(function (f) {
    f.onsubmit = function (e) {
      e.preventDefault();
      if (validate(f)) {
        toast(f.closest("#quote") ? "Quote request sent!" : "Welcome to CSSP!");
        f.reset();
        closeAll();
      }
    };
  });
  $$("[data-tab]").forEach(function (t) {
    t.onclick = function () {
      $$("[data-tab]").forEach(function (x) {
        x.classList.toggle("on", x === t);
      });
      $("#nameRow").hidden = t.dataset.tab === "in";
      $("#acctGo").textContent =
        t.dataset.tab === "in" ? "Log in" : "Create account";
    };
  });

  /* ---- Floating contact buttons with chat bubble beside the tapped button ---- */
  var fm = $("#fm"),
    fi = $("#finfo"),
    pinned = null,
    INFO = {
      call: [
        "Call us",
        "Mon to Sat, 8 AM to 6 PM",
        "+63 900 000 0000",
        "tel:+639000000000",
      ],
      msg: [
        "Email us",
        "We reply within one business day.",
        "hello@example.com",
        "mailto:hello@example.com",
      ],
      share: [
        "Share this page",
        "Copy or share the link with your team.",
        "Share now",
        "#",
      ],
    };
  function fmSet(o) {
    fm.classList.toggle("open", o);
    $("#fmMain").setAttribute("aria-expanded", o);
    if (!o) {
      fi.classList.remove("show");
      pinned = null;
    }
  }
  function bubble(b) {
    var t = INFO[b.dataset.info],
      a = $("a", fi),
      r = b.getBoundingClientRect();
    $("b", fi).textContent = t[0];
    $("span", fi).textContent = t[1];
    a.textContent = t[2];
    a.href = t[3];
    a.dataset.act = b.dataset.info;
    fi.style.top = r.top + r.height / 2 + "px";
    fi.style.right = innerWidth - r.left + 16 + "px";
    fi.classList.add("show");
  }
  $("#fmMain").onclick = function (e) {
    e.stopPropagation();
    fmSet(!fm.classList.contains("open"));
  };
  $$(".fm-list .fb").forEach(function (b) {
    b.onpointerenter = function (e) {
      if (e.pointerType === "mouse" && !pinned) bubble(b);
    };
    b.onpointerleave = function (e) {
      if (e.pointerType === "mouse" && !pinned) fi.classList.remove("show");
    };
    b.onclick = function (e) {
      e.stopPropagation();
      pinned = b;
      bubble(b);
    };
  });
  $("a", fi).onclick = function (e) {
    if (this.dataset.act !== "share") return;
    e.preventDefault();
    var u = location.href.split("#")[0];
    navigator.share
      ? navigator.share({ title: document.title, url: u }).catch(function () {})
      : navigator.clipboard &&
        navigator.clipboard.writeText(u).then(function () {
          toast("Link copied");
        });
  };
  document.addEventListener("click", function (e) {
    if (!e.target.closest("#fm,#finfo")) fmSet(false);
  });

  /* ---- Interactive previews: size picker, name-tag embroidery ---- */
  var CHEST = {
    XS: "32–34",
    S: "34–36",
    M: "38–40",
    L: "42–44",
    XL: "46–48",
    "2XL": "50–52",
    "3XL": "54–56",
  };
  $("#sizes").onclick = function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    $$("#sizes button").forEach(function (x) {
      x.classList.toggle("on", x === b);
    });
    $("#sizeOut").textContent =
      "Size " + b.textContent + " · chest " + CHEST[b.textContent] + " in";
  };
  $("#tagIn").oninput = function () {
    $("#tagOut").textContent = this.value.toUpperCase() || "YOUR NAME";
  };

  /* ---- Reveal on scroll, counters, chat sequence ---- */
  function typeChat() {
    var m = $$("#chat .msg"),
      d = $("#dots");
    [0, 1, 2].forEach(function (i) {
      setTimeout(function () {
        m[i].classList.add("show");
      }, i * 1100);
    });
    setTimeout(function () {
      d.classList.add("on");
    }, 3400);
    setTimeout(function () {
      d.classList.remove("on");
      m[3].classList.add("show");
    }, 4800);
  }
  var io = new IntersectionObserver(
    function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        io.unobserve(el);
        if (el.id === "chat") return typeChat();
        if (el.dataset.count) {
          var end = +el.dataset.count,
            t0 = performance.now();
          (function s(t) {
            var k = Math.min((t - t0) / 1400, 1);
            el.textContent =
              Math.round(end * (1 - Math.pow(1 - k, 3))) +
              (el.dataset.suf || "");
            if (k < 1) requestAnimationFrame(s);
          })(t0);
        } else el.classList.add("in");
      });
    },
    { threshold: 0.2 },
  );
  $$(".rv,[data-count],#chat").forEach(function (el, i) {
    el.style.setProperty("--i", i % 4);
    io.observe(el);
  });

  renderPrices();
})();
