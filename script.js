(() => {
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
  const menu = document.querySelector('#mobile-menu');
  const toggle = document.querySelector('.menu-toggle');
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    toggle.classList.toggle('is-open', open);
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menu.inert = !open;
    document.body.classList.toggle('menu-open', open);
    document.querySelector('main').inert = open;
    document.querySelector('.site-footer').inert = open;
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (toggle.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') { setMenu(false); toggle.focus(); }
    if (event.key === 'Tab') {
      const links = [...menu.querySelectorAll('a')];
      const sequence = [toggle, ...links];
      const current = sequence.indexOf(document.activeElement);
      if (event.shiftKey && current <= 0) { event.preventDefault(); links.at(-1).focus(); }
      else if (!event.shiftKey && current === sequence.length - 1) { event.preventDefault(); toggle.focus(); }
    }
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) setMenu(false); });
  const dialog = document.querySelector('.image-dialog');
  const photo = dialog.querySelector('.dialog-image');
  const caption = dialog.querySelector('#dialog-caption');
  let opener;
  document.querySelectorAll('[data-image]').forEach(button => {
    button.addEventListener('click', () => {
      opener = button;
      photo.src = button.dataset.image;
      photo.alt = button.dataset.caption;
      caption.textContent = button.dataset.caption;
      dialog.showModal();
      document.body.classList.add('modal-open');
      dialog.querySelector('.dialog-close').focus();
    });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r=dialog.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); opener?.focus({preventScroll:true}); });
})();
