var CACHE_NAME = 'my-site-cache-v1';
console.log("Hello");

self.addEventListener('install', function(event) {
  // Perform install steps
  console.log("I am installed, prepare for trouble!")
});

self.addEventListener('activate', function(event) {
  console.log("New service worker version activated, prepare for even more trouble")
})

// self.addEventListener('fetch', function(event) {
//
// })
