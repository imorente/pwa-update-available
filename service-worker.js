var cacheName = 'someCacheName';
var version = "v7";

alert("sw version " + version);

self.addEventListener('install', event => {
  alert("serviceWorker install")
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
        './dog.jpg'
      ]))
  );
});

self.addEventListener('message', function (event) {
  alert("serviceWorker message")

  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function (event) {
  alert("serviceWorker fetch")

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
