var CACHE_NAME = "my-site-cache-v2";

self.addEventListener("install", function(event) {
  // Perform install steps
  console.log("I am installed, prepare for trouble!");
  self.skipWaiting();
});

self.addEventListener("activate", function(event) {
  console.log(
    "New service worker version activated, prepare for even more trouble"
  );
});

self.addEventListener("fetch", function(event) {
  console.log(
    "Service worker is handling fetch, prepare for lots of trouble!!",
    event.request
  );

  if (!event.request.url.match(/\/app\.\d+\.js/)) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(event.request).then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(response => {
          console.log(response);
          switch (response.status) {
            case 200:
              cache.put(event.request, response.clone());
            case 400:
              console.log("You need to refresh your stuff buddy!");
          }

          return response;
        });
      })
    )
  );
});
