(function (window, document) {
  "use strict";

  var cartKey = "cssp-cart-v3",
    legacyProductCartKey = "cssp-products-cart-v2",
    themeKey = "cssp-theme",
    root = document.documentElement;

  function reportStorageError(message, error) {
    if (window.console && typeof window.console.error === "function") {
      window.console.error(message, error);
    }
  }

  function normalizeItem(item) {
    if (!item || typeof item !== "object") return null;

    var name = typeof item.name === "string" ? item.name : item.n,
      price = Number(item.price != null ? item.price : item.p),
      quantity = Number(item.quantity != null ? item.quantity : item.q);
    if (
      typeof name !== "string" ||
      !name.trim() ||
      !Number.isFinite(price) ||
      price < 0 ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 999
    ) {
      return null;
    }

    return {
      sku: typeof item.sku === "string" ? item.sku : "",
      name: name,
      price: price,
      quantity: quantity,
      size: typeof item.size === "string" ? item.size : "",
      sizeLabel: typeof item.sizeLabel === "string" ? item.sizeLabel : "",
    };
  }

  function normalizeCart(items) {
    return Array.isArray(items)
      ? items.map(normalizeItem).filter(function (item) {
          return item !== null;
        })
      : [];
  }

  function parseCart(raw) {
    try {
      return normalizeCart(JSON.parse(raw));
    } catch (error) {
      reportStorageError("The saved cart could not be read.", error);
      return [];
    }
  }

  function getCart() {
    try {
      var savedCart = window.localStorage.getItem(cartKey);
      if (savedCart !== null) return parseCart(savedCart);

      var legacyCart = window.localStorage.getItem(legacyProductCartKey);
      if (legacyCart !== null) {
        var migratedCart = parseCart(legacyCart);
        window.localStorage.setItem(cartKey, JSON.stringify(migratedCart));
        return migratedCart;
      }
    } catch (error) {
      reportStorageError("The saved cart is unavailable in this browser.", error);
      return null;
    }
    return null;
  }

  function notifyCart(items) {
    window.dispatchEvent(
      new CustomEvent("cssp:cart-updated", { detail: normalizeCart(items) }),
    );
  }

  function setCart(items) {
    if (!Array.isArray(items)) {
      throw new TypeError("Cart data must be an array.");
    }
    var normalizedCart = normalizeCart(items);
    try {
      window.localStorage.setItem(cartKey, JSON.stringify(normalizedCart));
    } catch (error) {
      reportStorageError("The cart could not be saved in this browser.", error);
      return false;
    }
    notifyCart(normalizedCart);
    return true;
  }

  function getTheme() {
    var savedTheme = "";
    try {
      savedTheme = window.localStorage.getItem(themeKey) || "";
      if (savedTheme !== "light" && savedTheme !== "dark") {
        var legacyDashboardTheme =
          window.localStorage.getItem("cssp-dash-theme") || "";
        if (legacyDashboardTheme === "light" || legacyDashboardTheme === "dark") {
          savedTheme = legacyDashboardTheme;
          window.localStorage.setItem(themeKey, savedTheme);
        }
      }
    } catch (error) {
      reportStorageError("The saved theme preference could not be read.", error);
    }
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    if (theme !== "light" && theme !== "dark") return;
    root.setAttribute("data-theme", theme);
  }

  function setTheme(theme) {
    if (theme !== "light" && theme !== "dark") {
      throw new TypeError("Theme must be light or dark.");
    }
    applyTheme(theme);
    try {
      window.localStorage.setItem(themeKey, theme);
    } catch (error) {
      reportStorageError("The theme preference could not be saved.", error);
      return false;
    }
    return true;
  }

  applyTheme(getTheme());

  window.addEventListener("storage", function (event) {
    if (event.key === themeKey) {
      applyTheme(event.newValue);
    } else if (event.key === cartKey) {
      notifyCart(parseCart(event.newValue || "[]"));
    }
  });

  window.CSSPSiteState = {
    cartKey: cartKey,
    getCart: getCart,
    setCart: setCart,
    onCartChange: function (callback) {
      window.addEventListener("cssp:cart-updated", function (event) {
        callback(event.detail);
      });
    },
    getTheme: getTheme,
    setTheme: setTheme,
  };
})(window, document);
