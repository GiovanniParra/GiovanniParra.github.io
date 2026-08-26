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

// ---------------------------------------------------------------------------
// Language switcher (English / Spanish)
// ---------------------------------------------------------------------------
var PARRA_I18N = (function () {
  var STORAGE_KEY = 'parra-lang';

  var translations = {
    es: {
      'nav.why': 'Nosotros',
      'nav.process': 'Proceso',
      'nav.pricing': 'Precios',
      'nav.contact': 'Contacto',
      'nav.cta': 'Cotización Gratis',

      'hero.eyebrow': 'Estudio de diseño web — Berkeley, CA',
      'hero.headline': 'Buen negocio. Sitio web olvidable. Vamos a <em>arreglarlo</em>.',
      'hero.scrollCue': 'Mira cómo funciona',
      'hero.blurb': 'Parra Marketing Solutions crea <strong>sitios web rápidos y profesionales</strong> para negocios locales — restaurantes, contratistas, salones, tiendas — que aún no tienen uno, o que están atascados con uno que no funciona. Un precio fijo. Sin exceso de agencia.',
      'hero.meta.turnaround.label': 'Tiempo de entrega',
      'hero.meta.turnaround.value': 'Listo en una semana aprox.',
      'hero.meta.basedin.label': 'Ubicados en',
      'hero.meta.reply.label': 'Tiempo de respuesta',
      'hero.meta.reply.value': 'En 1 día hábil',

      'marquee.1': 'Sitios web que funcionan',
      'marquee.2': 'Un precio fijo',
      'marquee.3': 'Listos en una semana',
      'marquee.4': 'Hechos para negocios locales',
      'marquee.5': 'Sin exceso de agencia',

      'studio.eyebrow': 'Nota del estudio',
      'studio.quote': 'Demasiados negocios locales buenos no tienen sitio web, o tienen uno que no les hace justicia — porque un estudio "de verdad" pide cinco cifras y tres meses. Por eso creé la versión que se salta todo eso: una sola persona, un precio fijo, un sitio listo en una semana. Quiero que cualquier negocio local pueda <em>costear</em> verse tan bien en línea como se ve en persona.',
      'studio.role': 'Fundador, Parra Marketing Solutions',

      'why.eyebrow': 'Por qué Parra',
      'why.title': 'Una sola persona, haciendo el trabajo, a un precio justo.',
      'why.sub': 'Sin gerentes de cuenta, sin plantillas subcontratadas, sin facturas sorpresa — solo un sitio hecho a la medida de lo que tu negocio realmente necesita.',
      'why.card1.title': 'Hecho por una sola persona',
      'why.card1.body': 'Trabajas directamente conmigo desde el primer mensaje hasta el lanzamiento — no con un equipo rotativo, ni un call center.',
      'why.card2.title': 'En línea rápido',
      'why.card2.body': 'La mayoría de los sitios pasan de inicio a estar en línea en una semana aprox., no en los meses que te cotizaría una agencia grande.',
      'why.card3.title': 'Un precio fijo',
      'why.card3.body': 'Sabes el costo desde el inicio. Sin mensualidades ocultas, a menos que tú quieras ayuda continua más adelante.',

      'process.eyebrow': 'Cómo funciona',
      'process.title': 'De un mensaje rápido a un sitio en línea.',
      'process.sub': 'Cuatro pasos, de principio a fin. Sin caja negra, sin dudas sobre qué sigue.',
      'process.step1.title': 'Consulta gratuita',
      'process.step1.body': 'Una llamada o mensaje rápido sobre tu negocio, qué anda mal con tu sitio actual (o que no tienes uno), y qué necesitas que haga.',
      'process.step2.title': 'Diseño y construcción',
      'process.step2.body': 'Construyo tu sitio alrededor de tu negocio — tus fotos, tus servicios, los colores de tu marca si los tienes. Nada de plantillas genéricas puestas tal cual.',
      'process.step3.title': 'Revisamos juntos',
      'process.step3.body': 'Recibes un enlace de vista previa antes de publicar nada, más una ronda de revisiones para dejarlo bien.',
      'process.step4.title': 'Lanzamiento',
      'process.step4.body': 'Cuando estés contento, se publica en tu dominio y ya puedes enviarles clientes.',

      'pricing.eyebrow': 'Precios',
      'pricing.title': 'Una tarifa fija. Elige el alcance que te convenga.',
      'pricing.sub': 'Cada nivel es un pago único por la construcción — sin cargos recurrentes para mí, a menos que quieras ayuda continua después del lanzamiento.',
      'pricing.starter.name': 'Básico',
      'pricing.starter.li1': 'Sitio de una sola página, o hasta 3 secciones',
      'pricing.starter.li2': 'Tú proporcionas el texto y las fotos',
      'pricing.starter.li3': 'Un estilo de diseño, ligeramente personalizado',
      'pricing.starter.li4': '1 ronda de revisiones',
      'pricing.starter.li5': 'Publicado en tu propia cuenta',
      'pricing.standard.name': 'Estándar',
      'pricing.standard.li1': 'Sitio de varias páginas, hasta ~5 (Inicio, Nosotros, Servicios/Menú, Galería, Contacto)',
      'pricing.standard.li2': 'Te ayudo a pulir el texto a partir de lo que me envíes',
      'pricing.standard.li3': 'Tratamiento de color y fotos personalizado',
      'pricing.standard.li4': '1 ronda de revisiones',
      'pricing.standard.li5': 'Ayuda para conectar tu dominio',
      'pricing.standard.li6': 'Configuración básica de SEO (títulos, descripciones, texto alternativo)',
      'pricing.premium.name': 'Premium',
      'pricing.premium.li1': 'Todo lo del plan Estándar',
      'pricing.premium.li2': 'Hasta ~8 páginas, o una estructura más compleja',
      'pricing.premium.li3': 'Reservas/citas o pagos en línea',
      'pricing.premium.li4': 'Optimización de tu Perfil de Negocio de Google',
      'pricing.premium.li5': '2 rondas de revisiones',
      'pricing.premium.li6': 'Redacción desde cero, no solo pulido',
      'pricing.note': 'El hosting se paga aparte (normalmente ~$17–29/mes dependiendo de si necesitas reservas o pagos en línea), y esa cuenta es tuya — nada queda bloqueado bajo mi control. Los dominios personalizados cuestan cerca de $14–20/año.',

      'contact.eyebrow': 'Ponte en contacto',
      'contact.title': 'Cuéntame sobre tu negocio.',
      'contact.sub': 'Envía algunos datos y te responderé en menos de un día hábil con los siguientes pasos — sin compromiso, sin presión.',
      'contact.email.label': 'Correo',
      'contact.basedin.label': 'Ubicados en',
      'contact.basedin.value': 'Berkeley, CA — trabajando con negocios locales de todas partes',
      'contact.reply.label': 'Tiempo de respuesta',
      'contact.reply.value': 'En 1 día hábil',

      'form.name.label': 'Tu nombre',
      'form.business.label': 'Nombre del negocio',
      'form.email.label': 'Correo',
      'form.phone.label': 'Teléfono (opcional)',
      'form.currentSite.label': 'Sitio web actual (si tienes uno)',
      'form.currentSite.placeholder': 'ej. facebook.com/tunegocio, o ninguno',
      'form.details.label': '¿Qué necesita tu negocio?',
      'form.details.placeholder': 'A qué te dedicas, qué anda mal con tu sitio actual (o que no tienes uno), y qué páginas o funciones ya sabes que quieres.',
      'form.submit': 'Solicitar Cotización Gratis',
      'form.note': '¿Prefieres el correo? Escríbeme directamente a <a href="mailto:contact.giovanniparra@gmail.com" style="color:var(--text-muted); text-decoration:underline;">contact.giovanniparra@gmail.com</a>.',
      'form.status.notConnected': 'El formulario aún no está conectado — por ahora escribe directamente a contact.giovanniparra@gmail.com.',
      'form.status.sending': 'Enviando…',
      'form.status.ok': 'Gracias — te responderé en 1 día hábil.',
      'form.status.err': 'Algo salió mal. Por favor escribe directamente a contact.giovanniparra@gmail.com.'
    }
  };

  // English is the markup's default content — captured once at load so
  // switching back to English restores it exactly, including the <em>/<strong> tags.
  var englishCache = {};

  function captureEnglish() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      englishCache[el.getAttribute('data-i18n')] = el.textContent;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      englishCache[el.getAttribute('data-i18n-html')] = el.innerHTML;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      englishCache['placeholder:' + el.getAttribute('data-i18n-placeholder')] = el.getAttribute('placeholder');
    });
  }

  function t(key, lang) {
    if (lang === 'en') return englishCache[key];
    return (translations[lang] && translations[lang][key] !== undefined)
      ? translations[lang][key]
      : englishCache[key];
  }

  function apply(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      el.textContent = t(key, lang);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      el.innerHTML = t(key, lang);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      var val = lang === 'en' ? englishCache['placeholder:' + key] : (translations[lang][key] || englishCache['placeholder:' + key]);
      el.setAttribute('placeholder', val);
    });
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function getPreferred() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    return (saved === 'es' || saved === 'en') ? saved : 'en';
  }

  function init() {
    captureEnglish();
    var preferred = getPreferred();
    if (preferred !== 'en') apply(preferred);

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        apply(btn.getAttribute('data-lang'));
      });
    });
  }

  return { init: init, t: t, getLang: function () { return getPreferred(); } };
})();

document.addEventListener('DOMContentLoaded', PARRA_I18N.init);

// Contact form — posts to Formspree (see README to set your form ID).
// Falls back to a clear error message + mailto link if the endpoint isn't configured yet.
(function () {
  var form = document.getElementById('quote-form');
  var status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var lang = PARRA_I18N.getLang();

    if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
      status.textContent = PARRA_I18N.t('form.status.notConnected', lang);
      status.className = 'form-status show err';
      return;
    }

    var data = new FormData(form);
    status.textContent = PARRA_I18N.t('form.status.sending', lang);
    status.className = 'form-status show';

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    }).then(function (response) {
      if (response.ok) {
        status.textContent = PARRA_I18N.t('form.status.ok', lang);
        status.className = 'form-status show ok';
        form.reset();
      } else {
        status.textContent = PARRA_I18N.t('form.status.err', lang);
        status.className = 'form-status show err';
      }
    }).catch(function () {
      status.textContent = PARRA_I18N.t('form.status.err', lang);
      status.className = 'form-status show err';
    });
  });
})();
