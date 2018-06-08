var staticCacheName = 'restauravt-static-v1';

var cacheFiles = [
'./',
 './restaurant.html',
 'js/main.js',
 'js/dbhelper.js',
 'js/app.js',
 'js/restaurant_info.js',
 'css/styles.css',
 'css/responsive.css',
 'css/restaurant-responsive.css',
 'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
 'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
];

self.addEventListener('install', function(event) {
  // TODO: cache /skeleton rather than the root page
  console.log('service worker installed');

  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
        console.log('[service worker] Caching  cacheFiles');

      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('activate', function(event) {
   console.log('service worker activated');


event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restauravt-') &&
                 cacheName != staticCacheName;
                 console.log('[service worker] Removing cache files from',cacheName);

        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

/*
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
          return Promise.all(cacheNames.map(function(thisCacheName){

            if(thisCacheName !== cacheName){
                 console.log('[service worker] Removing cache files from',thisCacheName);
                 return caches.delete(thisCacheName);

            }

          })) 
        })
      );
    })*/


self.addEventListener('fetch', function(event) {
  console.log('service worker fetched');
/*
  var requestUrl = new URL(event.request.url);
  if(requestUrl.origin === location.origin){
    if(requestUrl.pathname === '/'){
      event.respondWith(caches.match('/skeleton'));
      return;
    }

  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );*/
});