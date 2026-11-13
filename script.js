(function () {
  "use strict";
  var $ = function (s, c) {
      return (c || document).querySelector(s);
    },
    $$ = function (s, c) {
      return Array.from((c || document).querySelectorAll(s));
    };
  var root = document.documentElement,
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

  /* ---- Theme toggle ---- */
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

  /* ---- Navbar: scroll state, dropdowns, mobile menu ---- */
  var nav = $("#nav"),
    menu = $("#menu"),
    burger = $("#burger");
  function closeDD() {
    $$(".dd.open").forEach(function (d) {
      d.classList.remove("open");
      $("button", d).setAttribute("aria-expanded", "false");
    });
  }
  $$(".dd > button").forEach(function (b) {
    b.addEventListener("click", function (e) {
      e.stopPropagation();
      var d = b.parentNode,
        was = d.classList.contains("open") && d.dataset.h !== "1";
      d.dataset.h = "";
      closeDD();
      if (!was) {
        d.classList.add("open");
        b.setAttribute("aria-expanded", "true");
      }
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dd")) closeDD();
    if (!e.target.closest("#menu,#burger")) setMenu(false);
  });
  function setMenu(o) {
    menu.classList.toggle("open", o);
    burger.setAttribute("aria-expanded", o);
  }
  burger.onclick = function () {
    setMenu(!menu.classList.contains("open"));
  };
  $$(".panel a").forEach(function (a) {
    a.addEventListener("click", function () {
      closeDD();
      setMenu(false);
    });
  });
  addEventListener(
    "scroll",
    function () {
      nav.classList.toggle("scrolled", scrollY > 30);
      $("#toTop").classList.toggle("show", scrollY > 500);
      if (scrollY > 30) closeDD();
    },
    { passive: true },
  );

  /* ---- Floating buttons ---- */
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
      var s = $(".price", el) || (el.classList.contains("price") ? el : null);
      if (s) s.textContent = fmt(+el.dataset.price);
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
  $("#cartList").onclick = function (e) {
    var b = e.target.closest("[data-rm]");
    if (b) {
      cart.splice(+b.dataset.rm, 1);
      renderCart();
    }
  };
  $$(".pc .add").forEach(function (b) {
    b.onclick = function (e) {
      e.stopPropagation();
      var c = b.closest(".pc"),
        n = $("b", c).textContent,
        f = cart.find(function (i) {
          return i.n === n;
        });
      f ? f.q++ : cart.push({ n: n, p: +c.dataset.price, q: 1 });
      renderCart();
      toast(n + " added to cart");
    };
  });
  function toast(m) {
    var t = document.createElement("div");
    t.className = "toast";
    t.textContent = m;
    document.body.appendChild(t);
    setTimeout(function () {
      t.remove();
    }, 1800);
  }

  /* expose cart to catalog.js */
  window.CSSP = {
    add: function (n, p) {
      var f = cart.find(function (i) {
        return i.n === n;
      });
      f ? f.q++ : cart.push({ n: n, p: p, q: 1 });
      renderCart();
      toast(n + " added to cart");
      var c = $("#cartCount");
      c.classList.remove("bump");
      void c.offsetWidth;
      c.classList.add("bump");
    },
    prices: function () {
      renderPrices();
    },
  };
  /* ---- Overlays: drawer, modals, search ---- */
  function openOv(el) {
    closeAll();
    el.classList.add("open");
    var f = $("input", el);
    if (f)
      setTimeout(function () {
        f.focus();
      }, 120);
  }
  function closeAll() {
    $$(".ov.open,.drawer.open").forEach(function (o) {
      o.classList.remove("open");
    });
  }
  $("#cartBtn").onclick = function () {
    openOv($("#drawer"));
  };
  $("#acct").onclick = function () {
    openOv($("#account"));
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
    }
  });

  /* ---- Search (live filter) ---- */
  var items = $$(".pc").map(function (c) {
    return { n: $("b", c).textContent, d: $("small", c).textContent, el: c };
  });
  $("#q").oninput = function () {
    var v = this.value.toLowerCase().trim();
    $("#sr").innerHTML = v
      ? (window.CSSP_ITEMS || items)
          .filter(function (i) {
            return (i.n + i.d).toLowerCase().includes(v);
          })
          .map(function (i, x) {
            return (
              '<a href="#collection" data-i="' +
              (window.CSSP_ITEMS || items).indexOf(i) +
              '"><b>' +
              i.n +
              "</b><br><small>" +
              i.d +
              "</small></a>"
            );
          })
          .join("") || "<p>No matches.</p>"
      : "";
  };
  $("#sr").onclick = function (e) {
    if (e.target.closest("a")) closeAll();
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
  $$(".box").forEach(function (f) {
    if (f.tagName !== "FORM") return;
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

  /* ---- Brand: dropdown hover/keyboard, floating menu, reveal, hero fades ---- */
  var hoverMQ = matchMedia("(hover: hover) and (min-width: 992px)"),
    hT,
    fT;
  function openDD(d, byHover) {
    closeDD();
    d.classList.add("open");
    if (byHover) d.dataset.h = "1";
    $("button", d).setAttribute("aria-expanded", "true");
  }
  $$(".menu .dd").forEach(function (d) {
    d.addEventListener("pointerenter", function (e) {
      if (e.pointerType !== "mouse" || !hoverMQ.matches) return;
      clearTimeout(hT);
      hT = setTimeout(function () {
        openDD(d, true);
      }, 90);
    });
    d.addEventListener("pointerleave", function (e) {
      if (e.pointerType !== "mouse" || !hoverMQ.matches) return;
      clearTimeout(hT);
      hT = setTimeout(closeDD, 220);
    });
    d.addEventListener("keydown", function (e) {
      var items = $$(".panel a", d),
        i = items.indexOf(document.activeElement);
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (!d.classList.contains("open")) openDD(d, false);
        i =
          e.key === "ArrowDown"
            ? (i + 1) % items.length
            : i <= 0
              ? items.length - 1
              : i - 1;
        items[i].focus();
      } else if (e.key === "Escape") {
        closeDD();
        $(".ddb", d).focus();
      }
    });
    d.addEventListener("focusout", function (e) {
      if (!d.contains(e.relatedTarget)) closeDD();
    });
  });
  var owner = $(".owner"),
    explore = $(".explore"),
    vid = $(".hero-video");
  function heroFx() {
    if (owner) owner.classList.toggle("gone", scrollY > innerHeight * 0.25);
    if (explore) explore.classList.toggle("gone", scrollY > 40);
  }
  addEventListener(
    "scroll",
    function () {
      closeDD();
      heroFx();
    },
    { passive: true },
  );
  heroFx();
  if (vid) {
    vid.muted = true;
    var vp = vid.play();
    if (vp && vp.catch) vp.catch(function () {});
  }

  var fm = $("#fm"),
    fi = $("#finfo");
  var INFO = {
    call: ["Call us", "Mon to Sat, 8 AM to 6 PM · +63 900 000 0000"],
    msg: ["Message us", "Email our team. We reply within one business day."],
    share: ["Share link", "Copy or share this page with your team."],
  };
  function fmSet(o) {
    fm.classList.toggle("open", o);
    $("#fmMain").setAttribute("aria-expanded", o);
    if (!o) {
      fi.classList.remove("show");
      pinned = null;
    }
  }
  function sharePage() {
    var u = location.href.split("#")[0];
    if (navigator.share)
      navigator.share({ title: document.title, url: u }).catch(function () {});
    else if (navigator.clipboard)
      navigator.clipboard.writeText(u).then(function () {
        toast("Link copied");
      });
    else toast(u);
  }
  $("#fmMain").onclick = function (e) {
    e.stopPropagation();
    fmSet(!fm.classList.contains("open"));
  };
  fm.addEventListener("pointerenter", function (e) {
    if (e.pointerType === "mouse") {
      clearTimeout(fT);
      fmSet(true);
    }
  });
  fm.addEventListener("pointerleave", function (e) {
    if (e.pointerType === "mouse" && !pinned)
      fT = setTimeout(function () {
        fmSet(false);
      }, 250);
  });
  $$(".fm .sub-old").forEach(function (b) {
    function show() {
      var t = INFO[b.dataset.info];
      $("b", fi).textContent = t[0];
      $("span", fi).textContent = t[1];
      fi.classList.add("show");
    }
    function hide() {
      fi.classList.remove("show");
    }
    b.addEventListener("pointerenter", show);
    b.addEventListener("pointerleave", hide);
    b.addEventListener("focus", show);
    b.addEventListener("blur", hide);
    b.addEventListener("click", function (e) {
      if (b.dataset.info === "share") {
        e.preventDefault();
        sharePage();
      }
      fmSet(false);
    });
  });
  /* Chat bubble beside the clicked/hovered floating button */
  var pinned = null;
  var INFO2 = {
    call: {
      t: "Call us",
      s: "Mon to Sat, 8 AM to 6 PM",
      l: "+63 900 000 0000",
      h: "tel:+639000000000",
    },
    msg: {
      t: "Email us",
      s: "We reply within one business day.",
      l: "hello@example.com",
      h: "mailto:hello@example.com",
    },
    share: {
      t: "Share this page",
      s: "Copy or share the link with your team.",
      l: "Share now",
      h: "#",
    },
  };
  function bubble(b) {
    var t = INFO2[b.dataset.info],
      a = $("a", fi),
      r = b.getBoundingClientRect();
    $("b", fi).textContent = t.t;
    $("span", fi).textContent = t.s;
    a.textContent = t.l;
    a.href = t.h;
    a.dataset.act = b.dataset.info;
    fi.style.top = r.top + r.height / 2 + "px";
    fi.style.right = innerWidth - r.left + 16 + "px";
    fi.classList.add("show");
  }
  $$(".fm .sub").forEach(function (b) {
    b.addEventListener("pointerenter", function (e) {
      if (e.pointerType === "mouse" && !pinned) bubble(b);
    });
    b.addEventListener("pointerleave", function (e) {
      if (e.pointerType === "mouse" && !pinned) fi.classList.remove("show");
    });
    b.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      pinned = b;
      bubble(b);
    });
  });
  $("a", fi).addEventListener("click", function (e) {
    if (this.dataset.act === "share") {
      e.preventDefault();
      sharePage();
    }
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest("#fm, #finfo")) fmSet(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") fmSet(false);
  });

  if (
    "IntersectionObserver" in window &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (en) {
          if (!en.isIntersecting) return;
          var el = en.target;
          el.classList.add("in");
          io.unobserve(el);
          setTimeout(function () {
            el.classList.remove("rv", "in");
          }, 1400);
        });
      },
      { threshold: 0.12 },
    );
    $$(
      "section > *, .cal > *, .bento > *, .tags span, .mq, .fo, .fw, .stats",
    ).forEach(function (el, i) {
      el.classList.add("rv");
      el.style.setProperty("--i", i % 5);
      io.observe(el);
    });
  }

  /* ---- Init ---- */
  renderPrices();
})();

