(() => {
  const cfg = window.LORD_BEAUTY || {};
  let timeout;
  const showToast = (message) => {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(timeout);
    timeout = setTimeout(() => toast.classList.remove('show'), 4500);
  };
  const validUrl = (url) => { try { return ['https:', 'http:'].includes(new URL(url).protocol); } catch { return false; } };
  document.querySelectorAll('[data-destination]').forEach((anchor) => {
    const destination = anchor.dataset.destination;
    const url = cfg[destination];
    if (validUrl(url)) anchor.href = url;
    else anchor.addEventListener('click', (event) => { event.preventDefault(); showToast('Este link ainda não foi configurado. Edite o arquivo config.js.'); });
    anchor.addEventListener('click', () => {
      if (!validUrl(url) || typeof window.fbq !== 'function') return;
      window.fbq('track', 'Lead', { content_name: `Lord Beauty - ${destination}` });
    });
  });
  if (validUrl(cfg.instagram)) {
    document.getElementById('instagram-link').href = cfg.instagram;
    document.getElementById('instagram-container').hidden = false;
  }
  document.getElementById('year').textContent = new Date().getFullYear();
})();
