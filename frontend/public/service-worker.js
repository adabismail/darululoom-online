// public/service-worker.js

const CACHE_NAME = 'darul-uloom-v1';

// Core files that MUST be available offline
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/images/favicon.png',
  '/images/quran.png',
  '/images/teacher.png'
];

// INSTALL: Pre-cache core assets safely
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        await cache.addAll(CORE_ASSETS);
      } catch (err) {
        console.error('Precache failed:', err);
      }
    })
  );
  self.skipWaiting();
});

// ACTIVATE: Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// FETCH: Smart strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Ignore non-GET requests
  if (request.method !== 'GET') return;

  // Never touch admin or API routes
  if (
    request.url.includes('/admin') ||
    request.url.includes('/api')
  ) {
    return;
  }

  // NAVIGATION: network-first (fixes React update issues)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put('/index.html', clone);
          });
          return response;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // STATIC ASSETS: cache-first
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        // Cache only valid responses
        if (!response || !response.ok) {
          return response;
        }

        const shouldCache =
          request.url.includes('/static/') ||
          request.destination === 'script' ||
          request.destination === 'style' ||
          request.destination === 'image';

        if (shouldCache) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }

        return response;
      });
    })
  );
});
