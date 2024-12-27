const CACHE_NAME = "Yasmin-App";
const urlsToCache = [
  "/",
  "index.html",
  "style.css",
  "script.js",
  "logo.jpg",
  "intro.png",
  // Include all your mp3 and image files here
  "aladin.mp3", "baby.mp3", "brett.mp3", "chocolate.mp3",
  "chunariya.mp3", "endless_love_lionel_richie.mp3", "fly.mp3", 
  "gift.mp3", "hsong.mp3", "immortality_celine_dion.mp3",
  "qr8.mp3", "qr9.mp3", "qr10.mp3", "/receiver.mp3", 
  "sasa_hivi.mp3", "sender.mp3", "sikuachi.mp3", "story1.mp3",
  "story2.mp3", "story3.mp3", "tu_hai_ar_rahman_sanah_moidutty.mp3",
  "vib.mp3", "zawadi.mp3", "jay_melody_nakupenda.mp3",
  "letter.mp3", "love.mp3", "love_letter.mp3", "mileya.mp3",
  "mltr_someday.mp3", "my_sugar.mp3", "perri.mp3",
  "qr1.mp3", "qr2.mp3", "qr3.mp3", "qr4.mp3", "qr5.mp3",
  "qr6.mp3", "qr7.mp3", "loveme.mp3", "yasminvid.mp4",
  'vid5.mp4', 'vid4.mp4', 'post3.jpg', 'post2.jpg', 'post1.jpg', "yasmin.jpg",
  'vid3.mp4', 'poster.jpg', 'vid1.mp4', 'vid2.mp4', 'introvid.mp4', 'introvid4.mp4', 'vid7.mp4', 'vid8.mp4', 'introvid3.mp4', 'vid6.mp4', 'introvid2.mp4'
];

// Install the service worker and cache essential files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    }).catch((error) => {
      console.error("Error during service worker installation:", error);
    })
  );
});

// Activate the service worker and clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    }).catch((error) => {
      console.error("Error during service worker activation:", error);
    })
  );
});

// Fetch assets from cache or network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If we have a cached response, return it
      if (cachedResponse) {
        return cachedResponse;
      }

      // Otherwise, try to fetch it from the network
      return fetch(event.request).then((response) => {
        // Only cache successful responses for specific requests (e.g., images or audio files)
        if (response.ok && event.request.url.endsWith('.mp3')) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
          });
        }
        return response;
      }).catch((error) => {
        console.error("Fetch failed:", error);
        throw error;
      });
    }).catch((error) => {
      console.error("Error handling fetch event:", error);
      throw error;
    })
  );
});
