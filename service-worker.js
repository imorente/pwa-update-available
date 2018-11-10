var cacheName = 'someCacheName';
var version = "v6";

console.log("sw version %s", version);

self.addEventListener('install', event => {
  console.log("serviceWorker install")
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
        './dog.jpg'
      ]))
  );
});

self.addEventListener('message', function (event) {
  console.log("serviceWorker message", {event})

  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function (event) {
  console.log("serviceWorker fetch", {event})

  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
