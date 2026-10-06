document.querySelectorAll('[data-slide]').forEach(button => {
  button.addEventListener('click', () => {
    const track = document.getElementById(button.getAttribute('aria-controls'));
    track.scrollBy({
      left: Number(button.dataset.slide) * (track.clientWidth + 24),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  });
});

(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window)) return;

  const observer = new window.IntersectionObserver(entries => {
    entries.forEach(({target, isIntersecting}) => {
      if (!isIntersecting) {
        target.classList.remove('motion-enter', 'motion-fade');
        return;
      }
      const effect = reducedMotion.matches ? 'motion-fade' : 'motion-enter';
      target.classList.add(effect);
      target.addEventListener('animationend', () => target.classList.remove(effect), {once: true});
    });
  }, {threshold: 0.08});

  document.querySelectorAll('.hero-copy, .page-intro > *, .section-heading, .difference-grid > article, .teacher-card, .course-card, .university-list > li, .review-slide, .review-gallery > figure, .video-grid > article, .space-grid > figure, .admission-roadmap > li, .channel-grid > article, .resource-grid > article, .exam-map > article, .application-checks > article, .visual-route-step, .detail-row, .location-grid > *, .consult-cta > div').forEach(target => {
    const index = Array.from(target.parentElement.children).indexOf(target);
    target.style.setProperty('--motion-delay', `${Math.min(index, 4) * 75}ms`);
    observer.observe(target);
  });

  reducedMotion.addEventListener('change', event => {
    if (!event.matches) return;
    document.querySelectorAll('.motion-enter').forEach(target => target.classList.remove('motion-enter'));
  });
})();

(() => {
  const header = document.querySelector('.header');
  if (!header) return;
  let scheduled = false;
  const update = () => {
    const length = document.documentElement.scrollHeight - window.innerHeight;
    header.style.setProperty('--scroll-progress', length > 0 ? Math.min(1, Math.max(0, window.scrollY / length)) : 0);
    header.classList.toggle('is-scrolled', window.scrollY > 20);
    scheduled = false;
  };
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(update);
  };
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', schedule);
  window.addEventListener('load', schedule);
  update();
})();
