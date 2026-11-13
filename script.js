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
      ? items
          .filter(function (i) {
            return (i.n + i.d).toLowerCase().includes(v);
          })
          .map(function (i, x) {
            return (
              '<a href="#collection" data-i="' +
              items.indexOf(i) +
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
    if (!o) fi.classList.remove("show");
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
    if (e.pointerType === "mouse")
      fT = setTimeout(function () {
        fmSet(false);
      }, 250);
  });
  $$(".fm .sub").forEach(function (b) {
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
  document.addEventListener("click", function (e) {
    if (!e.target.closest("#fm")) fmSet(false);
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
