// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
(function () {
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', function () {
    var isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Scroll reveal
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || items.length === 0) {
    items.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px 60px 0px' });
  items.forEach(function (el) { observer.observe(el); });

  // Safety net: anything still unrevealed once the page has settled
  // (e.g. a fast programmatic scroll skipped the intersection crossing)
  // gets revealed anyway so content is never stuck invisible.
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.in-view)').forEach(function (el) {
        el.classList.add('in-view');
      });
    }, 1200);
  });
})();

// Palette picker — design tool for previewing color-theory schemes live.
// Delete this whole block (and the <div id="palette-picker"> in index.html)
// once you've settled on a scheme.
(function () {
  var picker = document.getElementById('palette-picker');
  var list = document.getElementById('palette-list');
  var closeBtn = document.getElementById('palette-close');
  if (!picker || !list) return;

  var root = document.documentElement;

  list.querySelectorAll('.palette-option').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var accent = btn.getAttribute('data-accent');
      var accent2 = btn.getAttribute('data-accent2');
      root.style.setProperty('--accent', accent);
      root.style.setProperty('--accent-2', accent2);
      list.querySelectorAll('.palette-option').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      picker.style.display = 'none';
    });
  }
})();

// Contact form — posts to Formspree (see README to set your form ID).
// Falls back to a clear error message + mailto link if the endpoint isn't configured yet.
(function () {
  var form = document.getElementById('quote-form');
  var status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
      status.textContent = 'Form isn\'t connected yet — please email contact.giovanniparra@gmail.com directly for now.';
      status.className = 'form-status show err';
      return;
    }

    var data = new FormData(form);
    status.textContent = 'Sending…';
    status.className = 'form-status show';

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(function (response) {
      if (response.ok) {
        status.textContent = 'Thanks — I\'ll reply within 1 business day.';
        status.className = 'form-status show ok';
        form.reset();
      } else {
        status.textContent = 'Something went wrong. Please email contact.giovanniparra@gmail.com directly.';
        status.className = 'form-status show err';
      }
    }).catch(function () {
      status.textContent = 'Something went wrong. Please email contact.giovanniparra@gmail.com directly.';
      status.className = 'form-status show err';
    });
  });
})();
