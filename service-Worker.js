var staticCacheName = 'restauravt-static-v1';

var cacheFiles = [
    './',
    './restaurant.html',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg',
    'data/restaurants.json',
    'js/main.js',
    'js/dbhelper.js',
    'js/app.js',
    'js/restaurant_info.js',
    'css/styles.css',
    'css/responsive.css',
    'css/restaurant-responsive.css',
    'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyDfQPpFKfgkuZ9ZDYmNy165S4IAZauv4K4&libraries=places&callback=initMap',
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyDfQPpFKfgkuZ9ZDYmNy165S4IAZauv4K4&libraries=places&callback=initMap',
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
                    console.log('[service worker] Removing cache files from', cacheName);

                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log('service worker fetched');

    event.respondWith(

        caches.match(event.request).then(function(response) {
            if (response) {
                console.log('[service worker] found in cache', event.request.url);
                return response;
            }
            var requestClone = event.request.clone();
            fetch(requestClone)
                .then(function(response) {
                    if (!response) {
                        console.log('[service worker] no response from fetch');
                        return response;
                    }
                    var responseClone = response.clone();
                    caches.open(staticCacheName).then(function(cache) {
                        cache.put(event.request, responseClone);
                        return response;
                    });
                })
        })
    )

});