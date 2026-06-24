/* Cancún Phrases service worker — makes the app work fully offline (e.g. on a plane).
   App shell is precached on install; audio clips are cached the first time they play
   while online, then served from cache forever after. */
const CACHE='cancun-phrases-v1';
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
    caches.match(e.request).then(hit => hit || fetch(e.request).then(resp=>{
      const copy=resp.clone();
      caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});
      return resp;
    }).catch(()=> caches.match('./index.html')))
  );
});