/* after */
(function () {
  "use strict";
  var $ = function (s, c) {
      return (c || document).querySelector(s);
    },
    $$ = function (s, c) {
      return Array.from((c || document).querySelectorAll(s));
    };
  /* [category, name, price PHP, FontAwesome icon, badge, optional image path] */
  var C = {
    U: "Coveralls & Uniforms",
    K: "Chef & Kitchen",
    J: "Jackets & Rainwear",
    F: "Safety Footwear",
    H: "Head, Eye & Ear PPE",
    B: "Gloves & Body PPE",
    S: "Seafarer Essentials",
  };
  var D = [
    ["U", "Coveralls (Royal Blue)", 1000, "user-shield", "best"],
    ["U", "Coveralls (Orange)", 1000, "user-shield", "new"],
    ["U", "Coveralls (Khaki)", 1000, "user-shield", "sale"],
    ["U", "Coveralls (Navy)", 1000, "user-shield"],
    ["U", "Coveralls (Green)", 1000, "user-shield"],
    ["U", "Coveralls (Red)", 1000, "user-shield"],
    ["U", "Coveralls (Grey)", 1000, "user-shield"],
    ["U", "Coveralls (White)", 1050, "user-shield", "new"],
    ["K", "Chef Polo Long Sleeve (Ver. 1)", 800, "utensils", "new"],
    ["K", "Chef Polo Long Sleeve (Ver. 2)", 800, "utensils"],
    ["K", "Chef Polo Short Sleeve", 750, "utensils", "best"],
    ["K", "Chef Pants (Checkered)", 700, "utensils", "best"],
    ["K", "Kitchen Pants (Black)", 700, "utensils", "sale"],
    ["K", "Bib Apron", 350, "utensils"],
    ["K", "Chef Cap", 180, "hat-cowboy"],
    ["K", "Neckerchief", 120, "utensils"],
    ["J", "Winter Jacket", 1500, "wind"],
    ["J", "Ordinary Jacket", 1500, "wind"],
    ["J", "Rain Jacket", 950, "cloud-showers-heavy", "new"],
    ["J", "Reflective Jacket", 1300, "wind", "best"],
    ["J", "Fleece Jacket", 1100, "wind"],
    ["J", "Thermal Parka", 2200, "snowflake", "new"],
    ["F", "MG Safety BS-07 High Cut", 2100, "shoe-prints", "best"],
    ["F", "MG Safety BS-08 Low Cut", 1900, "shoe-prints", "sale"],
    ["F", "Rockwinner Safety Shoe", 2300, "shoe-prints", "new"],
    ["F", "PVC Rubber Boots", 850, "shoe-prints"],
    ["F", "Steel-toe Rigger Boots", 2600, "shoe-prints"],
    ["F", "Anti-slip Galley Shoes", 1450, "shoe-prints"],
    ["F", "Safety Sandals", 1200, "shoe-prints"],
    ["F", "Insulated Deck Boots", 2800, "shoe-prints", "new"],
    ["H", "Safety Helmet", 380, "helmet-safety", "best"],
    ["H", "Hard Hat with Chin Strap", 450, "helmet-safety"],
    ["H", "Welding Goggles", 260, "glasses"],
    ["H", "Clear Safety Glasses", 150, "glasses", "sale"],
    ["H", "Ear Muffs", 420, "headphones"],
    ["H", "Ear Plugs (Box of 50)", 280, "headphones"],
    ["H", "Face Shield", 320, "mask-face"],
    ["H", "Dust Mask (Pack of 20)", 240, "mask-face"],
    ["B", "Cotton Gloves (Dozen)", 300, "hand"],
    ["B", "Leather Work Gloves", 280, "hand", "best"],
    ["B", "Rubber Gloves", 180, "hand"],
    ["B", "Cut-resistant Gloves", 390, "hand", "new"],
    ["B", "Safety Harness", 1850, "link"],
    ["B", "Reflective Vest", 220, "vest", "sale"],
    ["B", "Life Jacket", 1600, "life-ring", "best"],
    ["B", "Rain Suit Set", 1100, "cloud-showers-heavy"],
    ["S", "Sailor Cap", 250, "anchor"],
    ["S", "Epaulettes (Pair)", 200, "anchor"],
    ["S", "Embroidered Name Tag", 90, "id-badge"],
    ["S", "Embroidered Patch", 120, "anchor", "new"],
    ["S", "Cotton Socks (3 pairs)", 210, "socks"],
    ["S", "Thermal Underwear Set", 650, "temperature-low"],
    ["S", "Bath Towel", 320, "bath"],
    ["S", "Duffel Bag", 900, "bag-shopping", "best"],
  ];
  var HUE = { U: 150, K: 165, J: 140, F: 175, H: 130, B: 158, S: 185 },
    BADGE = { best: "Bestseller", new: "New", sale: "Sale" };
  var items = D.map(function (d, i) {
    return {
      c: d[0],
      cat: C[d[0]],
      n: d[1],
      p: d[2],
      ic: d[3],
      bd: d[4],
      img: d[5] || "",
      low: i % 7 === 3,
      d: C[d[0]],
    };
  });
  window.CSSP_ITEMS = items; /* script.js search reads this */
  var grid = $("#catGrid"),
    bar = $("#catBar"),
    more = $("#catMore"),
    cnt = $("#catCount");
  if (!grid) return;
  var cat = "All",
    shown = 12;
  function cards() {
    var l = items.filter(function (i) {
      return cat === "All" || i.cat === cat;
    });
    cnt.textContent = l.length + " items";
    grid.innerHTML = l
      .slice(0, shown)
      .map(function (i, k) {
        var x = items.indexOf(i);
        return (
          '<article class="pk" style="--i:' +
          (k % 12) +
          ";--h:" +
          HUE[i.c] +
          '" data-price="' +
          i.p +
          '"><div class="pk-img">' +
          (i.bd
            ? '<span class="tagb ' + i.bd + '">' + BADGE[i.bd] + "</span>"
            : "") +
          (i.img
            ? '<img src="' + i.img + '" alt="' + i.n + '" loading="lazy">'
            : '<i class="fa-solid fa-' + i.ic + '"></i>') +
          '</div><div class="pk-b"><span class="pk-c">' +
          i.cat +
          '</span><span class="pk-n">' +
          i.n +
          '</span><span class="price"></span><span class="stk' +
          (i.low ? " low" : "") +
          '">' +
          (i.low ? "Only a few left" : "Stock Available") +
          '</span><button class="add2" data-x="' +
          x +
          '"><i class="fa-solid fa-cart-shopping"></i> Add to cart</button></div></article>'
        );
      })
      .join("");
    more.style.display = l.length > shown ? "" : "none";
    window.CSSP.prices();
  }
  bar.innerHTML = ["All"]
    .concat(
      Object.keys(C).map(function (k) {
        return C[k];
      }),
    )
    .map(function (n) {
      return (
        '<button class="chip' +
        (n === "All" ? " on" : "") +
        '" data-f="' +
        n +
        '">' +
        n +
        "</button>"
      );
    })
    .join("");
  function setCat(n) {
    cat = n;
    shown = 12;
    $$(".chip", bar).forEach(function (c) {
      c.classList.toggle("on", c.dataset.f === n);
    });
    cards();
  }
  bar.onclick = function (e) {
    var b = e.target.closest(".chip");
    if (b) setCat(b.dataset.f);
  };
  more.onclick = function () {
    shown += 12;
    cards();
  };
  grid.onclick = function (e) {
    var b = e.target.closest(".add2");
    if (b) {
      var i = items[+b.dataset.x];
      window.CSSP.add(i.n, i.p);
    }
  };
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-cat]");
    if (a) setCat(a.dataset.cat);
  });
  cards();
  /* animated counters */
  var io = new IntersectionObserver(
    function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target,
          end = +el.dataset.count,
          t0 = performance.now();
        io.unobserve(el);
        (function s(t) {
          var k = Math.min((t - t0) / 1400, 1);
          el.textContent =
            Math.round(end * (1 - Math.pow(1 - k, 3))) + (el.dataset.suf || "");
          if (k < 1) requestAnimationFrame(s);
        })(t0);
      });
    },
    { threshold: 0.5 },
  );
  $$("[data-count]").forEach(function (el) {
    io.observe(el);
  });
  /* scroll progress bar */
  var pg = $("#prog");
  addEventListener(
    "scroll",
    function () {
      var h = document.documentElement;
      pg.style.width = (scrollY / (h.scrollHeight - innerHeight)) * 100 + "%";
    },
    { passive: true },
  );
})();
