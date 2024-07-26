import { CodeView } from '@/shared/ui/code';
import { Section } from '@/shared/ui/section';
import React from 'react';

const serviceWorkerCode = `
const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/scripts/main.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
`.trim();

const registrationCode = `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((reg) => console.log('Service worker registered.', reg))
      .catch((err) => console.log('Service worker registration failed:', err));
  });
}
`.trim();

const ServiceWorkerStep = () => {
  return (
    <>
      <Section>
        <h1 className="text-2xl font-semibold mb-4">Service Worker</h1>
        <p>
          서비스 워커는 백그라운드에서 실행되는 스크립트로, 웹 애플리케이션의
          오프라인 경험을 향상시키는 데 사용됩니다.
        </p>
        <p>
          서비스 워커는 네트워크 요청을 가로채고 캐시에서 응답을 반환하여
          오프라인에서도 앱을 실행할 수 있게 합니다.
        </p>
        <p>
          서비스 워커를 등록하려면 <code>sw.js</code> 파일을 프로젝트 루트에
          만들고 다음 코드를 추가하세요.
        </p>
      </Section>

      <Section>
        <CodeView code={serviceWorkerCode} language="javascript" />
      </Section>

      <Section>
        <h2 className="text-xl font-semibold mb-4">서비스 워커 등록하기</h2>
        <p>
          서비스 워커를 등록하려면 다음 코드를 프로젝트의{' '}
          <code>index.html</code> 파일에 추가하세요.
        </p>
      </Section>

      <Section>
        <CodeView code={registrationCode} language="javascript" />
      </Section>
    </>
  );
};

export default ServiceWorkerStep;
