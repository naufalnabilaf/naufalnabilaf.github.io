const staticCacheName = "site-static-v1";
const dynamicCacheName = "site-dynamic-v1";
const assets = [
  "/",
  "/index.html",
  "/elemen.html",
  "/garasi.html",
  "/istilah.html",
  "/jenis.html",
  "/kriteria.html",
  "/prinsip.html",
  "/sejarah.html",
  "/sumber.html",
  "/tentang.html",
  "/video.html",
  "/warna.html",
  "/js/script.js",
  "/js/bootstrap.bundle.min.js",
  "/css/Style.css",
  "/css/bootstrap.min.css",
  "/font/poppins/Poppins-Regular.ttf",
  "/font/poppins/Poppins-Bold.ttf",
  "/icon/font/bootstrap-icons.min.css",
  "/icon/font/fonts/bootstrap-icons.woff2",
  "/img/Logo Icon.png",
  "/img/Karakter 1.gif",
  "/img/img-tentang.svg",
  "/img/card-logo.webp",
  "/img/card-video.webp",
  "/img/card-garasi.webp",
  "/img/Pembuat.gif",
];

// install event
self.addEventListener("install", (evt) => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener("activate", (evt) => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then((keys) => {
      //console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", (evt) => {
  //console.log('fetch event', evt);
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(evt.request).then((fetchRes) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              return fetchRes;
            });
          })
        );
      })
      .catch(() => {
        // if(evt.request.url.indexOf('.html') > -1){
        //   return caches.match('/pages/fallback.html');
        // }
      })
  );
});
