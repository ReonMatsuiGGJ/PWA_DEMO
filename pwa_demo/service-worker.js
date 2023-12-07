const CACHE_NAME = 'demo-page-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './icon.png'
];

// インストール時にキャッシュを開く
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// リソースフェッチ時にキャッシュを返す
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
