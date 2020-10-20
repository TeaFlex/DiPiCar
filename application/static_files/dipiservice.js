const precacheVersion = 0.18;
const precacheName = 'dipilink-' + precacheVersion;
const precacheFiles = ['/','manifest.json','/Styles/stencil.css','/Styles/project.css','/Scripts/home.js','/Scripts/inputs.js'];

self.addEventListener('install', (e) => {
  console.log('[DiPi Service] Installed');
  self.skipWaiting();
  e.waitUntil(
    caches.open(precacheName).then((cache) => {
      console.log('[DiPi Service] Adding files to the cache');
      return cache.addAll(precacheFiles);
    })
  );
});

self.addEventListener('activate', (e) => {
  console.log('[DiPi Service] Activated');
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.map((thisCacheName) => {
        if (thisCacheName.includes("dipilink") && thisCacheName !== precacheName) {
          return caches.delete(thisCacheName);
        }
      }));
    })
  );
});

self.addEventListener('fetch', (e) => {
  console.log('[DiPi Service] Fetch ', e.request.url);
  e.respondWith(
      caches.match(e.request).then((cachedResponse) => {
          if (cachedResponse){
              return cachedResponse;
          }
          return fetch(e.request)
          .then((fetchResponse) => fetchResponse)
          .catch((err) => {
            const isHTMLPage = e.request.method == "GET" && e.request.headers.get("accept").includes("text/html");
            if (isHTMLPage) return caches.match('/');
          })
      })
  );
});