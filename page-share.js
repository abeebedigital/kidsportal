(function () {
  function ensureStyles() {
    if (document.getElementById('page-share-styles')) return;
    const style = document.createElement('style');
    style.id = 'page-share-styles';
    style.textContent = [
      '.page-share-wrap{position:fixed;right:16px;bottom:16px;z-index:1300;display:flex;align-items:center;gap:8px}',
      '.page-share-btn{border:none;min-height:48px;padding:12px 16px;border-radius:999px;background:linear-gradient(135deg,#ff9f1c 0%,#ff7b54 100%);color:#fff;font:900 .9rem "Nunito",sans-serif;box-shadow:0 14px 26px rgba(255,123,84,.24);cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:transform .16s ease,box-shadow .16s ease}',
      '.page-share-btn:hover{transform:translateY(-2px);box-shadow:0 18px 30px rgba(255,123,84,.28)}',
      '.page-share-toast{background:rgba(39,50,74,.92);color:#fff;padding:10px 12px;border-radius:14px;font:800 .78rem "Nunito",sans-serif;box-shadow:0 10px 20px rgba(27,36,54,.24);opacity:0;pointer-events:none;transform:translateY(8px);transition:opacity .18s ease,transform .18s ease;white-space:nowrap}',
      '.page-share-toast.is-visible{opacity:1;transform:translateY(0)}',
      '.page-share-label{display:inline-flex;align-items:center}',
      '@media (max-width:640px){.page-share-wrap{left:12px;right:auto;bottom:62px}.page-share-btn{min-height:42px;min-width:42px;padding:10px;border-radius:14px;gap:0;font-size:.86rem;box-shadow:0 10px 18px rgba(255,123,84,.24)}.page-share-label{display:none}.page-share-toast{position:absolute;left:52px;bottom:0}}'
    ].join('');
    document.head.appendChild(style);
  }

  function getShareUrl() {
    if (/^https?:\/\/fivetofifteen\.com/i.test(window.location.href)) {
      return window.location.href;
    }
    const path = window.location.pathname.split('/').filter(Boolean).pop() || '';
    return 'https://fivetofifteen.com/' + path;
  }

  function getShareTitle() {
    const title = document.title || 'FiveToFifteen';
    return title.replace(/\s+\|\s+FiveToFifteen.*$/i, '').trim();
  }

  function getShareText() {
    const meta = document.querySelector('meta[name="description"]');
    const metaText = meta && meta.getAttribute('content');
    if (metaText) return metaText.trim();
    return 'Read this page on FiveToFifteen.';
  }

  function showToast(toast, message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toast._hideTimer);
    toast._hideTimer = window.setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 1800);
  }

  async function sharePage(toast) {
    const payload = {
      title: getShareTitle(),
      text: getShareText(),
      url: getShareUrl()
    };

    if (navigator.share) {
      try {
        await navigator.share(payload);
        return;
      } catch (error) {
        if (error && error.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(payload.url);
      showToast(toast, 'Link copied');
    } catch (error) {
      showToast(toast, 'Could not share right now');
    }
  }

  function initPageShare() {
    if (document.getElementById('pageShareWrap')) return;
    if (document.body && document.body.dataset.noPageShare === 'true') return;
    ensureStyles();

    const wrap = document.createElement('div');
    wrap.className = 'page-share-wrap';
    wrap.id = 'pageShareWrap';

    const toast = document.createElement('div');
    toast.className = 'page-share-toast';
    toast.setAttribute('aria-live', 'polite');

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'page-share-btn';
    button.innerHTML = '<span aria-hidden="true">📤</span><span class="page-share-label">Share</span>';
    button.addEventListener('click', function () {
      sharePage(toast);
    });

    wrap.appendChild(toast);
    wrap.appendChild(button);
    document.body.appendChild(wrap);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageShare, { once: true });
  } else {
    initPageShare();
  }
})();
