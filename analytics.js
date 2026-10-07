document.addEventListener('click', event => {
  const link = event.target.closest?.('a[href]');
  if (!link || typeof window.gtag !== 'function') return;
  const url = new URL(link.href, window.location.href);
  const method = url.hostname === 'form.naver.com' ? 'naver_form'
    : url.hostname === 'pf.kakao.com' ? 'kakao'
    : url.protocol === 'tel:' ? 'phone' : null;
  if (method) window.gtag('event', 'consultation_click', {method});
  else if (url.hostname === 'calendar.tansojuku.com' && url.origin !== window.location.origin)
    window.gtag('event', 'calendar_open');
  else if (url.hostname === 'tansojuku.com' && url.origin !== window.location.origin)
    window.gtag('event', 'homepage_open');
});
