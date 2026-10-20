/* EvoByte website behaviour. See context.md §6–§7. */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  function store(kind, key, value) {
    try {
      var s = kind === "session" ? window.sessionStorage : window.localStorage;
      if (value === undefined) return s.getItem(key);
      s.setItem(key, value);
    } catch (e) {
      return null;
    }
  }

  /* ---------- Nav: border once scrolled, active section ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 4);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = "#" + entry.target.id;
          navLinks.forEach(function (link) {
            if (link.getAttribute("href") === id) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navLinks.forEach(function (link) {
      var target = document.querySelector(link.getAttribute("href"));
      if (target) spy.observe(target);
    });
  }

  /* ---------- Mobile sheet ---------- */
  var sheet = document.getElementById("sheet");
  var burger = document.getElementById("burgerBtn");
  var sheetClose = document.getElementById("sheetClose");
  sheet.inert = true;

  function openSheet(e) {
    // Keyboard-initiated actions never animate (§7.1)
    sheet.classList.toggle("is-instant", !!e && e.detail === 0);
    sheet.inert = false;
    sheet.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    sheetClose.focus();
  }
  function closeSheet(e) {
    sheet.classList.toggle("is-instant", !e || e.detail === 0);
    sheet.classList.remove("is-open");
    sheet.inert = true;
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  burger.addEventListener("click", openSheet);
  sheetClose.addEventListener("click", function (e) {
    closeSheet(e);
    burger.focus();
  });
  sheet.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeSheet);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sheet.classList.contains("is-open")) {
      closeSheet();
      burger.focus();
    }
  });
  window.matchMedia("(min-width: 861px)").addEventListener("change", function (mq) {
    if (mq.matches && sheet.classList.contains("is-open")) closeSheet();
  });

  /* ---------- Hero entrance (§7.4.1), once per session ---------- */
  var hero = document.querySelector(".hero");
  var PLAYED_KEY = "evobyte-hero-played";
  var instant = reduceMotion.matches || store("session", PLAYED_KEY) === "1";

  function settle(el) {
    el.classList.add("is-settled");
  }

  if (instant) {
    hero.classList.add("is-instant", "is-in");
    hero.querySelectorAll("[data-reveal]").forEach(settle);
  } else {
    store("session", PLAYED_KEY, "1");
    hero.querySelectorAll("[data-reveal]").forEach(function (el) {
      el.addEventListener("transitionend", function done(e) {
        if (e.target !== el || e.propertyName !== "opacity") return;
        el.removeEventListener("transitionend", done);
        settle(el); // drops the blur filter from large text
      });
    });
    // Two frames so the start state paints before the transition begins
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        hero.classList.add("is-in");
      });
    });
    // Safety net in case a transitionend never fires
    setTimeout(function () {
      hero.querySelectorAll("[data-reveal]").forEach(settle);
    }, 1600);
  }

  /* ---------- Ambient layer: pattern drift (§7.4.3) ---------- */
  var heroVisible = true;
  function updateAmbient() {
    var on = heroVisible && !document.hidden && !reduceMotion.matches;
    hero.classList.toggle("is-ambient", on);
  }
  setTimeout(updateAmbient, instant ? 0 : 1200);

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting;
      if (hero.classList.contains("is-in")) updateAmbient();
      if (heroVisible) startParallax();
    }).observe(hero);
  }
  document.addEventListener("visibilitychange", updateAmbient);

  /* ---------- Pointer parallax on the mark only, ≤ 6px (§7.4.4) ---------- */
  var markEl = document.getElementById("heroMark");
  var target = { x: 0, y: 0 };
  var current = { x: 0, y: 0 };
  var rafId = 0;

  function tick() {
    current.x += (target.x - current.x) * 0.1;
    current.y += (target.y - current.y) * 0.1;
    markEl.style.transform = "translate3d(" + current.x.toFixed(2) + "px," + current.y.toFixed(2) + "px,0)";
    var settled = Math.abs(target.x - current.x) < 0.05 && Math.abs(target.y - current.y) < 0.05;
    rafId = settled || !heroVisible ? 0 : requestAnimationFrame(tick);
  }
  function startParallax() {
    if (!rafId && finePointer.matches && !reduceMotion.matches) rafId = requestAnimationFrame(tick);
  }

  hero.addEventListener("pointermove", function (e) {
    if (!finePointer.matches || reduceMotion.matches) return;
    var r = hero.getBoundingClientRect();
    target.x = ((e.clientX - r.left) / r.width - 0.5) * 12;
    target.y = ((e.clientY - r.top) / r.height - 0.5) * 12;
    startParallax();
  });
  hero.addEventListener("pointerleave", function () {
    target.x = 0;
    target.y = 0;
    startParallax();
  });

  /* ---------- Product links prefill the form ---------- */
  var topic = document.getElementById("f-topic");
  document.querySelectorAll("[data-product]").forEach(function (link) {
    link.addEventListener("click", function () {
      topic.value = link.getAttribute("data-product");
    });
  });

  /* ---------- Contact form ---------- */
  var form = document.getElementById("contactForm");
  var submitBtn = document.getElementById("submitBtn");
  var statusEl = document.getElementById("formStatus");
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var rules = {
    "f-name": function (v) {
      return v ? "" : "Add your name so we know who to reply to.";
    },
    "f-email": function (v) {
      if (!v) return "Add an email address so we can write back.";
      return EMAIL_RE.test(v) ? "" : "Check the email address. It should look like name@school.edu.bn.";
    },
    "f-msg": function (v) {
      if (!v) return "Tell us a little about the work that takes too long.";
      return v.length < 20 ? "Add a bit more detail, at least a sentence or two." : "";
    }
  };

  function validate(id) {
    var input = document.getElementById(id);
    var error = document.getElementById(id + "-error");
    var message = rules[id](input.value.trim());
    input.setAttribute("aria-invalid", message ? "true" : "false");
    error.textContent = message;
    error.hidden = !message;
    return !message;
  }

  Object.keys(rules).forEach(function (id) {
    var input = document.getElementById(id);
    input.addEventListener("input", function () {
      if (input.getAttribute("aria-invalid") === "true") validate(id);
    });
    input.addEventListener("blur", function () {
      if (input.value.trim()) validate(id);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (submitBtn.classList.contains("is-loading")) return;

    var firstInvalid = null;
    Object.keys(rules).forEach(function (id) {
      if (!validate(id) && !firstInvalid) firstInvalid = document.getElementById(id);
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    var data = new FormData(form);
    var subject = "Project enquiry: " + data.get("topic");
    var body = [
      "Name: " + data.get("name"),
      "Email: " + data.get("email"),
      "Organisation: " + (data.get("organisation") || "-"),
      "About: " + data.get("topic"),
      "",
      data.get("message")
    ].join("\n");

    submitBtn.classList.add("is-loading");
    submitBtn.setAttribute("aria-disabled", "true");
    submitBtn.setAttribute("aria-busy", "true");

    setTimeout(function () {
      window.location.href =
        "mailto:hello@evobyte.bn?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

      submitBtn.classList.remove("is-loading");
      submitBtn.removeAttribute("aria-disabled");
      submitBtn.removeAttribute("aria-busy");

      statusEl.classList.remove("is-error");
      statusEl.innerHTML =
        "<strong>Your email app should now be open with the details filled in.</strong>" +
        'Send it from there. If nothing opened, write to <a class="link" href="mailto:hello@evobyte.bn">hello@evobyte.bn</a>.';
      statusEl.hidden = false;
    }, 600);
  });
})();
