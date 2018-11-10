var CACHE_NAME = 'my-site-cache-v1';
console.log("Hello");

self.addEventListener('install', function(event) {
  // Perform install steps
  console.log("I am installed, prepare for trouble!")
});

self.addEventListener('activate', function(event) {
  console.log("New service worker version activated, prepare for even more trouble")
  self.skipWaiting();
})

self.addEventListener('fetch', function(event) {
  console.log("Service worker is handling fetch, prepare for lots of trouble!!")
  console.log(event.request);
  if (event.request.url.match(/\/app\.\d+\.js/)) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }

          return fetch(event.request).then(function(networkResponse) {
            console.log(networkResponse);
            cache.put(event.request, networkResponse.clone());

            return networkResponse;
          });
        }
      )
    );
  }
});
