(function () {
  var STORAGE_KEY = 'gp-theme';
  var root = document.documentElement;

  function getPreferred() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
  }

  // Apply immediately (before paint) to avoid a flash of the wrong theme.
  apply(getPreferred());

  window.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
    });

    // Keep in sync with system changes if the user hasn't chosen explicitly.
    var media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', function (e) {
      var saved = null;
      try { saved = localStorage.getItem(STORAGE_KEY); } catch (err) {}
      if (saved === 'light' || saved === 'dark') return;
      apply(e.matches ? 'dark' : 'light');
    });
  });
})();
