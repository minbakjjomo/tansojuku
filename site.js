document.querySelectorAll('[data-slide]').forEach(button => {
  button.addEventListener('click', () => {
    const track = document.getElementById(button.getAttribute('aria-controls'));
    const card = track.querySelector('.review-slide');
    track.scrollBy({left: Number(button.dataset.slide) * (card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap)), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  });
});
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => link.closest('details').removeAttribute('open'));
});
document.addEventListener('click', event => {
  const button = event.target.closest?.('button[data-video]');
  if (!button || !/^[A-Za-z0-9_-]{11}$/.test(button.dataset.video)) return;
  const frame = document.createElement('iframe');
  frame.className = button.className;
  frame.src = 'https://www.youtube-nocookie.com/embed/' + button.dataset.video + '?autoplay=1';
  frame.title = button.getAttribute('aria-label');
  frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  frame.allowFullscreen = true;
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  frame.tabIndex = 0;
  button.replaceWith(frame);
  frame.focus();
});
