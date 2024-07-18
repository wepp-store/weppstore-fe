import React from 'react';

const MakePWAPage = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-blue-600">
          PWA(Progressive Web App) 개발 가이드
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">
              1. 웹 앱 매니페스트 생성
            </h2>
            <p className="mb-4">
              <code className="bg-gray-200 rounded p-1">manifest.json</code>{' '}
              파일을 생성하여 앱의 메타데이터를 정의합니다. 예:
            </p>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
              <code>
                {`{
  "name": "My PWA",
  "short_name": "PWA",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "icon.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}`}
              </code>
            </pre>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">
              2. 서비스 워커 구현
            </h2>
            <p className="mb-4">
              <code className="bg-gray-200 rounded p-1">service-worker.js</code>{' '}
              파일을 생성하여 오프라인 기능과 백그라운드 동기화를 구현합니다.
            </p>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
              <code>
                {`
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-pwa-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/app.js'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
`}
              </code>
            </pre>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">
              3. 서비스 워커 등록
            </h2>
            <p className="mb-4">
              메인 JavaScript 파일에서 서비스 워커를 등록합니다:
            </p>
            <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
              <code>
                {`
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((reg) => console.log('Service worker registered.', reg))
      .catch((err) => console.log('Service worker registration failed:', err));
  });
}
`}
              </code>
            </pre>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">
              4. 반응형 디자인 적용
            </h2>
            <p className="mb-4">
              Tailwind CSS를 사용하여 모든 기기에서 잘 작동하는 반응형 디자인을
              쉽게 구현할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">
              5. HTTPS 사용
            </h2>
            <p className="mb-4">
              보안을 위해 HTTPS를 사용하여 앱을 호스팅합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">
              6. 성능 최적화
            </h2>
            <p className="mb-4">
              이미지 최적화, 코드 분할, 지연 로딩 등의 기술을 사용하여 앱의
              성능을 최적화합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-500">
              7. 테스트 및 배포
            </h2>
            <p className="mb-4">
              Lighthouse 등의 도구를 사용하여 PWA를 테스트하고, 웹 서버에
              배포합니다.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default MakePWAPage;
