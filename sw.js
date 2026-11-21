/* Invierno en el Rin · service worker: funciona sin conexión */
const VERSION = "rm-v4";
const CORE = [
  "./", "index.html", "credits.html", "manifest.webmanifest",
  "css/style.css", "js/images.js", "js/data.js", "js/app.js",
  "fonts/fraunces.woff2", "fonts/fraunces-italic.woff2", "fonts/inter.woff2",
  "img/dus_ko.webp", "img/dus_rheinturm.webp", "img/cgn_altermarkt.webp",
  "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION && k !== "rm-photos").map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Fotos de Wikimedia: caché primero (se guardan al verlas por primera vez)
  if (url.hostname === "upload.wikimedia.org") {
    e.respondWith(
      caches.open("rm-photos").then(async (c) => {
        const hit = await c.match(url.href);
        if (hit) return hit;
        try {
          const res = await fetch(url.href, { mode: "cors", credentials: "omit" });
          if (res.ok) c.put(url.href, res.clone());
          return res;
        } catch (err) {
          try { return await fetch(req); } catch { return Response.error(); }
        }
      })
    );
    return;
  }

  // Tiempo: red primero
  if (url.hostname === "api.open-meteo.com") return;

  // Archivos propios: caché primero, actualizando en segundo plano
  if (url.origin === location.origin) {
    e.respondWith(
      caches.open(VERSION).then(async (c) => {
        const hit = await c.match(req, { ignoreSearch: true });
        const net = fetch(req).then((res) => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
        return hit || net;
      })
    );
  }
});

/* Precarga de todas las fotos cuando la app lo pide (botón «Guardar para sin conexión») */
self.addEventListener("message", (e) => {
  if (!e.data || e.data.type !== "precache") return;
  e.waitUntil(
    caches.open("rm-photos").then((c) =>
      Promise.all(e.data.urls.map((u) =>
        c.match(u).then((hit) => hit || fetch(u, { mode: "cors", credentials: "omit" }).then((r) => r.ok && c.put(u, r)).catch(() => {}))
      ))
    ).then(() => e.source && e.source.postMessage({ type: "precached" }))
  );
});
