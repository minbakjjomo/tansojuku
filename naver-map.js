(() => {
  const container = document.getElementById('naver-location-map');
  if (!container) return;

  const showFallback = reason => {
    container.dataset.mapStatus = reason;
    const link = document.createElement('a');
    link.className = 'map-fallback';
    link.href = 'https://map.naver.com/p/entry/place/1231105818';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = '네이버지도에서 탄소쥬크 위치 확인 ↗';
    container.replaceChildren(link);
  };
  window.navermap_authFailure = () => showFallback('authentication');
  window.initTansojukuMap = () => {
    if (!window.naver?.maps) return showFallback('sdk-unavailable');
    container.replaceChildren();
    const position = new naver.maps.LatLng(37.5209444, 127.0236616);
    const map = new naver.maps.Map(container, {
      center: position, zoom: 17, zoomControl: true, scrollWheel: false
    });
    const marker = new naver.maps.Marker({position, map, title: '탄소쥬크 일본어'});
    const label = new naver.maps.InfoWindow({
      content: '<div class="map-label"><strong>탄소쥬크 일본어</strong><br>도산대로17길 37-1 · 201호</div>',
      borderColor: '#5BBB8A'
    });
    label.open(map, marker);
    container.dataset.mapStatus = 'ready';
  };
  const loadMap = () => {
    const script = document.createElement('script');
    script.src = 'https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=2lcyqttm2c';
    script.async = true;
    script.onload = window.initTansojukuMap;
    script.onerror = () => showFallback('network');
    document.head.appendChild(script);
  };
  if (!('IntersectionObserver' in window)) return loadMap();
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    loadMap();
  }, {rootMargin: '200px'});
  observer.observe(container);
})();
