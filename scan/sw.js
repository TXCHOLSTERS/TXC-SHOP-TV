// TXC scan page (PRESS/TRIM, BUFF, ASSEMBLY): keep a copy on the iPad so the page still opens with no Wi-Fi (network first, cache fallback).
var C='txc-scan-v5';
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(['./','./index.html','./icon-180.png','./stations.json','./units.json']);}));self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.filter(function(k){return k!==C;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();});});
self.addEventListener('fetch',function(e){var u=e.request.url;if(e.request.method!=='GET'||u.indexOf('api.github.com')>=0)return;
 e.respondWith(fetch(e.request).then(function(r){var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp);});return r;}).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match('./index.html');});}));});
