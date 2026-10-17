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
    const key = anchor.dataset.destination;
    const url = cfg[key];
    if (validUrl(url)) anchor.href = url;
    else anchor.addEventListener('click', (event) => {
      event.preventDefault();
      showToast('Este link ainda não foi configurado. Edite o arquivo config.js.');
    });
  });
  if (validUrl(cfg.instagram)) {
    document.getElementById('instagram-link').href = cfg.instagram;
    document.getElementById('instagram-container').hidden = false;
  }
  document.getElementById('year').textContent = new Date().getFullYear();
})();
