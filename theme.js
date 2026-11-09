// Loaded in <head> without defer so the saved theme is applied before first paint.
(function () {
  var KEY = "theme";
  var root = document.documentElement;

  function read() {
    try { return localStorage.getItem(KEY) || "system"; } catch (e) { return "system"; }
  }

  function apply(choice) {
    if (choice === "light" || choice === "dark") root.setAttribute("data-theme", choice);
    else root.removeAttribute("data-theme");

    var buttons = document.querySelectorAll("[data-theme-choice]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-checked", buttons[i].getAttribute("data-theme-choice") === choice ? "true" : "false");
    }
  }

  apply(read());

  document.addEventListener("DOMContentLoaded", function () {
    apply(read());
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-theme-choice]");
      if (!btn) return;
      var choice = btn.getAttribute("data-theme-choice");
      try {
        if (choice === "system") localStorage.removeItem(KEY);
        else localStorage.setItem(KEY, choice);
      } catch (err) {}
      apply(choice);
    });
  });
})();
