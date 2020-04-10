
const cacheName = 'v1';

// Call Install Event
self.addEventListener('install', e => {
    // Load newly updated sw
    e.waitUntil(self.skipWaiting());
});


// Call Activate Event
self.addEventListener('activate', e => {

    e.waitUntil(
        // Start fetching via sw from first load itself
        self.clients.claim(),

        // Remove unwanted caches
        caches.keys().then(cacheNames => {
            cacheNames.filter(cache => {
                if (cache !== cacheName) {
                    caches.delete(cache);
                }
            })
        })
    );
});


// Call Fetch Event
self.addEventListener('fetch', e => {

    // Skip requests which are not made by http(s) 
    if (!(e.request.url.indexOf('http') === 0)) return;

    e.respondWith(
        fetch(e.request)
            .then(res => {
                // Make copy/clone of response
                const resClone = res.clone();
                // Open cahce
                caches.open(cacheName).then(cache => {
                    // Add response to cache
                    cache.put(e.request, resClone);
                });
                return res;
            })
            .catch(err => caches.match(e.request).then(res => res))
    );
});
