(function () {
  "use strict";

  var $ = function (selector, context) {
      return (context || document).querySelector(selector);
    },
    $$ = function (selector, context) {
      return Array.prototype.slice.call(
        (context || document).querySelectorAll(selector),
      );
    },
    root = document.documentElement,
    currencies = {
      PHP: { rate: 1, symbol: "₱" },
      USD: { rate: 0.0172, symbol: "$" },
      EUR: { rate: 0.0159, symbol: "€" },
    };

  function readStorage(key, fallback) {
    try {
      var value = localStorage.getItem(key);
      return value === null ? fallback : value;
    } catch (error) {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      showToast("Your browser could not save this preference.");
    }
  }

  function showToast(message) {
    var toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.textContent = message;
    $("#toastContainer").appendChild(toast);
    window.setTimeout(function () {
      toast.remove();
    }, 2400);
  }

  var currency = readStorage("cssp-cur", "PHP");
  if (!currencies[currency]) currency = "PHP";

  function formatPrice(amount) {
    var converted = amount * currencies[currency].rate;
    return (
      currencies[currency].symbol +
      converted.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    $("#tg").innerHTML =
      '<i class="fa-solid fa-' + (theme === "dark" ? "sun" : "moon") + '"></i>';
    $("#tg").setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
    );
    writeStorage("cssp-theme", theme);
  }

  var savedTheme = readStorage("cssp-theme", "");
  if (savedTheme !== "light" && savedTheme !== "dark") {
    savedTheme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  }
  setTheme(savedTheme);
  $("#tg").addEventListener("click", function () {
    setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  var nav = $("#nav"),
    menu = $("#menu"),
    burger = $("#burger");

  function closeDropdowns() {
    $$(".dd.open").forEach(function (dropdown) {
      dropdown.classList.remove("open");
      var button = $("button", dropdown);
      if (button) button.setAttribute("aria-expanded", "false");
    });
  }

  function setMenu(open) {
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  }

  $$(".dd").forEach(function (dropdown) {
    var button = dropdown.querySelector(":scope > button");
    if (!button) return;
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      var opening = !dropdown.classList.contains("open");
      closeDropdowns();
      dropdown.classList.toggle("open", opening);
      button.setAttribute("aria-expanded", String(opening));
    });
  });

  burger.addEventListener("click", function (event) {
    event.stopPropagation();
    setMenu(!menu.classList.contains("open"));
  });

  $$(".menu a").forEach(function (link) {
    link.addEventListener("click", function () {
      closeDropdowns();
      setMenu(false);
    });
  });

  var cart = [],
    uniformSizeReference = [
      { size: "S", label: "Small", chest: "86–90", waist: "72–76", height: "160–165" },
      { size: "M", label: "Medium", chest: "91–96", waist: "77–82", height: "166–170" },
      { size: "L", label: "Large", chest: "97–102", waist: "83–88", height: "171–176" },
      { size: "XL", label: "X-Large", chest: "103–110", waist: "89–96", height: "177–182" },
      { size: "2XL", label: "XX-Large", chest: "111–118", waist: "97–104", height: "183–188" },
    ],
    shoeSizeReference = [
      { size: "7", eu: "41", length: "26.0 cm" },
      { size: "8", eu: "42", length: "26.7 cm" },
      { size: "9", eu: "43", length: "27.3 cm" },
      { size: "10", eu: "44", length: "28.0 cm" },
      { size: "11", eu: "45", length: "28.7 cm" },
    ];

  function migrateLegacyCart(legacyCart) {
    if (!Array.isArray(legacyCart)) return [];
    return legacyCart.reduce(function (migrated, item) {
      if (!item || typeof item.name !== "string" || typeof item.size !== "string") {
        return migrated;
      }
      var card = $$(".product-card").find(function (productCard) {
          return productCard.dataset.name === item.name;
        }),
        quantity = Number(item.quantity),
        size = item.size.trim().toUpperCase();
      if (!card || !Number.isInteger(quantity) || quantity < 1 || quantity > 999) {
        return migrated;
      }

      var sizeReference,
        sizeLabel;
      if (card.dataset.type === "Shoes") {
        size = size.replace(/^PH\s*/, "");
        var euSize = size.match(/^EU\s*(\d+)$/);
        if (euSize) size = String(Number(euSize[1]) - 34);
        sizeReference = shoeSizeReference.find(function (reference) {
          return reference.size === size;
        });
        if (!sizeReference) return migrated;
        sizeLabel =
          "PH " +
          sizeReference.size +
          " (EU " +
          sizeReference.eu +
          " · " +
          sizeReference.length +
          ")";
      } else {
        var uniformSizeLabels = {
          SMALL: "S",
          MEDIUM: "M",
          LARGE: "L",
          "X-LARGE": "XL",
          "XX-LARGE": "2XL",
        };
        size = uniformSizeLabels[size] || size;
        sizeReference = uniformSizeReference.find(function (reference) {
          return reference.size === size;
        });
        if (!sizeReference) return migrated;
        sizeLabel = sizeReference.label;
      }

      migrated.push({
        sku: card.dataset.sku,
        name: card.dataset.name,
        price: Number(card.dataset.price),
        quantity: quantity,
        size: sizeReference.size,
        sizeLabel: sizeLabel,
      });
      return migrated;
    }, []);
  }

  try {
    var currentCart = window.CSSPSiteState.getCart();
    if (currentCart === null) {
      var legacyCart = JSON.parse(readStorage("cssp-products-cart", "[]"));
      cart = migrateLegacyCart(legacyCart);
      if (!window.CSSPSiteState.setCart(cart)) {
        showToast("Your cart could not be saved in this browser.");
      }
      if (Array.isArray(legacyCart) && cart.length < legacyCart.length) {
        showToast("Some saved cart selections need to be added again with a supported size.");
      }
    } else {
      var validSavedCart = currentCart.filter(function (item) {
        var hasValidFields =
          item &&
          typeof item.sku === "string" &&
          typeof item.name === "string" &&
          Number.isFinite(Number(item.price)) &&
          Number(item.price) >= 0 &&
          Number.isInteger(Number(item.quantity)) &&
          Number(item.quantity) > 0 &&
          typeof item.size === "string" &&
          typeof item.sizeLabel === "string";
        if (!hasValidFields) return false;
        if (!item.sku) return !item.size;
        return (
          (item.sku.indexOf("SHO-") === 0
            ? shoeSizeReference.some(function (reference) {
                return reference.size === item.size;
              })
            : uniformSizeReference.some(function (reference) {
                return reference.size === item.size;
              }))
        );
      });
      cart = validSavedCart.map(function (item) {
        return {
          sku: item.sku,
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity),
          size: item.size,
          sizeLabel: item.sku
            ? item.sku.indexOf("SHO-") === 0
              ? item.sizeLabel
              : uniformSizeReference.find(function (reference) {
                  return reference.size === item.size;
                }).label
            : "",
        };
      });
      if (!window.CSSPSiteState.setCart(cart)) {
        showToast("Your cart could not be saved in this browser.");
      }
      if (cart.length < currentCart.length) {
        showToast("Some saved cart selections need to be added again with a supported size.");
      }
    }
  } catch (error) {
    cart = [];
  }

  function saveCart() {
    if (!window.CSSPSiteState.setCart(cart)) {
      showToast("Your cart could not be saved in this browser.");
    }
  }

  function makeButton(label, action, icon, className) {
    var button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", label);
    button.dataset.cartAction = action;
    if (className) button.className = className;
    var glyph = document.createElement("i");
    glyph.className = "fa-solid fa-" + icon;
    button.appendChild(glyph);
    return button;
  }

  function renderCart() {
    var list = $("#cartList"),
      itemCount = 0,
      total = 0;
    list.replaceChildren();

    if (!cart.length) {
      var empty = document.createElement("div");
      empty.className = "cart-empty";
      empty.innerHTML =
        '<i class="fa-solid fa-basket-shopping" aria-hidden="true"></i><b>Your cart is waiting.</b><span>Add an item to see it here.</span>';
      list.appendChild(empty);
    } else {
      cart.forEach(function (item, index) {
        itemCount += item.quantity;
        total += item.price * item.quantity;

        var row = document.createElement("div"),
          name = document.createElement("b"),
          detail = document.createElement("span"),
          price = document.createElement("span"),
          controls = document.createElement("div");
        row.className = "ci";
        name.textContent = item.name;
        detail.className = "cart-item-detail";
        detail.textContent =
          (item.sku
            ? "Size: " + item.sizeLabel
            : "Quote item · Not available for online checkout") +
          " · " +
          "Unit price " +
          formatPrice(item.price);
        price.className = "cart-item-price";
        price.textContent = formatPrice(item.price * item.quantity);
        controls.className = "cart-item-controls";
        controls.appendChild(
          makeButton("Decrease quantity", "decrease", "minus"),
        );
        var quantity = document.createElement("span");
        quantity.textContent = String(item.quantity);
        quantity.setAttribute("aria-label", "Quantity");
        controls.appendChild(quantity);
        controls.appendChild(
          makeButton("Increase quantity", "increase", "plus"),
        );
        var removeButton = makeButton(
          "Remove " + item.name,
          "remove",
          "trash",
          "cart-remove",
        );
        controls.appendChild(removeButton);
        row.dataset.index = String(index);
        row.appendChild(name);
        row.appendChild(detail);
        row.appendChild(price);
        row.appendChild(controls);
        list.appendChild(row);
      });
    }

    $("#cartCount").textContent = String(itemCount);
    $("#cartCount").setAttribute(
      "aria-label",
      itemCount + (itemCount === 1 ? " item in cart" : " items in cart"),
    );
    $("#cartTot").textContent = formatPrice(total);
    $("#curCode").textContent = currency;
    $$("[data-cur]").forEach(function (button) {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.cur === currency),
      );
    });
    $$(".card-price[data-base]").forEach(function (price) {
      price.textContent = formatPrice(Number(price.dataset.base));
    });
    if (activeProduct) {
      $("#productDetailPrice").textContent = formatPrice(activeProduct.price);
    }
    if ($("#checkout").classList.contains("open")) {
      $("#checkoutSubtotal").textContent = formatPrice(
        cart.reduce(function (sum, item) {
          return sum + item.price * item.quantity;
        }, 0),
      );
    }
  }

  function isOrderableCartItem(item) {
    if (!item.sku || !item.size) return false;
    var references =
      item.sku.indexOf("SHO-") === 0
        ? shoeSizeReference
        : uniformSizeReference;
    return references.some(function (reference) {
      return reference.size === item.size;
    });
  }

  window.CSSPSiteState.onCartChange(function (updatedCart) {
    cart = updatedCart;
    renderCart();
  });

  var cartBackdrop = document.createElement("div");
  cartBackdrop.className = "cart-backdrop";
  cartBackdrop.setAttribute("aria-hidden", "true");
  document.body.appendChild(cartBackdrop);

  function closeOverlays() {
    if ($("#account").classList.contains("open") && !sessionUser) {
      pendingCheckout = false;
    }
    $$(".ov.open").forEach(function (overlay) {
      overlay.classList.remove("open");
      overlay.setAttribute("aria-hidden", "true");
    });
    $("#drawer").classList.remove("open");
    $("#drawer").setAttribute("aria-hidden", "true");
    $("#cartBtn").setAttribute("aria-expanded", "false");
    cartBackdrop.classList.remove("open");
    closeDropdowns();
  }

  function openOverlay(overlay) {
    closeOverlays();
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    var focusTarget =
      overlay.id === "productOptions"
        ? $("[data-close]", overlay)
        : $("input", overlay);
    if (focusTarget) window.setTimeout(function () {
      focusTarget.focus();
    }, 100);
  }

  function openCart() {
    closeOverlays();
    $("#drawer").classList.add("open");
    $("#drawer").setAttribute("aria-hidden", "false");
    $("#cartBtn").setAttribute("aria-expanded", "true");
    cartBackdrop.classList.add("open");
    var closeButton = $("#drawer [data-close]");
    if (closeButton) closeButton.focus();
  }

  $("#drawer").setAttribute("aria-hidden", "true");
  $("#cartBtn").setAttribute("aria-expanded", "false");
  $("#cartBtn").addEventListener("click", openCart);
  $("#searchBtn").addEventListener("click", function () {
    openOverlay($("#search"));
  });
  cartBackdrop.addEventListener("click", closeOverlays);
  $("#drawer").addEventListener("click", function (event) {
    var actionButton = event.target.closest("[data-cart-action]");
    if (!actionButton) return;
    var row = actionButton.closest(".ci"),
      index = Number(row.dataset.index),
      action = actionButton.dataset.cartAction;
    if (!cart[index]) return;
    if (action === "increase") cart[index].quantity += 1;
    if (action === "increase" && cart[index].quantity > 999) {
      cart[index].quantity = 999;
      showToast("A maximum of 999 units can be ordered per size.");
    }
    if (action === "decrease") {
      cart[index].quantity -= 1;
      if (cart[index].quantity <= 0) cart.splice(index, 1);
    }
    if (action === "remove") cart.splice(index, 1);
    saveCart();
    renderCart();
  });

  $("[data-cart-clear]").addEventListener("click", function () {
    cart = [];
    saveCart();
    renderCart();
    showToast("Cart cleared.");
  });

  function openCheckout() {
    if (!cart.length) {
      showToast("Add a product to your cart before checking out.");
      return;
    }
    if (cart.some(function (item) { return !isOrderableCartItem(item); })) {
      showToast("Remove quote-only items from your cart before online checkout.");
      return;
    }
    $("#checkoutForm").reset();
    $("#checkoutPhone").value = sessionUser.phone || "";
    $("#checkoutSubtotal").textContent = formatPrice(
      cart.reduce(function (sum, item) {
        return sum + item.price * item.quantity;
      }, 0),
    );
    $("#checkoutError").textContent = "";
    openOverlay($("#checkout"));
  }

  function beginCheckout() {
    if (!cart.length) {
      showToast("Add a product to your cart before checking out.");
      return;
    }
    if (cart.some(function (item) { return !isOrderableCartItem(item); })) {
      showToast("Remove quote-only items from your cart before online checkout.");
      return;
    }
    if (!sessionUser) {
      pendingCheckout = true;
      setAccountMode("login");
      $("#accountMessage").textContent =
        "Log in or create an account to place your order.";
      openOverlay($("#account"));
      return;
    }
    openCheckout();
  }

  $$("[data-checkout]").forEach(function (button) {
    button.addEventListener("click", beginCheckout);
  });

  $$("[data-cur]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (!currencies[button.dataset.cur]) return;
      currency = button.dataset.cur;
      writeStorage("cssp-cur", currency);
      closeDropdowns();
      renderCart();
    });
  });

  var activeProduct = null,
    selectedSize = null,
    galleryImages = [],
    galleryIndex = 0,
    sessionUser = null,
    csrfToken = "",
    pendingCheckout = false,
    accountMode = "login";

  function setAccountMode(mode) {
    accountMode = mode;
    $$("[data-tab]", $("#account")).forEach(function (tab) {
      tab.classList.toggle(
        "on",
        tab.dataset.tab === (mode === "register" ? "up" : "in"),
      );
    });
    $("#nameRow").hidden = mode !== "register";
    $("#nameRow input").required = mode === "register";
    var passwordInput = $('input[name="password"]', $("#account"));
    passwordInput.setAttribute(
      "autocomplete",
      mode === "register" ? "new-password" : "current-password",
    );
    if (mode === "register") passwordInput.minLength = 8;
    else passwordInput.removeAttribute("minlength");
    $("#acctGo").textContent =
      mode === "register" ? "Create account" : "Log in";
  }

  function updateAccountUI() {
    var signedIn = Boolean(sessionUser);
    $("#accountFields").hidden = signedIn;
    $("#accountSession").hidden = !signedIn;
    $("#accountMessage").textContent = "";
    $("#adminDashboard").hidden =
      !signedIn ||
      (sessionUser.role !== "owner" && sessionUser.role !== "admin");
    if (signedIn) {
      $("#accountUserName").textContent = sessionUser.full_name;
      $("#accountUserEmail").textContent = sessionUser.email;
      $("#checkoutAccount").textContent =
        "Ordering as " + sessionUser.full_name + " (" + sessionUser.email + ")";
      $("#acct").setAttribute("aria-label", "Account: " + sessionUser.full_name);
    } else {
      $("#acct").setAttribute("aria-label", "Account");
      $("#checkoutAccount").textContent = "";
    }
  }

  async function requestJson(url, options) {
    var response = await fetch(url, Object.assign({
      credentials: "same-origin",
      headers: { Accept: "application/json" },
    }, options || {}));
    var payload;
    try {
      payload = await response.json();
    } catch (error) {
      throw new Error("The server returned an invalid response. Please try again.");
    }
    if (!response.ok) {
      var requestError = new Error(
        payload && payload.error ? payload.error : "The request could not be completed.",
      );
      requestError.status = response.status;
      throw requestError;
    }
    return payload;
  }

  async function refreshSession() {
    try {
      var data = await requestJson("./api/auth.php?action=session");
      sessionUser = data.authenticated ? data.user : null;
      csrfToken = data.csrf_token || "";
      updateAccountUI();
      var authMode = new URLSearchParams(window.location.search).get("auth");
      if (authMode === "login" || (authMode === "required" && !sessionUser)) {
        $("#accountMessage").textContent =
          authMode === "required"
            ? "Please log in with an administrator account to open the dashboard."
            : "";
        setAccountMode("login");
        openOverlay($("#account"));
      }
    } catch (error) {
      $("#accountMessage").textContent = error.message;
    }
  }

  function setSelectedSize(size, label) {
    selectedSize = { value: size, label: label };
    $$(".size-choice", $("#productSizeChoices")).forEach(function (button) {
      var selected = button.dataset.size === size;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    $("#selectedSizeLabel").textContent = "Selected: " + label;
    $("#productOptionsError").textContent = "";
  }

  function renderSizeReference(isShoes) {
    var head = $("#sizeReferenceHead"),
      body = $("#sizeReferenceBody"),
      choices = $("#productSizeChoices");
    head.replaceChildren();
    body.replaceChildren();
    choices.replaceChildren();

    var headers = isShoes
      ? ["PH size", "EU size", "Foot length"]
      : ["Size", "Chest (cm)", "Waist (cm)", "Height (cm)"];
    var headerRow = document.createElement("tr");
    headers.forEach(function (label) {
      var cell = document.createElement("th");
      cell.scope = "col";
      cell.textContent = label;
      headerRow.appendChild(cell);
    });
    head.appendChild(headerRow);

    var references = isShoes ? shoeSizeReference : uniformSizeReference;
    references.forEach(function (reference) {
      var label = isShoes
        ? "PH " + reference.size + " (EU " + reference.eu + " · " + reference.length + ")"
        : reference.label;
      var choice = document.createElement("button");
      choice.type = "button";
      choice.className = "size-choice";
      choice.dataset.size = reference.size;
      choice.dataset.label = label;
      choice.setAttribute("aria-pressed", "false");
      choice.textContent = isShoes ? "PH " + reference.size : reference.label;
      choice.addEventListener("click", function () {
        setSelectedSize(choice.dataset.size, choice.dataset.label);
      });
      choices.appendChild(choice);

      var row = document.createElement("tr"),
        sizeCell = document.createElement("td");
      sizeCell.textContent = isShoes ? "PH " + reference.size : reference.label;
      row.appendChild(sizeCell);
      if (isShoes) {
        var referenceCell = document.createElement("td"),
          lengthCell = document.createElement("td");
        referenceCell.textContent = "EU " + reference.eu;
        lengthCell.textContent = reference.length;
        row.appendChild(referenceCell);
        row.appendChild(lengthCell);
      } else {
        ["chest", "waist", "height"].forEach(function (measurement) {
          var measurementCell = document.createElement("td");
          measurementCell.textContent = reference[measurement];
          row.appendChild(measurementCell);
        });
      }
      body.appendChild(row);
    });
    $("#uniformSizeNote").hidden = isShoes;
  }

  function showGalleryImage() {
    var image = $("#productDetailImage"),
      fallback = $("#productGalleryFallback"),
      current = galleryImages[galleryIndex];
    $("#galleryCaption").textContent = galleryIndex === 0 ? "Front view" : "Back view";
    fallback.hidden = true;
    image.hidden = false;
    image.alt = activeProduct.name + " " + $("#galleryCaption").textContent.toLowerCase();
    image.onerror = function () {
      image.hidden = true;
      fallback.hidden = false;
      $("i", fallback).className =
        "fa-solid fa-" + (activeProduct.type === "Shoes" ? "shoe-prints" : "shirt");
    };
    image.src = current || "";
    if (!current) {
      image.hidden = true;
      fallback.hidden = false;
    }
    $$("[data-gallery-step]", $("#productOptions")).forEach(function (button) {
      button.hidden = galleryImages.length < 2;
    });
  }

  function openProductOptions(card) {
    activeProduct = {
      sku: card.dataset.sku,
      name: card.dataset.name,
      price: Number(card.dataset.price),
      type: card.dataset.type,
      material: card.dataset.material || "",
    };
    selectedSize = null;
    galleryImages = [card.dataset.front, card.dataset.back].filter(Boolean);
    galleryIndex = 0;
    $("#productOptionsName").textContent = activeProduct.name;
    $("#productDetailCategory").textContent =
      $(".card-category", card).textContent;
    $("#productDetailPrice").textContent = formatPrice(activeProduct.price);
    $("#selectedSizeLabel").textContent = "Select one to continue";
    $("#productQuantity").value = "1";
    $("#productOptionsError").textContent = "";
    $("#productMaterials").replaceChildren();
    activeProduct.material.split(",").forEach(function (material) {
      var text = material.trim();
      if (!text) return;
      var chip = document.createElement("span"),
        icon = document.createElement("i");
      chip.className = "material-chip";
      icon.className = "fa-solid fa-leaf";
      icon.setAttribute("aria-hidden", "true");
      chip.appendChild(icon);
      chip.appendChild(document.createTextNode(text));
      $("#productMaterials").appendChild(chip);
    });
    renderSizeReference(activeProduct.type === "Shoes");
    showGalleryImage();
    openOverlay($("#productOptions"));
  }

  window.openCartModal = function (button) {
    var card = button && button.closest(".product-card");
    if (card) openProductOptions(card);
  };

  $("#productOptionsForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var quantity = Number($("#productQuantity").value);
    if (!activeProduct || !selectedSize) {
      $("#productOptionsError").textContent = "Choose a size to continue.";
      return;
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 999) {
      $("#productOptionsError").textContent =
        "Enter a whole-number quantity between 1 and 999.";
      return;
    }

    var existing = cart.find(function (item) {
      return item.sku === activeProduct.sku && item.size === selectedSize.value;
    });
    if (existing && existing.quantity + quantity > 999) {
      $("#productOptionsError").textContent =
        "A maximum of 999 units can be ordered per size.";
      return;
    }
    if (existing) existing.quantity += quantity;
    else {
      cart.push({
        sku: activeProduct.sku,
        name: activeProduct.name,
        price: activeProduct.price,
        quantity: quantity,
        size: selectedSize.value,
        sizeLabel: selectedSize.label,
      });
    }
    saveCart();
    renderCart();
    closeOverlays();
    showToast(activeProduct.name + " added to your cart.");
    activeProduct = null;
  });

  $$("[data-gallery-step]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (galleryImages.length < 2) return;
      galleryIndex =
        (galleryIndex + Number(button.dataset.galleryStep) + galleryImages.length) %
        galleryImages.length;
      showGalleryImage();
    });
  });

  $$("[data-open]").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      setMenu(false);
      var overlay = $("#" + button.dataset.open);
      if (overlay) {
        if (overlay.id === "quote" && cart.length) {
          var message = $('textarea[name="msg"]', overlay);
          if (message && !message.value.trim()) {
            message.value = cart
              .map(function (item) {
                return (
                  item.name +
                  (item.size ? " (" + item.size + ")" : "") +
                  " × " +
                  item.quantity
                );
              })
              .join("\n");
          }
        }
        openOverlay(overlay);
      }
    });
  });

  $$("[data-close]").forEach(function (button) {
    button.addEventListener("click", closeOverlays);
  });
  $$(".ov").forEach(function (overlay) {
    overlay.setAttribute("aria-hidden", "true");
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) closeOverlays();
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeOverlays();
      setMenu(false);
    }
  });

  $("#q").addEventListener("input", function () {
    var query = this.value.trim().toLowerCase(),
      results = $("#sr");
    results.replaceChildren();
    if (!query) return;

    var matches = $$(".product-card").filter(function (card) {
      return (
        card.dataset.name.toLowerCase().includes(query) ||
        $(".card-category", card).textContent.toLowerCase().includes(query)
      );
    });
    if (!matches.length) {
      var empty = document.createElement("p");
      empty.textContent = "No matching products found.";
      results.appendChild(empty);
      return;
    }

    matches.forEach(function (card) {
      var row = document.createElement("div"),
        name = document.createElement("b"),
        price = document.createElement("span"),
        add = document.createElement("button");
      row.className = "search-result";
      name.textContent = card.dataset.name;
      price.textContent = formatPrice(Number(card.dataset.price));
      add.type = "button";
      add.className = "pill";
      add.textContent = "Choose";
      add.addEventListener("click", function () {
        closeOverlays();
        openProductOptions(card);
      });
      row.appendChild(name);
      row.appendChild(price);
      row.appendChild(add);
      results.appendChild(row);
    });
  });

  function showImageFallback(image) {
    var wrap = image.closest(".card-image-wrap"),
      card = image.closest(".product-card");
    if (!wrap || !card) return;
    var isShoes = card.dataset.type === "Shoes";
    image.remove();
    if ($("img", wrap)) return;
    wrap.classList.add("image-unavailable");
    var fallback = document.createElement("span"),
      icon = document.createElement("i");
    fallback.className = "image-fallback";
    fallback.setAttribute("aria-hidden", "true");
    icon.className =
      "fa-solid fa-" + (isShoes ? "shoe-prints" : "shirt");
    fallback.appendChild(icon);
    wrap.appendChild(fallback);
  }

  $$(".product-card .card-image-wrap img").forEach(function (image) {
    image.addEventListener("error", function () {
      showImageFallback(image);
    });
    if (image.complete && image.naturalWidth === 0) showImageFallback(image);
  });
  $$(".product-card .card-desc").forEach(function (note) {
    var icon = $("i", note);
    note.replaceChildren(icon, document.createTextNode(" Stock confirmed at checkout"));
  });

  $("form.box", $("#quote")).addEventListener("submit", function (event) {
    event.preventDefault();
    if (!this.checkValidity()) {
      this.reportValidity();
      return;
    }
    showToast("The quote form is ready, but request delivery is not configured.");
  });

  $$("[data-tab]").forEach(function (tab) {
    tab.addEventListener("click", function () {
      setAccountMode(tab.dataset.tab === "up" ? "register" : "login");
    });
  });

  $("#accountForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    if (!this.checkValidity()) {
      this.reportValidity();
      return;
    }
    var button = $("#acctGo"),
      message = $("#accountMessage"),
      formData = new FormData(this),
      action = accountMode === "register" ? "register" : "login",
      payload = {
        csrf_token: csrfToken,
        email: formData.get("email"),
        password: formData.get("password"),
      };
    if (action === "register") payload.full_name = formData.get("full_name");
    button.disabled = true;
    message.textContent = "";
    try {
      var data = await requestJson("./api/auth.php?action=" + action, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      sessionUser = data.user;
      csrfToken = data.csrf_token || "";
      updateAccountUI();
      this.reset();
      setAccountMode("login");
      if (new URLSearchParams(window.location.search).get("auth") === "required") {
        if (sessionUser.role === "owner" || sessionUser.role === "admin") {
          window.location.href = "./dashboard.php";
          return;
        }
        message.textContent =
          "You are signed in, but dashboard access is restricted to administrator accounts.";
      } else if (pendingCheckout) {
        pendingCheckout = false;
        closeOverlays();
        openCheckout();
      } else {
        closeOverlays();
        showToast("You are signed in.");
      }
    } catch (error) {
      message.textContent = error.message;
    } finally {
      button.disabled = false;
    }
  });

  $("#logoutBtn").addEventListener("click", async function () {
    var button = this;
    button.disabled = true;
    try {
      await requestJson("./api/auth.php?action=logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ csrf_token: csrfToken }),
      });
      sessionUser = null;
      csrfToken = "";
      pendingCheckout = false;
      updateAccountUI();
      setAccountMode("login");
      showToast("You are signed out.");
    } catch (error) {
      $("#accountMessage").textContent = error.message;
    } finally {
      button.disabled = false;
    }
  });

  $("#checkoutForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    if (!sessionUser) {
      beginCheckout();
      return;
    }
    if (!this.checkValidity()) {
      this.reportValidity();
      return;
    }
    var button = $('button[type="submit"]', this),
      formData = new FormData(this);
    button.disabled = true;
    $("#checkoutError").textContent = "";
    try {
      var data = await requestJson("./api/orders.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          csrf_token: csrfToken,
          phone: formData.get("phone"),
          address: formData.get("address"),
          city: formData.get("city"),
          postal_code: formData.get("postal_code"),
          notes: formData.get("notes"),
          currency: currency,
          items: cart.map(function (item) {
            return {
              sku: item.sku,
              size: item.size,
              quantity: item.quantity,
            };
          }),
        }),
      });
      cart = [];
      saveCart();
      renderCart();
      closeOverlays();
      showToast(
        "Order " +
          data.order_no +
          " submitted. Delivery cost will be confirmed by CSSP.",
      );
    } catch (error) {
      if (error.status === 401) {
        sessionUser = null;
        csrfToken = "";
        updateAccountUI();
        pendingCheckout = true;
        setAccountMode("login");
        $("#accountMessage").textContent =
          "Your session expired. Log in again to continue checkout.";
        openOverlay($("#account"));
      } else {
        $("#checkoutError").textContent = error.message;
      }
    } finally {
      button.disabled = false;
    }
  });

  var navProgress = $("#prog"),
    topButton = $("#toTop");
  function updateScrollState() {
    var maxScroll = root.scrollHeight - window.innerHeight;
    nav.classList.toggle("scrolled", window.scrollY > 10);
    topButton.classList.toggle("show", window.scrollY > 500);
    navProgress.style.width =
      (maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0) + "%";
    if (window.scrollY > 10) closeDropdowns();
  }
  window.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("resize", updateScrollState);
  topButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  var fm = $("#fm"),
    contactInfo = $("#finfo"),
    contactDetails = {
      call: ["Call us", "Mon to Sat, 8 AM to 6 PM", "+63 900 000 0000", "tel:+639000000000"],
      msg: ["Email us", "We reply within one business day.", "hello@example.com", "mailto:hello@example.com"],
    };
  $("#fmMain").addEventListener("click", function () {
    var open = !fm.classList.contains("open");
    fm.classList.toggle("open", open);
    this.setAttribute("aria-expanded", String(open));
  });
  $$(".fm-list [data-info]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (button.dataset.info === "share") {
        var url = window.location.href.split("#")[0];
        if (navigator.share) {
          navigator.share({ title: document.title, url: url }).catch(function (error) {
            if (error.name !== "AbortError") showToast("Unable to share this page.");
          });
        } else if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(url).then(
            function () { showToast("Page link copied."); },
            function () { showToast("Unable to copy the page link."); },
          );
        } else {
          window.prompt("Copy this page link:", url);
        }
        return;
      }
      var info = contactDetails[button.dataset.info];
      if (!info) return;
      $("b", contactInfo).textContent = info[0];
      $("span", contactInfo).textContent = info[1];
      var link = $("a", contactInfo);
      link.textContent = info[2];
      link.href = info[3];
      contactInfo.classList.add("show");
    });
  });
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".dd")) closeDropdowns();
    if (!event.target.closest("#menu,#burger")) setMenu(false);
    if (!event.target.closest("#fm,#finfo")) {
      fm.classList.remove("open");
      $("#fmMain").setAttribute("aria-expanded", "false");
      contactInfo.classList.remove("show");
    }
  });

  renderCart();
  updateScrollState();
  refreshSession().then(function () {
    if (new URLSearchParams(window.location.search).get("checkout") === "1") {
      beginCheckout();
    }
  });
})();
