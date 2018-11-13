var CACHE_NAME = "my-site-cache-v5";

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
    console.log("I'm leaving this request alone");
    return;
  }

  console.log("I'm doing stuff. Watch out!");

  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(event.request).then(response => {
        // Cache hit - return response
        if (response) {
          console.log("Cache hit! Returning cached response", response);
          return response;
        }

        console.log("Cache miss – fetching", response);
        return fetch(event.request).then(response => {
          switch (response.status) {
            case 200:
              console.log("Caching this one", response);
              cache.put(event.request, response.clone());
              break;
            case 404:
              console.log(
                "Not found – you need to refresh your stuff buddy!",
                response
              );
              break;
            default:
              console.log(
                "I don't know what to do with this ¯\\_(ツ)_/¯",
                response
              );
          }

          return response;
        });
      })
    )
  );
});
