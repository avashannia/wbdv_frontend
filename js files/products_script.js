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
  var SLIDES = [
    0, 6, 12, 18, 26, 42, 2, 9, 15, 22, 30, 44,
  ]; /* items shown in the marquee */

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
  var fillParts = [];
  Array.prototype.slice.call($("#fillText").childNodes).forEach(function (nd) {
    if (nd.nodeType === 3)
      nd.textContent
        .split(/\s+/)
        .filter(Boolean)
        .forEach(function (w) {
          fillParts.push('<span class="w">' + w + "</span>");
        });
    else if (nd.nodeType === 1) {
      nd.classList.add("w"); /* image chips fade in with the words */
      fillParts.push(nd.outerHTML);
    }
  });
  $("#fillText").innerHTML = fillParts.join(" ");
  var spans = $$("#fillText .w"),
    fillEl = $("#fillText"),
    fillIn = $(".fill-in"),
    sec = $(".fill");
  function onScroll() {
    var h = root.scrollHeight - innerHeight;
    nav.classList.toggle("scrolled", scrollY > 10);
    $("#toTop").classList.toggle("show", scrollY > 500);
    $("#prog").style.width = (scrollY / h) * 100 + "%";
    /* statement: starts once the whole paragraph is on screen, first word first, and is fully lit with a short hold before it unpins */
    var r = sec.getBoundingClientRect(),
      pin =
        r.height -
        parseFloat(getComputedStyle(sec).paddingBottom) -
        fillIn.offsetHeight,
      st = innerHeight * 0.7,
      en = innerHeight * 0.26 - pin * 0.8,
      k = Math.min(Math.max((st - r.top) / (st - en), 0), 1);
    spans.forEach(function (s, i) {
      s.classList.toggle("on", i < Math.ceil(k * spans.length));
    });
    fillIn.classList.toggle("done", k >= 0.98);
    closeDD();
  }
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  $("#toTop").onclick = function () {
    try {
      scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      scrollTo(0, 0);
    }
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

  /* ---- Product marquee. For real photos, add a path as the 6th value of an item, e.g. "assets/p1.jpg" ---- */
  var tiles = SLIDES.map(function (i) {
    var p = P[i];
    return (
      '<div class="mt" data-price="' +
      p[2] +
      '">' +
      (p[5]
        ? '<img src="' + p[5] + '" alt="' + p[1] + '" loading="lazy">'
        : '<i class="fa-solid fa-' + p[3] + '"></i>') +
      '<div class="cap"><b>' +
      p[1] +
      '</b><span class="price"></span><button class="pill" data-add="' +
      i +
      '">Add to cart</button></div></div>'
    );
  }).join("");
  $("#mrq").innerHTML = '<div class="trk">' + tiles + tiles + "</div>";
  $("#mrq").onclick = function (e) {
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
  var fabs = $(".fabs"),
    hideT;
  function fmSet(o) {
    fm.classList.toggle("open", o);
    fabs.classList.toggle("menu-open", o);
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
      if (e.pointerType === "mouse" && !pinned) {
        clearTimeout(hideT);
        hideT = setTimeout(function () {
          fi.classList.remove("show");
        }, 250);
      }
    };
    b.onclick = function (e) {
      e.stopPropagation();
      if (b.dataset.info === "share") {
        fi.classList.remove("show");
        pinned = null;
        doShare();
        return;
      }
      pinned = b;
      bubble(b);
    };
  });
  fi.onpointerenter = function () {
    clearTimeout(hideT);
  };
  fi.onpointerleave = function (e) {
    if (e.pointerType === "mouse" && !pinned) {
      hideT = setTimeout(function () {
        fi.classList.remove("show");
      }, 250);
    }
  };
  /* copy works on http too (clipboard API needs https/localhost, so fall back to execCommand) */
  function copyText(t) {
    if (navigator.clipboard && window.isSecureContext)
      return navigator.clipboard.writeText(t);
    return new Promise(function (ok, no) {
      var ta = document.createElement("textarea");
      ta.value = t;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:-100px;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy") ? ok() : no();
      } catch (err) {
        no(err);
      }
      ta.remove();
    });
  }
  function copyLink(u) {
    copyText(u).then(
      function () {
        toast("Link copied");
      },
      function () {
        window.prompt("Copy this link:", u);
      },
    );
  }
  function doShare() {
    var u = location.href.split("#")[0];
    if (navigator.share) {
      navigator.share({ title: document.title, url: u }).catch(function (err) {
        if (!err || err.name !== "AbortError") copyLink(u);
      });
    } else copyLink(u);
  }
  $("a", fi).onclick = function (e) {
    if (this.dataset.act !== "share") return;
    e.preventDefault();
    fmSet(false);
    doShare();
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

  /* ---- Reveal on scroll: animations replay every time a part re-enters the screen ---- */
  var chatT = [];
  function chatReset() {
    chatT.forEach(clearTimeout);
    chatT = [];
    $$("#chat .msg").forEach(function (m) {
      m.classList.remove("show");
    });
    $("#dots").classList.remove("on");
  }
  function typeChat() {
    chatReset();
    var m = $$("#chat .msg"),
      d = $("#dots");
    [0, 1, 2].forEach(function (i) {
      chatT.push(
        setTimeout(function () {
          m[i].classList.add("show");
        }, i * 1100),
      );
    });
    chatT.push(
      setTimeout(function () {
        d.classList.add("on");
      }, 3400),
    );
    chatT.push(
      setTimeout(function () {
        d.classList.remove("on");
        m[3].classList.add("show");
      }, 4800),
    );
  }
  function count(el, on) {
    var id = (el._c = (el._c || 0) + 1);
    if (!on) {
      el.textContent = "0";
      return;
    }
    var end = +el.dataset.count,
      t0 = performance.now();
    (function s(t) {
      if (el._c !== id) return;
      var k = Math.min((t - t0) / 1400, 1);
      el.textContent =
        Math.round(end * (1 - Math.pow(1 - k, 3))) + (el.dataset.suf || "");
      if (k < 1) requestAnimationFrame(s);
    })(t0);
  }
  var io = new IntersectionObserver(
    function (es) {
      es.forEach(function (en) {
        var el = en.target,
          on = en.isIntersecting;
        if (el.id === "chat") return on ? typeChat() : chatReset();
        if (el.dataset.count) return count(el, on);
        el.classList.toggle("in", on);
      });
    },
    { threshold: 0.2 },
  );
  $$(".rv,[data-count],#chat").forEach(function (el, i) {
    el.style.setProperty("--i", i % 4);
    io.observe(el);
  });

  /* ---- Headlines: word-mask reveal ---- */
  $$("h2").forEach(function (h) {
    if (h.closest(".ov") || h.querySelector(".mw")) return;
    var n = 0,
      frag = document.createDocumentFragment();
    h.setAttribute("aria-label", h.textContent.replace(/\s+/g, " ").trim());
    Array.prototype.slice.call(h.childNodes).forEach(function (nd) {
      if (nd.nodeType !== 3) return frag.appendChild(nd);
      nd.textContent.split(/(\s+)/).forEach(function (w) {
        if (!w) return;
        if (/^\s+$/.test(w))
          return frag.appendChild(document.createTextNode(" "));
        var m = document.createElement("span"),
          s = document.createElement("span");
        m.className = "mw";
        m.setAttribute("aria-hidden", "true");
        s.textContent = w;
        s.style.setProperty("--w", n++);
        m.appendChild(s);
        frag.appendChild(m);
      });
    });
    h.textContent = "";
    h.appendChild(frag);
  });

  /* ---- Hero: scroll-driven card transition ----
     p = 0..1 over the pinned runway: card grows to full-bleed, copy swaps, video flies through,
     then the next section slides over as a sheet (that part is plain scroll). */
  (function () {
    var runEl = $(".hero-run");
    if (!runEl) return;
    var card = $(".card"),
      wrap = $(".card-wrap"),
      bks = $$(".bk"),
      hi = $(".hi"),
      lines = $$(".hi .ln > span"),
      hiRest = $$(".hi-sub,.hi-cta"),
      expl = $(".explore"),
      reduce = matchMedia("(prefers-reduced-motion: reduce)").matches,
      vw,
      vh,
      sw,
      st,
      run,
      small,
      tgt = 0,
      cur = 0,
      raf = 0;
    function clamp01(v) {
      return Math.min(Math.max(v, 0), 1);
    }
    function seg(p, a, b) {
      return clamp01((p - a) / (b - a));
    }
    function ease(t) {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2; /* cubic-bezier(.65,0,.35,1) */
    }
    function render(p) {
      var t = ease(seg(p, 0, 0.32)),
        u = ease(seg(p, 0.3, 0.5)),
        ex = ease(seg(p, 0, 0.2)),
        z = seg(p, 0.3, 1),
        c = ease(seg(p, 0.58, 1)),
        side = ((vw - sw) / 2) * (1 - t),
        tilt = small ? 0 : 1;
      card.style.clipPath =
        "inset(" +
        (st * (1 - t)).toFixed(1) +
        "px " +
        side.toFixed(1) +
        "px " +
        (vh * 0.2 * t).toFixed(1) +
        "px " +
        side.toFixed(1) +
        "px round " +
        (32 * (1 - t) + 24 * c).toFixed(1) +
        "px)";
      wrap.style.transform =
        "rotate(" +
        (2.5 * tilt * (1 - t)).toFixed(2) +
        "deg) scale(" +
        (1 - 0.06 * c).toFixed(4) +
        ")";
      card.style.setProperty("--k", (1 + 0.15 * z + 0.12 * (1 - t)).toFixed(4));
      card.style.setProperty("--dim", (0.35 * c).toFixed(3));
      bks.forEach(function (b, i) {
        b.style.transform =
          "translate(" +
          (-sw * (i ? 0.012 : 0.026) * (1 - t)).toFixed(1) +
          "px," +
          (t * vh * 0.55).toFixed(1) +
          "px) rotate(" +
          ((i ? -2.5 : -5) * tilt * (1 - t)).toFixed(2) +
          "deg)";
        b.style.opacity = (1 - seg(p, 0.04, 0.2)).toFixed(3);
      });
      lines.forEach(function (s) {
        s.style.transform = "translateY(" + (-115 * ex).toFixed(1) + "%)";
      });
      hiRest.forEach(function (e) {
        e.style.transform = "translateY(" + (-40 * ex).toFixed(1) + "px)";
        e.style.opacity = (1 - ex).toFixed(3);
      });
      hi.style.visibility = ex >= 1 ? "hidden" : "visible";
      expl.style.opacity = (
        seg(p, 0.3, 0.42) *
        (1 - seg(p, 0.52, 0.64))
      ).toFixed(3);
    }
    function tick() {
      cur += (tgt - cur) * 0.16;
      if (Math.abs(tgt - cur) < 0.0005) cur = tgt;
      render(cur);
      raf = cur === tgt ? 0 : requestAnimationFrame(tick);
    }
    function kick() {
      tgt = clamp01(scrollY / run);
      if (!raf) raf = requestAnimationFrame(tick);
    }
    function geo() {
      vw = innerWidth;
      vh = innerHeight;
      small = vw < 992;
      sw = Math.min(vw * 0.88, 1240);
      st = vh * 0.58;
      run = Math.max(runEl.offsetHeight - vh, 1);
      bks.forEach(function (b) {
        b.style.left = (vw - sw) / 2 + "px";
        b.style.top = st + "px";
        b.style.width = sw + "px";
        b.style.height = vh + "px";
      });
      if (reduce) {
        render(0.5);
      } else {
        kick();
        cur = tgt;
        render(cur);
      }
    }
    geo();
    addEventListener("resize", geo);
    if (!reduce) addEventListener("scroll", kick, { passive: true });
  })();

  /* ---- What we do: click a service, the number rolls and the picture wipes in ---- */
  var svcGrid = $("#svcGrid");
  if (svcGrid) {
    var svcItems = $$(".svc-item", svcGrid),
      svcImgs = $$(".svc-img", svcGrid),
      svcCur = 0,
      svcT;
    var svcPick = function (i) {
      if (i === svcCur) return;
      svcImgs[svcCur].classList.remove("on");
      svcImgs[svcCur].classList.add("prev");
      svcImgs[i].classList.remove("prev");
      svcImgs[i].classList.add("on");
      svcCur = i;
      clearTimeout(svcT);
      svcT = setTimeout(function () {
        svcImgs.forEach(function (m, k) {
          if (k !== svcCur) m.classList.remove("prev");
        });
      }, 900);
      svcItems.forEach(function (it, k) {
        it.classList.toggle("on", k === i);
        $(".svc-b", it).setAttribute("aria-expanded", k === i);
      });
      svcGrid.style.setProperty("--svc", i);
    };
    svcItems.forEach(function (it, i) {
      $(".svc-b", it).onclick = function () {
        svcPick(i);
      };
    });
  }

  /* ---- Four checks: pinned title height, so the stacking cards sit right under it ---- */
  var craftEl = $("#craft"),
    craftHead = $(".craft-head");
  function craftSync() {
    if (craftEl && craftHead)
      craftEl.style.setProperty("--ch", craftHead.offsetHeight + "px");
  }
  craftSync();
  addEventListener("resize", craftSync);
  addEventListener("load", craftSync);

  renderPrices();
})();