/* Page guard, scroll progress & navbar scroll pill */
(function () {
  "use strict";

  function ensureEl(id, tag, attrs) {
    var existing = document.getElementById(id);
    if (existing) return existing;
    var el = document.createElement(tag);
    el.id = id;
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        el.setAttribute(k, attrs[k]);
      });
    }
    el.style.display = "none";
    document.body.appendChild(el);
    return el;
  }

  if (!document.querySelector(".fill")) {
    var fillSec = document.createElement("div");
    fillSec.className = "fill";
    fillSec.style.display = "none";
    var fillIn = document.createElement("div");
    fillIn.className = "fill-in";
    var fillText = document.createElement("p");
    fillText.id = "fillText";
    fillIn.appendChild(fillText);
    fillSec.appendChild(fillIn);
    document.body.appendChild(fillSec);
  }

  ensureEl("mrq", "div");
  ensureEl("sizes", "div");
  ensureEl("tagIn", "input", { type: "hidden" });

  var navEl = document.getElementById("nav");
  var progEl = document.getElementById("prog");

  function syncOnScroll() {
    if (navEl) {
      navEl.classList.toggle("scrolled", window.scrollY > 10);
    }
    if (progEl) {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - window.innerHeight;
      progEl.style.width = (scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0) + "%";
    }
  }

  syncOnScroll();
  window.addEventListener("scroll", syncOnScroll, { passive: true });
})();

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* 1. Showcase slides & stacked words */
  var showcaseSlides = document.querySelectorAll(".ab-showcase-slides img.slot");
  var showcaseWords = document.querySelectorAll(".ab-stack-words span");

  if (showcaseSlides.length > 0 && showcaseWords.length === showcaseSlides.length) {
    var slideIdx = 0;

    function setShowcaseSlide(nextIdx) {
      showcaseSlides[slideIdx].classList.remove("active");
      showcaseWords[slideIdx].classList.remove("active");
      slideIdx = nextIdx;
      showcaseSlides[slideIdx].classList.add("active");
      showcaseWords[slideIdx].classList.add("active");
    }

    var showcaseTimer = setInterval(function () {
      setShowcaseSlide((slideIdx + 1) % showcaseSlides.length);
    }, 4200);

    showcaseWords.forEach(function (word, idx) {
      word.addEventListener("mouseenter", function () {
        setShowcaseSlide(idx);
      });
      word.addEventListener("click", function () {
        clearInterval(showcaseTimer);
        setShowcaseSlide(idx);
      });
    });
  }

  /* 2. Makers auto-slideshow (no buttons/dots) */
  var carousel = document.querySelector("[data-makers-slideshow]");
  if (carousel) {
    var slides = Array.from(carousel.querySelectorAll(".ab-makers-slide"));
    if (slides.length > 1) {
      var currentIndex = slides.findIndex(function (slide) {
        return slide.classList.contains("is-active");
      });
      if (currentIndex < 0) currentIndex = 0;

      setInterval(function () {
        currentIndex = (currentIndex + 1) % slides.length;
        slides.forEach(function (slide, i) {
          slide.classList.toggle("is-active", i === currentIndex);
        });
      }, 3800);
    }
  }

  /* 3. Locations scroll animation */
  var locSection = document.querySelector("[data-locations-reveal]");
  if (locSection) {
    if (!("IntersectionObserver" in window)) {
      locSection.classList.add("is-visible");
    } else {
      var observer = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.18 }
      );

      observer.observe(locSection);
    }
  }
});