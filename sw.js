/* Cancún Phrases service worker — makes the app work fully offline (e.g. on a plane).
   Strategy: stale-while-revalidate — serve the cached copy instantly (fast + works
   offline), and quietly refresh the cache from the network in the background so any
   updates reach the phone on the next open. Audio clips, once cached, stay cached. */
const CACHE='cancun-phrases-v2';
const CORE=['./','./index.html','./manifest.webmanifest','./icon.svg','./audio-map.js'];

self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>Promise.allSettled(CORE.map(u=>c.add(u)))));
});

self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(e.request).then(hit => {
        const net = fetch(e.request).then(resp => {
          if(resp && resp.ok) cache.put(e.request, resp.clone());
          return resp;
        }).catch(() => hit || cache.match('./index.html'));
        return hit || net;   // cache-first for speed/offline, network refreshes in background
      })
    )
  );
});
