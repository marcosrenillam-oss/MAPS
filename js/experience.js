/* =========================================================
   Experiencia: mapa del día · modo paseo · tarjeta «Ahora»
   ========================================================= */
(() => {
  "use strict";
  const T = window.TRIP;
  if (!T) return;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const dayById = (id) => DAYS.find((d) => d.id === id);
  const isDark = () => document.documentElement.dataset.theme === "dark";
  const lock = (on) => document.documentElement.classList.toggle("lock", on);
  const DOW = { "2026-12-08": "Martes 8", "2026-12-09": "Miércoles 9", "2026-12-10": "Jueves 10", "2026-12-11": "Viernes 11" };

  /* ---------- lugares de un día ---------- */
  function placesOf(d) {
    const out = [], seenAt = new Set();
    const push = (o) => { if (!o.at || !GEO[o.at] || seenAt.has(o.at)) return; seenAt.add(o.at); out.push(o); };
    if (d.base === "dus-hotel") push({ id: "hotel", name: HOTEL.name, at: HOTEL.at, kind: "hotel", short: HOTEL.address });
    [...d.xmas, ...d.always, ...(d.gems || [])].filter((p) => p.must).forEach((p) => push({ id: p.id, name: p.name, at: p.at, kind: d.xmas.includes(p) ? "market" : "must", must: true, img: p.img, short: p.short, poi: p.id }));
    (d.markets ? d.markets.list : []).forEach((m) => push({ id: "mk:" + m.name, name: m.name, at: m.at, kind: "market", must: true, short: "🕒 " + m.hours, img: null }));
    [...d.xmas, ...d.always, ...(d.gems || [])].filter((p) => !p.must).forEach((p) => push({ id: p.id, name: p.name, at: p.at, kind: "opt", img: p.img, short: p.short, poi: p.id }));
    d.food.forEach((f) => push({ id: "food:" + f.name, name: f.name, at: f.at, kind: "food", img: f.img, short: f.what }));
    if (d.base !== "dus-hotel") push({ id: "base", name: BASE_NAME[d.base] ? BASE_NAME[d.base] : "Estación", at: d.base, kind: "base", short: "Estación de tren" });
    return out;
  }
  const KIND = {
    hotel: { label: "Apartamento", icon: "⌂" },
    base: { label: "Estación", icon: "🚆" },
    market: { label: "Mercado", icon: "🎄" },
    must: { label: "Imprescindible", icon: "★" },
    opt: { label: "Opcional", icon: "•" },
    food: { label: "Comer", icon: "🍴" },
  };

  /* =========================================================
     MAPA DEL DÍA (MapLibre + OpenFreeMap, 3D)
     ========================================================= */
  let libP = null;
  const loadLib = () => libP || (libP = new Promise((res, rej) => {
    if (window.maplibregl) return res();
    const l = document.createElement("link"); l.rel = "stylesheet"; l.href = "css/maplibre-gl.css"; document.head.appendChild(l);
    const s = document.createElement("script"); s.src = "js/vendor/maplibre-gl.js"; s.onload = res; s.onerror = rej; document.head.appendChild(s);
  }));

  const mv = document.createElement("section");
  mv.className = "mv"; mv.setAttribute("aria-hidden", "true");
  mv.innerHTML = `
    <div class="mv__map" id="mvMap"></div>
    <div class="mv__veil"></div>
    <header class="mv__top">
      <button class="mv__btn" data-mv-close aria-label="Volver"><svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg></button>
      <div class="mv__title"><small id="mvKick"></small><b id="mvTitle"></b></div>
      <button class="mv__btn" data-mv-loc aria-label="Mi ubicación">${T.ICON.locate}</button>
    </header>
    <div class="mv__filters" id="mvFilters">
      <button data-f="all" class="is-on">Todo</button>
      <button data-f="must">★ Imprescindibles</button>
      <button data-f="market">🎄 Mercados</button>
      <button data-f="food">🍴 Comer</button>
    </div>
    <div class="mv__route" id="mvRoute"></div>
    <div class="mv__cards" id="mvCards"></div>
    <div class="mv__loading" id="mvLoading"><i></i><span>Cargando mapa…</span></div>`;
  document.body.appendChild(mv);

  let map = null, markers = [], places = [], curDay = null, sel = -1, meMarker = null, meTimer = null, filter = "all";

  function cardHTML(p, i) {
    const k = KIND[p.kind];
    const me = T.me();
    const h = me ? T.hop("me", p.at) : T.hop(curDay.base, p.at);
    const dl = h ? (me ? `${h.short} de ti` : h.same ? "Aquí mismo" : `${h.short} desde ${BASE_NAME[curDay.base]}`) : "";
    return `
      <article class="mvc mvc--${p.kind}" data-i="${i}">
        <div class="mvc__img" style="${p.img ? `background-image:url('${T.img(p.img)}')` : ""}"><span>${k.icon}</span></div>
        <div class="mvc__txt">
          <small>${k.label}</small>
          <b>${p.name}</b>
          <p>${p.short || ""}</p>
          <em>${dl}</em>
        </div>
        <div class="mvc__act">
          ${p.poi ? `<button data-mv-sheet="${p.poi}">Ficha</button>` : ""}
          <a href="https://www.google.com/maps/dir/?api=1&destination=${GEO[p.at][0]},${GEO[p.at][1]}&travelmode=walking" target="_blank" rel="noopener">Ir</a>
        </div>
      </article>`;
  }

  function renderCards() {
    const vis = places.map((p, i) => ({ p, i })).filter(({ p }) => filter === "all" || (filter === "must" ? p.must : p.kind === filter) || p.kind === "hotel" || p.kind === "base");
    $("#mvCards").innerHTML = vis.map(({ p, i }) => cardHTML(p, i)).join("");
    markers.forEach((m, i) => m.getElement().classList.toggle("is-hidden", !vis.some((v) => v.i === i)));
  }

  function select(i, fly = true) {
    sel = i;
    markers.forEach((m, j) => m.getElement().classList.toggle("is-sel", j === i));
    $$(".mvc", mv).forEach((c) => c.classList.toggle("is-sel", +c.dataset.i === i));
    if (fly && map && places[i]) {
      const g = GEO[places[i].at];
      map.easeTo({ center: [g[1], g[0]], zoom: Math.max(map.getZoom(), 15.6), pitch: 55, duration: 900, padding: { top: 130, bottom: 250, left: 20, right: 20 } });
    }
  }

  function routeAnim(line, color) {
    if (!line) return;
    const src = { type: "geojson", data: { type: "Feature", geometry: { type: "LineString", coordinates: line.slice(0, 2) } } };
    map.addSource("route", src);
    map.addLayer({ id: "route-glow", type: "line", source: "route", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": color, "line-width": 14, "line-opacity": 0.22, "line-blur": 4 } });
    map.addLayer({ id: "route-line", type: "line", source: "route", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": color, "line-width": 4.5 } });
    map.addLayer({ id: "route-dash", type: "line", source: "route", layout: { "line-cap": "round" }, paint: { "line-color": "#ffffff", "line-width": 1.6, "line-dasharray": [0, 3, 2] } });
    const t0 = performance.now(), dur = 2600;
    const step = (now) => {
      if (!map || !map.getSource("route")) return;
      const k = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      const n = Math.max(2, Math.round(line.length * e));
      map.getSource("route").setData({ type: "Feature", geometry: { type: "LineString", coordinates: line.slice(0, n) } });
      if (k < 1) requestAnimationFrame(step); else dashFlow();
    };
    requestAnimationFrame(step);
  }
  // hormigas que caminan por la ruta
  function dashFlow() {
    const seq = [[0, 4, 3], [0.5, 4, 2.5], [1, 4, 2], [1.5, 4, 1.5], [2, 4, 1], [2.5, 4, 0.5], [3, 4, 0], [0, 0.5, 3, 3.5], [0, 1, 3, 3], [0, 1.5, 3, 2.5], [0, 2, 3, 2], [0, 2.5, 3, 1.5], [0, 3, 3, 1], [0, 3.5, 3, 0.5]];
    let i = 0;
    const tick = () => {
      if (!map || !map.getLayer("route-dash") || !mv.classList.contains("is-open")) return;
      map.setPaintProperty("route-dash", "line-dasharray", seq[i]);
      i = (i + 1) % seq.length;
      setTimeout(() => requestAnimationFrame(tick), 70);
    };
    tick();
  }

  function updateMe() {
    const me = T.me();
    if (!map || !me) return;
    if (!meMarker) {
      const el = document.createElement("div"); el.className = "mv-me"; el.innerHTML = "<i></i>";
      meMarker = new maplibregl.Marker({ element: el }).setLngLat([me[1], me[0]]).addTo(map);
    } else meMarker.setLngLat([me[1], me[0]]);
  }

  async function openMap(id) {
    const d = dayById(id);
    curDay = d; filter = "all"; sel = -1;
    places = placesOf(d);
    mv.style.setProperty("--acc", d.accent);
    $("#mvKick").textContent = `${DOW[d.date]} · ${d.city}`;
    $("#mvTitle").textContent = "Mapa del día";
    $$("#mvFilters button").forEach((b) => b.classList.toggle("is-on", b.dataset.f === "all"));
    const R = typeof ROUTES !== "undefined" && ROUTES[id];
    $("#mvRoute").innerHTML = R ? `<span class="mv__dot"></span>Ruta a pie · ${T.fmtM(R.m)} · ${T.walkMin(R.m)} min` : "";
    $("#mvCards").innerHTML = "";
    mv.classList.add("is-open", "is-loading"); mv.setAttribute("aria-hidden", "false"); lock(true);
    try { await loadLib(); } catch { mv.classList.remove("is-loading"); T.toast("No se pudo cargar el mapa (¿sin conexión?)"); return; }
    if (map) { map.remove(); map = null; markers = []; meMarker = null; }
    const all = places.map((p) => GEO[p.at]);
    const lats = all.map((g) => g[0]), lngs = all.map((g) => g[1]);
    const center = [(Math.min(...lngs) + Math.max(...lngs)) / 2, (Math.min(...lats) + Math.max(...lats)) / 2];
    map = new maplibregl.Map({
      container: "mvMap",
      style: `https://tiles.openfreemap.org/styles/${isDark() ? "dark" : "positron"}`,
      center, zoom: 10.5, pitch: 0, bearing: 0, attributionControl: { compact: true },
      fadeDuration: 150, maxPitch: 70,
    });
    map.on("load", () => {
      mv.classList.remove("is-loading");
      // edificios en 3D
      try {
        const lbl = map.getStyle().layers.find((l) => l.type === "symbol" && l.layout && l.layout["text-field"]);
        map.addLayer({
          id: "b3d", type: "fill-extrusion", source: "openmaptiles", "source-layer": "building", minzoom: 14,
          paint: {
            "fill-extrusion-color": isDark() ? "#2A2E38" : "#E6DFD2",
            "fill-extrusion-height": ["interpolate", ["linear"], ["zoom"], 14, 0, 15.5, ["coalesce", ["get", "render_height"], 10]],
            "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], 0],
            "fill-extrusion-opacity": 0.75,
          },
        }, lbl && lbl.id);
      } catch {}
      routeAnim(R && R.line, d.accent);
      // marcadores
      places.forEach((p, i) => {
        const el = document.createElement("button");
        el.className = `mv-pin mv-pin--${p.kind}`;
        el.style.setProperty("--d", `${i * 45}ms`);
        el.innerHTML = `<span>${KIND[p.kind].icon}</span>`;
        el.setAttribute("aria-label", p.name);
        el.addEventListener("click", (e) => { e.stopPropagation(); select(i); scrollToCard(i); });
        const g = GEO[p.at];
        markers.push(new maplibregl.Marker({ element: el, anchor: "bottom" }).setLngLat([g[1], g[0]]).addTo(map));
      });
      renderCards();
      updateMe();
      // vuelo de entrada
      const b = new maplibregl.LngLatBounds();
      places.filter((p) => p.must || p.kind === "hotel" || p.kind === "base").forEach((p) => b.extend([GEO[p.at][1], GEO[p.at][0]]));
      if (R) R.line.forEach((c) => b.extend(c));
      map.fitBounds(b, { padding: { top: 140, bottom: 250, left: 30, right: 30 }, pitch: 50, bearing: -14, duration: 2600, maxZoom: 15.8 });
    });
    clearInterval(meTimer);
    meTimer = setInterval(updateMe, 3000);
  }

  function scrollToCard(i) {
    const c = $(`.mvc[data-i="${i}"]`, mv);
    if (c) c.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  function closeMap() {
    mv.classList.remove("is-open", "is-loading"); mv.setAttribute("aria-hidden", "true"); lock(false);
    clearInterval(meTimer);
    setTimeout(() => { if (!mv.classList.contains("is-open") && map) { map.remove(); map = null; markers = []; meMarker = null; } }, 450);
  }

  // tarjetas ↔ mapa
  let cardT;
  $("#mvCards").addEventListener("scroll", () => {
    clearTimeout(cardT);
    cardT = setTimeout(() => {
      const box = $("#mvCards"), mid = box.scrollLeft + box.clientWidth / 2;
      let best = null, bd = 1e9;
      $$(".mvc", box).forEach((c) => { const dd = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid); if (dd < bd) { bd = dd; best = c; } });
      if (best && +best.dataset.i !== sel) select(+best.dataset.i);
    }, 140);
  }, { passive: true });

  mv.addEventListener("click", (e) => {
    if (e.target.closest("[data-mv-close]")) return closeMap();
    if (e.target.closest("[data-mv-loc]")) {
      T.startLocation();
      const me = T.me();
      if (me && map) map.easeTo({ center: [me[1], me[0]], zoom: 16, pitch: 55, duration: 1000 });
      else T.toast("Buscando tu ubicación…");
      return;
    }
    const f = e.target.closest("[data-f]");
    if (f) {
      filter = f.dataset.f;
      $$("#mvFilters button").forEach((b) => b.classList.toggle("is-on", b === f));
      renderCards();
      $("#mvCards").scrollLeft = 0;
      return;
    }
    const sh = e.target.closest("[data-mv-sheet]");
    if (sh) { T.openSheet(sh.dataset.mvSheet, document.getElementById(curDay.id)); return; }
    const c = e.target.closest(".mvc");
    if (c && !e.target.closest("a,button")) select(+c.dataset.i);
  });

  /* =========================================================
     MODO PASEO (historias a pantalla completa)
     ========================================================= */
  const st = document.createElement("section");
  st.className = "st"; st.setAttribute("aria-hidden", "true");
  st.innerHTML = `
    <div class="st__bg" id="stBg"></div>
    <div class="st__shade"></div>
    <div class="st__bars" id="stBars"></div>
    <header class="st__top"><small id="stKick"></small><button class="st__x" data-st-close aria-label="Cerrar"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button></header>
    <div class="st__tap st__tap--l" data-st-prev></div>
    <div class="st__tap st__tap--r" data-st-next></div>
    <div class="st__body" id="stBody"></div>`;
  document.body.appendChild(st);
  let sItems = [], sIdx = 0, sDay = null, sTimer = null, sStart = 0, sLeft = 0, sPaused = false;
  const DUR = 8000;

  function storyItems(d) {
    return T.mustItems(d).map((x) => {
      if (x.poi) {
        const p = T.POI_INDEX[x.poi];
        return { key: x.key, poi: p.id, name: p.name, tag: p.tag, img: p.img, short: p.short, desc: p.desc, time: p.time, price: p.price, at: p.at, tip: p.tip };
      }
      const m = d.markets.list.find((mm) => "mk:" + d.id + ":" + mm.name === x.key);
      return { key: x.key, name: m.name, tag: "Mercado", img: d.hero, short: m.tip, time: "", price: "Gratis", at: m.at, hours: m.hours };
    });
  }

  function renderStory() {
    const it = sItems[sIdx];
    const nx = sItems[sIdx + 1];
    const seenNow = T.seen.has(it.key);
    const h = nx && T.hop(it.at, nx.at);
    const bg = document.createElement("div");
    bg.className = "st__img";
    bg.style.backgroundImage = `url('${T.img(it.img, true)}')`;
    const old = $$(".st__img", st);
    $("#stBg").appendChild(bg);
    requestAnimationFrame(() => bg.classList.add("is-on"));
    setTimeout(() => old.forEach((o) => o.remove()), 900);
    $("#stKick").textContent = `${DOW[sDay.date]} · ${sDay.city} · ${sIdx + 1}/${sItems.length}`;
    $("#stBars").innerHTML = sItems.map((_, i) => `<i class="${i < sIdx ? "is-done" : i === sIdx ? "is-cur" : ""}"><span></span></i>`).join("");
    $("#stBody").innerHTML = `
      <span class="st__tag">★ ${it.tag}</span>
      <h2>${it.name.split(" ").map((w, i) => `<span style="--i:${i}">${w}</span>`).join(" ")}</h2>
      <p>${it.desc || it.short || ""}</p>
      <div class="st__meta">
        ${it.hours ? `<span>🕒 ${it.hours}</span>` : ""}
        ${it.time ? `<span>⏱ ${it.time}</span>` : ""}
        ${it.price ? `<span>€ ${it.price}</span>` : ""}
        ${h && !h.same ? `<span>🚶 siguiente a ${h.short}</span>` : ""}
      </div>
      <div class="st__act">
        <button class="st__seen ${seenNow ? "is-on" : ""}" data-st-seen>${seenNow ? "✓ Visto" : "Marcar visto"}</button>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${GEO[it.at][0]},${GEO[it.at][1]}&travelmode=walking" target="_blank" rel="noopener">Llévame</a>
        ${it.poi ? `<button data-st-sheet>Ficha</button>` : ""}
      </div>`;
    sLeft = DUR; play();
  }
  function play() {
    clearTimeout(sTimer);
    sStart = performance.now();
    const cur = $("#stBars .is-cur span");
    if (cur) { cur.style.transition = "none"; cur.style.transform = `scaleX(${1 - sLeft / DUR})`; void cur.offsetWidth; cur.style.transition = `transform ${sLeft}ms linear`; cur.style.transform = "scaleX(1)"; }
    sTimer = setTimeout(next, sLeft);
    sPaused = false;
  }
  function pause() {
    if (sPaused) return;
    sPaused = true;
    clearTimeout(sTimer);
    sLeft = Math.max(0, sLeft - (performance.now() - sStart));
    const cur = $("#stBars .is-cur span");
    if (cur) { const k = 1 - sLeft / DUR; cur.style.transition = "none"; cur.style.transform = `scaleX(${k})`; }
  }
  function next() { if (sIdx < sItems.length - 1) { sIdx++; renderStory(); } else finale(); }
  function prev() { if (sIdx > 0) { sIdx--; renderStory(); } else { sLeft = DUR; play(); } }
  function finale() {
    clearTimeout(sTimer);
    const n = sItems.filter((x) => T.seen.has(x.key)).length;
    $("#stBars").innerHTML = sItems.map(() => `<i class="is-done"><span></span></i>`).join("");
    $("#stBody").innerHTML = `
      <span class="st__tag">Fin del paseo</span>
      <h2><span>${n}/${sItems.length}</span> <span>vistos</span></h2>
      <p>${n === sItems.length ? "¡Día completado! Todos los imprescindibles, hechos." : "Te quedan " + (sItems.length - n) + " imprescindibles por marcar hoy."}</p>
      <div class="st__act"><button data-st-restart>Ver otra vez</button><button class="st__seen is-on" data-st-close>Cerrar</button></div>`;
  }
  function openStory(id) {
    sDay = dayById(id);
    sItems = storyItems(sDay);
    if (!sItems.length) return;
    const firstPending = sItems.findIndex((x) => !T.seen.has(x.key));
    sIdx = firstPending > 0 ? firstPending : 0;
    st.style.setProperty("--acc", sDay.accent);
    $("#stBg").innerHTML = "";
    st.classList.add("is-open"); st.setAttribute("aria-hidden", "false"); lock(true);
    renderStory();
  }
  function closeStory() { clearTimeout(sTimer); st.classList.remove("is-open"); st.setAttribute("aria-hidden", "true"); lock(false); }

  // gestos: tocar izq/dcha, mantener = pausa, deslizar abajo = cerrar
  let tY = 0, tX = 0, tT = 0, held = false, holdT;
  st.addEventListener("touchstart", (e) => {
    if (e.target.closest("a,button")) return;
    tY = e.touches[0].clientY; tX = e.touches[0].clientX; tT = Date.now(); held = false;
    holdT = setTimeout(() => { held = true; pause(); st.classList.add("is-held"); }, 220);
  }, { passive: true });
  st.addEventListener("touchmove", (e) => {
    const dy = e.touches[0].clientY - tY;
    if (dy > 0) st.style.setProperty("--pull", `${dy}px`);
  }, { passive: true });
  st.addEventListener("touchend", (e) => {
    clearTimeout(holdT);
    st.classList.remove("is-held");
    const dy = (e.changedTouches[0].clientY - tY);
    st.style.setProperty("--pull", "0px");
    if (dy > 110) { closeStory(); return; }
    if (held) { play(); return; }
  });
  st.addEventListener("click", (e) => {
    if (e.target.closest("[data-st-close]")) return closeStory();
    if (e.target.closest("[data-st-restart]")) { sIdx = 0; return renderStory(); }
    if (e.target.closest("[data-st-seen]")) {
      const it = sItems[sIdx];
      const on = !T.seen.has(it.key);
      T.markSeen(it.key, on);
      const b = e.target.closest("[data-st-seen]");
      b.classList.toggle("is-on", on); b.textContent = on ? "✓ Visto" : "Marcar visto";
      if (on) { burst(b); setTimeout(next, 700); }
      return;
    }
    if (e.target.closest("[data-st-sheet]")) { pause(); return T.openSheet(sItems[sIdx].poi, document.getElementById(sDay.id)); }
    if (held) return;
    if (e.target.closest("[data-st-prev]")) return prev();
    if (e.target.closest("[data-st-next]")) return next();
  });
  // al cerrar la ficha, sigue la historia
  new MutationObserver(() => { if (st.classList.contains("is-open") && !$("#sheet").classList.contains("is-open") && sPaused) play(); })
    .observe($("#sheet"), { attributes: true, attributeFilter: ["class"] });

  function burst(el) {
    const r = el.getBoundingClientRect();
    for (let i = 0; i < 14; i++) {
      const s = document.createElement("i");
      s.className = "spark";
      s.textContent = ["✦", "★", "❄"][i % 3];
      s.style.left = r.left + r.width / 2 + "px"; s.style.top = r.top + r.height / 2 + "px";
      const a = (i / 14) * Math.PI * 2, d = 50 + Math.random() * 50;
      s.style.setProperty("--x", Math.cos(a) * d + "px"); s.style.setProperty("--y", Math.sin(a) * d + "px");
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 900);
    }
  }

  /* =========================================================
     TARJETA «AHORA»
     ========================================================= */
  const nowEl = document.createElement("button");
  nowEl.className = "now"; nowEl.hidden = true;
  document.body.appendChild(nowEl);
  const mins = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  function updateNow() {
    const today = T.todayISO();
    const d = DAYS.find((x) => x.date === today);
    if (!d) { nowEl.hidden = true; return; }
    const n = T.nowD(), hm = n.getHours() * 60 + n.getMinutes();
    const tl = d.timeline.filter((x) => /^\d\d:\d\d$/.test(x.t));
    let ci = -1;
    tl.forEach((x, i) => { if (mins(x.t) <= hm) ci = i; });
    const cur = tl[ci], nxt = tl[ci + 1];
    let pct = 0;
    if (cur && nxt) pct = (hm - mins(cur.t)) / (mins(nxt.t) - mins(cur.t));
    const inMin = nxt ? mins(nxt.t) - hm : 0;
    nowEl.style.setProperty("--acc", d.accent);
    nowEl.style.setProperty("--p", Math.max(0, Math.min(1, pct)));
    nowEl.dataset.day = d.id;
    nowEl.dataset.t = cur ? cur.t : nxt ? nxt.t : "";
    nowEl.innerHTML = `
      <span class="now__ring"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.5"/><circle class="p" cx="18" cy="18" r="15.5" pathLength="1"/></svg><b>${cur ? cur.t : "—"}</b></span>
      <span class="now__txt">
        <small>${cur ? "Ahora" : "Hoy empieza"} · ${d.city}</small>
        <strong>${cur ? (cur.must ? "★ " : "") + cur.h : nxt ? nxt.h : "Día libre"}</strong>
        <em>${nxt ? `Luego ${nxt.t} · ${nxt.h} · en ${inMin >= 60 ? Math.floor(inMin / 60) + " h " + (inMin % 60) + "′" : inMin + "′"}` : "Último plan del día"}</em>
      </span>`;
    nowEl.hidden = false;
  }
  nowEl.addEventListener("click", () => {
    const li = $(`#${nowEl.dataset.day} .tl li[data-t="${nowEl.dataset.t}"]`);
    if (!li) return;
    window.scrollTo({ top: li.getBoundingClientRect().top + scrollY - innerHeight * 0.35, behavior: "smooth" });
    li.classList.remove("flash"); void li.offsetWidth; li.classList.add("flash");
  });
  updateNow();
  setInterval(updateNow, 30000);

  /* ---------- entradas ---------- */
  document.addEventListener("click", (e) => {
    const m = e.target.closest("[data-open-map]");
    if (m) return openMap(m.dataset.openMap);
    const s = e.target.closest("[data-open-story]");
    if (s) return openStory(s.dataset.openStory);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (st.classList.contains("is-open")) closeStory();
    else if (mv.classList.contains("is-open")) closeMap();
  });
})();
