/* =========================================================
   Invierno en el Rin · interacción
   ========================================================= */
(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  // ?ahora=2026-12-08T16:10 simula una fecha/hora (para probar el modo viaje)
  const NOW_Q = new URLSearchParams(location.search).get("ahora");
  const NOW_OFFSET = NOW_Q && !isNaN(new Date(NOW_Q)) ? new Date(NOW_Q) - Date.now() : 0;
  const nowD = () => new Date(Date.now() + NOW_OFFSET);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const img = (k, big) => (IMG[k] ? (big ? IMG[k].l : IMG[k].s) : "");
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };
  const mapsSearch = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  const mapsWalk = (pts) => {
    const o = pts[0], d = pts[pts.length - 1], w = pts.slice(1, -1).join("|");
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(o)}&destination=${encodeURIComponent(d)}${w ? "&waypoints=" + encodeURIComponent(w) : ""}&travelmode=walking`;
  };

  const ICON = {
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    euro: '<svg viewBox="0 0 24 24"><path d="M17 6.5A7 7 0 1 0 17 17.5M4 10h9M4 14h9"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    arrow: '<svg class="ticket__arrow" viewBox="0 0 54 14"><path d="M1 7h50M45 1l6 6-6 6"/><circle cx="1.5" cy="7" r="1.5"/></svg>',
    chev: '<svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>',
    pin: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    walk: '<svg viewBox="0 0 24 24"><circle cx="13" cy="4" r="2"/><path d="m9 21 3-7 3 3v4M7 12l3-4 4 1 3 4M12 14l-2-3"/></svg>',
    bulb: '<svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3Z"/></svg>',
    ticket: '<svg viewBox="0 0 24 24"><path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4Z"/><path d="M10 6v12" stroke-dasharray="2 2"/></svg>',
    cash: '<svg viewBox="0 0 24 24"><rect x="3" y="6.5" width="18" height="11" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6.5 10v4M17.5 10v4"/></svg>',
    cup: '<svg viewBox="0 0 24 24"><path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5Z"/><path d="M16 10.5h1.5a2 2 0 0 1 0 4H16M8.5 3.5c0 1.5 1 1.5 1 3M12.5 3.5c0 1.5 1 1.5 1 3"/></svg>',
    weather: '<svg viewBox="0 0 24 24"><path d="M7 18h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6 11a3.5 3.5 0 0 0 1 7Z"/></svg>',
    beer: '<svg viewBox="0 0 24 24"><path d="M6 6.5h10V19a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z"/><path d="M16 9.5h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2M6 10.5h10M9 14v4M13 14v4"/></svg>',
    app: '<svg viewBox="0 0 24 24"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M11 18h2"/></svg>',
    plug: '<svg viewBox="0 0 24 24"><path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0ZM12 17v4"/></svg>',
    sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    rain: '<svg viewBox="0 0 24 24"><path d="M7 15h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6 8a3.5 3.5 0 0 0 1 7ZM8 18l-1 3M12 18l-1 3M16 18l-1 3"/></svg>',
    snow: '<svg viewBox="0 0 24 24"><path d="M12 2v20M4 7l16 10M20 7 4 17"/></svg>',
    home: '<svg viewBox="0 0 24 24"><path d="M4 11 12 4l8 7M6 9.5V20h12V9.5M10 20v-5h4v5"/></svg>',
    locate: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><circle cx="12" cy="12" r="7.5"/></svg>',
    moon: '<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>',
    mug: '<svg viewBox="0 0 24 24"><path d="M5 8h11v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z"/><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16"/></svg>',
    share: '<svg viewBox="0 0 24 24"><path d="M12 3v12M7 8l5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg>',
    umbrella: '<svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 0 1 18 0ZM12 12v7a2 2 0 0 0 4 0"/></svg>',
  };

  /* ---------------------------------------------------------
     MAPA ARTESANAL
     --------------------------------------------------------- */
  const LEGS = [
    { id: "fly1", day: 1, d: "M-30 140 C 20 70, 80 -12, 131 -52", flight: true },
    { id: "l1", day: 1, d: "M131 -52 C 160 -25, 195 10, 222 40 C 240 60, 258 72, 270 79" },
    { id: "l2", day: 2, d: "M270 79 C 292 100, 318 128, 322 150 C 325 165, 317 176, 311 181" },
    { id: "l3", day: 3, d: "M270 79 C 238 84, 208 92, 192 110 C 172 134, 150 180, 135 205 C 128 218, 122 230, 118 238" },
    { id: "l4", day: 4, d: "M270 79 C 258 72, 240 60, 222 40 C 195 10, 160 -25, 131 -52" },
    { id: "fly2", day: 4, d: "M131 -52 C 70 0, 10 95, -30 175", flight: true },
  ];
  const STEPS = [
    { n: "✦", kick: "Resumen", title: "Cuatro días entre dos ríos", text: "Base en Düsseldorf. Un día en Colonia siguiendo el Rin y otro en Aquisgrán, la ciudad de Carlomagno, junto a la frontera.", stats: [["4", "días"], ["3", "ciudades"], ["2", "catedrales UNESCO"], ["10+", "mercados"]], c: "#B08D57", on: [], view: [-10, -78, 380, 335] },
    { n: "08", kick: "Martes · Llegada", title: "Málaga → Weeze → Düsseldorf", text: "Aterrizaje 12:30 en Weeze. Bus SW1 + tren RE10 hasta Düsseldorf y 18 min a pie al apartamento.", stats: [["≈1 h 30", "hasta Düsseldorf"], ["SW1+RE10", "en D-Ticket"]], c: DAYS[0].accent, on: ["fly1", "l1"], nodes: ["nrn", "dus"], view: [70, -85, 240, 190] },
    { n: "09", kick: "Miércoles · Excursión", title: "Düsseldorf → Köln", text: "Regional por la orilla del Rin. Catedral, siete mercados y Kölsch.", stats: [["≈40 km", "distancia"], ["25–35′", "en RE"]], c: DAYS[1].accent, on: ["l2"], nodes: ["dus", "cgn"], view: [175, 30, 185, 180] },
    { n: "10", kick: "Jueves · Carlomagno", title: "Düsseldorf → Aquisgrán", text: "Tren regional (RE4 o RE1). Catedral, ayuntamiento y mercado, todo a pie desde la estación.", stats: [["≈80 km", "distancia"], ["≈1 h 25", "en tren"]], c: DAYS[2].accent, on: ["l3"], nodes: ["dus", "aac"], view: [30, 40, 290, 225] },
    { n: "11", kick: "Viernes · Vuelta", title: "Düsseldorf → Weeze → Málaga", text: "Desayuno y último paseo, salir del apartamento a las 10:50 y vuelo a Málaga a las 14:55.", stats: [["10:50", "salir"], ["14:55", "vuelo"]], c: DAYS[3].accent, on: ["l4", "fly2"], nodes: ["dus", "nrn"], view: [70, -85, 240, 190] },
  ];

  function buildMap() {
    const svg = $("#map");
    const N = MAP_NODES;
    const legColor = (l) => DAYS[l.day - 1].accent;
    let grid = "";
    for (let x = 0; x <= 360; x += 30) grid += `<line class="grid" x1="${x}" y1="-90" x2="${x}" y2="290"/>`;
    for (let y = -90; y <= 290; y += 30) grid += `<line class="grid" x1="0" y1="${y}" x2="360" y2="${y}"/>`;
    const towns = [
      ["Bonn", 341, 251], ["Venlo", 137, 30], ["Roermond", 95, 92], ["Maastricht", 31, 211], ["Duisburg", 268, 10],
    ];
    svg.innerHTML = `
      <defs>
        <radialGradient id="vign" cx="50%" cy="45%" r="70%"><stop offset="60%" style="stop-color:var(--paper)" stop-opacity="0"/><stop offset="100%" style="stop-color:var(--paper)" stop-opacity="1"/></radialGradient>
      </defs>
      ${grid}
      <path class="river" d="M350 290 C 345 265, 342 255, 338 245 C 330 225, 318 200, 314 182 C 310 165, 320 150, 316 140 C 312 128, 298 125, 292 118 C 284 108, 262 100, 265 88 C 268 76, 258 66, 260 52 C 262 38, 258 22, 264 0 C 268 -20, 255 -45, 240 -80"/>
      <path class="river river--thin" d="M0 285 C 12 262, 26 236, 30 212 C 33 190, 45 165, 65 140 C 82 118, 92 104, 96 92 C 104 70, 128 50, 136 30 C 140 18, 140 8, 142 0 C 140 -20, 120 -45, 98 -80"/>
      <text class="river-label" x="322" y="214" transform="rotate(68 322 214)">Rhein</text>
      <text class="river-label" x="50" y="164" transform="rotate(-55 50 164)">Maas</text>
      <path class="border" d="M92 -80 C 98 -58, 108 -36, 122 -20 C 136 -8, 148 -8, 150 0"/>
      <path class="border" d="M150 0 C 152 15, 151 25, 150 40 C 148 60, 146 80, 141 95 C 130 115, 90 130, 72 155 C 86 170, 116 172, 119 190 C 121 205, 110 225, 104 245"/>
      <path class="border" d="M104 245 C 80 249, 50 251, 36 251 C 24 240, 22 226, 24 214 C 28 196, 44 172, 60 150 C 40 140, 20 130, 0 125"/>
      <path class="border" d="M104 245 C 112 262, 120 276, 126 290"/>
      <text class="country" x="20" y="70">NEDERLAND</text>
      <text class="country" x="176" y="146">DEUTSCHLAND</text>
      <text class="country" x="40" y="282">BELGIË</text>
      ${towns.map(([n, x, y]) => `<circle class="town" cx="${x}" cy="${y}" r="1.6"/><text class="town-label" x="${x + 4}" y="${y + 2.5}">${n}</text>`).join("")}
      <rect x="0" y="-90" width="360" height="380" fill="url(#vign)"/>
      ${LEGS.map((l) => `<path class="leg ${l.flight ? "leg--flight" : ""}" data-leg="${l.id}" pathLength="1" d="${l.d}" stroke="${legColor(l)}" ${l.flight ? 'stroke-dasharray="0.012 0.012"' : ""}/>`).join("")}
      ${["nrn", "dus", "cgn", "aac"].map((k) => {
        const p = N[k];
        const anchor = k === "aac" || k === "nrn" ? "start" : "end";
        const dx = k === "aac" || k === "nrn" ? 9 : -9;
        const dy = 4;
        return `<g class="node" data-node="${k}"><circle class="halo" cx="${p.x}" cy="${p.y}" r="5"/><circle class="core" cx="${p.x}" cy="${p.y}" r="${k === "nrn" ? 3 : 4}"/><text x="${p.x + dx}" y="${p.y + dy}" text-anchor="${anchor}">${p.label}</text></g>`;
      }).join("")}
    `;
    // los vuelos tienen trazo discontinuo: animamos su opacidad en lugar del dash
    $$(".leg--flight", svg).forEach((p) => { p.style.strokeDashoffset = "0"; });

    const steps = $("#routeSteps");
    const cards = $("#routeCards");
    cards.innerHTML = STEPS.map((s, i) => `
        <div class="step__card" data-card="${i}" style="--c:${s.c}">
          <div class="step__top"><span class="step__num">${s.n}</span><span class="step__kick">${s.kick}</span><span class="step__count">${i + 1}/${STEPS.length}</span></div>
          <h3 class="step__title">${s.title}</h3>
          <p class="step__text">${s.text}</p>
          <div class="step__stats">${s.stats.map(([b, t]) => `<div><b>${b}</b><span>${t}</span></div>`).join("")}</div>
        </div>`).join("");
    steps.innerHTML = STEPS.map((_, i) => `<div class="step" data-step="${i}"></div>`).join("");

    let vb = [-10, -78, 380, 335], vbAnim = null;
    const camera = (to) => {
      const from = vb.slice(), t0 = performance.now(), dur = 950;
      cancelAnimationFrame(vbAnim);
      const ease = (t) => 1 - Math.pow(1 - t, 3);
      const tick = (now) => {
        const k = ease(Math.min(1, (now - t0) / dur));
        vb = from.map((f, n) => f + (to[n] - f) * k);
        svg.setAttribute("viewBox", vb.map((x) => x.toFixed(1)).join(" "));
        if (k < 1) vbAnim = requestAnimationFrame(tick);
      };
      vbAnim = requestAnimationFrame(tick);
    };
    const setStep = (i) => {
      if (STEPS[i].view) camera(STEPS[i].view);
      $$(".step__card", cards).forEach((el, j) => {
        el.classList.toggle("is-on", j === i);
        el.classList.toggle("is-past", j < i);
      });
      const s = STEPS[i];
      LEGS.forEach((l) => {
        const p = $(`[data-leg="${l.id}"]`, svg);
        const on = i === 0 || s.on.includes(l.id);
        const drawn = i > 0 && l.day < i;
        p.classList.toggle("is-on", on);
        p.classList.toggle("is-drawn", drawn && !on);
      });
      $$(".node", svg).forEach((n) => n.classList.toggle("is-on", (s.nodes || []).includes(n.dataset.node)));
    };
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) setStep(+e.target.dataset.step); });
    }, { rootMargin: "-50% 0px -49% 0px" });
    $$(".step", steps).forEach((s) => io.observe(s));
    setStep(0);
  }

  /* ---------------------------------------------------------
     DÍAS
     --------------------------------------------------------- */
  /* ---------------------------------------------------------
     DISTANCIAS (línea recta × 1,3 ≈ recorrido real a pie, 80 m/min)
     --------------------------------------------------------- */
  const POI_DAY = {};
  function dist(a, b) {
    if (a === b) return 0;
    const w = WALK[a + "|" + b] ?? WALK[b + "|" + a];
    if (w != null) return w;
    const A = GEO[a], B = GEO[b];
    if (!A || !B) return null;
    const r = (x) => (x * Math.PI) / 180;
    const h = Math.sin(r(B[0] - A[0]) / 2) ** 2 + Math.cos(r(A[0])) * Math.cos(r(B[0])) * Math.sin(r(B[1] - A[1]) / 2) ** 2;
    return 2 * 6371000 * Math.asin(Math.sqrt(h)) * 1.3;
  }
  const fmtM = (m) => (m < 950 ? `${Math.max(50, Math.round(m / 50) * 50)} m` : `${(m / 1000).toFixed(1).replace(".", ",")} km`);
  const walkMin = (m) => Math.max(1, Math.round(m / 80));
  function hop(a, b) {
    const m = dist(a, b);
    if (m == null) return null;
    if (m < 40) return { m: 0, min: 0, same: true, label: "mismo sitio", short: "aquí mismo" };
    const far = m > 3000;
    const min = walkMin(m);
    return { m, min, far, label: far ? `${fmtM(m)} · mejor en transporte` : `${fmtM(m)} · ${min}′ a pie`, short: far ? `${fmtM(m)} · transporte` : `${min}′ · ${fmtM(m)}` };
  }
  function dayPlaces(d) {
    const seenAt = new Set(), out = [];
    const add = (name, at, kind) => { if (at && GEO[at] && !seenAt.has(at)) { seenAt.add(at); out.push({ name, at, kind }); } };
    add(BASE_NAME[d.base] ? BASE_NAME[d.base][0].toUpperCase() + BASE_NAME[d.base].slice(1) : "Estación", d.base, "base");
    [...d.xmas, ...d.always, ...(d.gems || [])].forEach((p) => add(p.name, p.at, "poi"));
    (d.markets ? d.markets.list : []).forEach((m) => add(m.name, m.at, "market"));
    d.food.forEach((f) => add(f.name, f.at, "food"));
    return out;
  }

  const seen = new Set(store.get("seen", []));
  let ME = null;                       // [lat, lng] cuando se activa la ubicación
  let NEAR = false;                    // ordenar por cercanía
  const MUGS = store.get("mugs", {});
  let mode = store.get("mode2", "must");
  const POI_INDEX = {};

  function poiCard(p, i) {
    POI_INDEX[p.id] = p;
    const d = POI_DAY[p.id];
    const h = d && hop(d.base, p.at);
    const hm = ME && hop("me", p.at);
    const from = hm ? `<div class="poi__from is-me">${ICON.locate}<span>${hm.short} de ti</span></div>`
      : h ? `<div class="poi__from">${d.base === "dus-hotel" ? ICON.home : ICON.walk}<span>${h.same ? "Aquí mismo" : h.short + " desde " + BASE_NAME[d.base]}</span></div>` : "";
    return `
      <button class="poi ${p.must ? "is-must" : "is-opt"}" data-poi="${p.id}" style="--i:${i}">
        <img src="${img(p.img)}" alt="${p.name}" loading="lazy" decoding="async">
        <div class="poi__top"><span class="chip">${p.tag}</span>${p.must ? "" : '<span class="opt-badge">Si sobra tiempo</span>'}</div>
        <div class="poi__body">
          <h4>${p.name}</h4>
          <p>${p.short}</p>
          <div class="poi__meta"><span>${ICON.clock}${p.time}</span><span>${ICON.euro}${p.price}</span></div>
          ${from}
        </div>
      </button>`;
  }

  function priceTag(p) {
    const n = p.length;
    return "€".repeat(n) + `<i>${"€".repeat(3 - n)}</i>`;
  }

  function splitWords(text) {
    return text.split(" ").map((w, i) => `<span class="w"><span style="--i:${i}">${w}</span></span>`).join(" ");
  }

  function buildDays() {
    const root = $("#days");
    DAYS.forEach((d) => [...d.xmas, ...d.always, ...(d.gems || [])].forEach((p) => { POI_DAY[p.id] = POI_DAY[p.id] || d; POI_INDEX[p.id] = p; }));
    DAYS.forEach((d) => [...d.xmas, ...d.always, ...(d.gems || [])].forEach((p) => { POI_DAY[p.id] = d; POI_INDEX[p.id] = p; }));
    root.innerHTML = DAYS.map((d, di) => {
      let walkTotal = 0;
      const walkStops = d.walk ? d.walk.stops.map((st, i) => {
        if (i === 0) return { ...st, lbl: "inicio" };
        if (st.tram) return { ...st, lbl: "tranvía", sub: st.tram };
        const h = hop(d.walk.stops[i - 1].at, st.at);
        if (h) walkTotal += h.m;
        return { ...st, lbl: h ? `+${h.min}′` : st.m, sub: h && !h.same ? fmtM(h.m) : "" };
      }) : [];
      const walk = d.walk ? `
        <div class="block">
          <div class="block__head" data-reveal><h3>Ruta <em>a pie</em></h3><span class="eyebrow">${ICON.walk ? "" : ""}Paso a paso</span></div>
          <div class="walk" data-reveal data-walk style="--accent-line:${lighten(d.accent)}">
            <div class="walk__head">
              <span class="eyebrow" style="opacity:.6">${d.city}</span>
              <h4>${d.walk.title}</h4>
              <p>≈ ${fmtM(walkTotal)} · ${walkMin(walkTotal)} min andando sin paradas</p>
            </div>
            <ol>${walkStops.map((s, i) => `<li style="--i:${i}"><span class="walk__dot"></span><span class="walk__name">${s.n}${s.sub ? `<small>${s.sub}</small>` : ""}</span><span class="walk__min">${s.lbl}</span></li>`).join("")}</ol>
            <a class="btn btn--light" href="${mapsWalk(d.walk.gmaps)}" target="_blank" rel="noopener">${ICON.pin}Abrir ruta en Google Maps</a>
          </div>
        </div>` : "";

      return `
      <section class="day" id="${d.id}" data-nav="${d.id}" style="--acc-l:${d.accent};--soft-l:${d.accentSoft};--acc-d:${mix(d.accent, "#FFFFFF", 0.38)};--soft-d:${mix(d.accent, "#0E1015", 0.72)}">
        <header class="day-hero">
          <div class="day-hero__img" style="background-image:url('${img(d.hero, true)}')" role="img" aria-label="${d.heroAlt}"></div>
          <span class="day-hero__num" aria-hidden="true">${d.num}</span>
          <div class="day-hero__body">
            <div class="day-hero__kick"><span class="chip">${d.kicker}</span><span class="eyebrow">${d.weekday} ${+d.num} dic</span></div>
            <h2 class="day-hero__title split">${splitWords(d.title)}</h2>
            <p class="day-hero__sub" data-reveal style="--d:3">${d.subtitle}</p>
            <div class="day-hero__wx" data-wx="${d.date}" data-city="${d.cityKey}">${ICON.weather}<span>Media dic.: 1–7 °C</span></div>
          </div>
        </header>

        <p class="day__intro" data-reveal>${d.intro}</p>
        ${mustBlock(d)}
        ${d.walk || d.markets ? `
        <div class="xp" data-reveal>
          <button class="xp__tile xp__tile--map" data-open-map="${d.id}">
            <span class="xp__map" style="background-image:url('${img(d.hero)}')"></span>
            <span class="xp__shade"></span>
            <span class="xp__ico">${ICON.pin}</span>
            <span class="xp__txt"><b>Mapa del día</b><small>Ruta por calles, mercados y tú</small></span>
          </button>
          <button class="xp__tile xp__tile--story" data-open-story="${d.id}">
            <span class="xp__stack">${mustItems(d).filter((x) => x.poi).slice(0, 3).map((x, k) => `<i style="--k:${k};background-image:url('${img(POI_INDEX[x.poi].img)}')"></i>`).join("")}</span>
            <span class="xp__ico xp__ico--play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7Z"/></svg></span>
            <span class="xp__txt"><b>Modo paseo</b><small>${mustItems(d).length} imprescindibles, uno a uno</small></span>
          </button>
        </div>` : ""}
        ${hotelStrip(d)}
        ${rainBlock(d)}

        <div class="block">
          <div class="block__head" data-reveal><h3>El <em>plan</em></h3><span class="eyebrow">${d.weekday}</span></div>
          <ol class="tl" data-date="${d.date}">
            <span class="tl__fill" aria-hidden="true"></span>
            ${d.timeline.map((t, i) => `
              <li data-reveal style="--d:${Math.min(i, 3)}" data-t="${t.t}" class="${t.tag === "transit" ? "is-transit" : ""} ${t.must ? "is-must" : ""}">
                <span class="tl__time">${t.t}</span>
                <h4 class="tl__h">${t.h}</h4>
                <p class="tl__d">${t.d}</p>
              </li>`).join("")}
          </ol>
        </div>

        <div class="block">
          <div class="block__head" data-reveal><h3>Cómo <em>llegar</em></h3><span class="eyebrow">Transporte</span></div>
          <div class="tickets">
            ${d.transit.map((tr, i) => `
              <article class="ticket" data-reveal style="--d:${i}">
                <div class="ticket__main">
                  <div class="ticket__route">
                    <div><small>Desde</small><b>${tr.from}</b></div>
                    ${ICON.arrow}
                    <div class="to"><small>Hasta</small><b>${tr.to}</b></div>
                  </div>
                  <div class="ticket__lines">${tr.lines.map((l) => `<span class="line" style="background:${l.c}">${l.n}</span>`).join("")}</div>
                </div>
                <div class="ticket__perf"></div>
                <div class="ticket__stats">
                  <div><small>Tiempo</small><b>${tr.time}</b></div>
                  <div><small>Precio</small><b>${tr.price}</b></div>
                  <div><small>Frecuencia</small><b>${tr.freq}</b></div>
                </div>
                <details>
                  <summary>Paso a paso ${ICON.chev}</summary>
                  <ol>${tr.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
                  <p class="ticket__alt">${tr.alt}</p>
                </details>
              </article>`).join("")}
          </div>
        </div>

        <div class="block">
          <div class="block__head" data-reveal><h3>Qué <em>ver</em></h3><button class="near-btn ${NEAR ? "is-on" : ""}" data-near>${ICON.locate}<span>Cerca de mí</span></button></div>
          <div class="seg" data-reveal data-seg data-mode="${mode}">
            <span class="seg__pill"></span>
            <button data-m="must" class="${mode === "must" ? "is-on" : ""}">★ Lo nuestro</button>
            <button data-m="extra" class="${mode === "extra" ? "is-on" : ""}">+ Si sobra tiempo</button>
          </div>
          <div class="rail" data-rail="${di}"></div>
          <div class="rail__hint"><span>Toca una tarjeta para ver la ficha</span><span class="dots" data-dots="${di}"></span></div>
        </div>

        ${factsBlock(d)}
        ${marketsBlock(d, di)}

        <div class="block">
          <div class="block__head" data-reveal><h3>Dónde <em>comer</em></h3><span class="eyebrow">€ · €€</span></div>
          <div class="food">
            ${d.food.map((f, i) => `
              <a class="food__item" data-reveal style="--d:${i % 2}" href="${mapsSearch(f.q)}" target="_blank" rel="noopener">
                <div class="food__img"><img src="${img(f.img)}" alt="${f.name}" loading="lazy" decoding="async"><span class="food__price">${priceTag(f.price)}</span></div>
                <div class="food__txt">
                  <span class="food__type">${f.type}</span>
                  <h4>${f.name}</h4>
                  <p>${f.what}</p>
                  <p class="note">${f.note}</p>
                </div>
              </a>`).join("")}
          </div>
        </div>

        ${distBlock(d, di)}
        ${walk}
        <div class="day__end"></div>
      </section>`;
    }).join("");

    renderRails();
  }

  /* ---------- mercados: mini-mapa + horarios + distancias ---------- */
  function miniMap(points, base, accent) {
    const all = [...points, base].filter((x) => x && GEO[x.at]);
    if (!all.length) return "";
    const lat = all.map((x) => GEO[x.at][0]), lon = all.map((x) => GEO[x.at][1]);
    const k = Math.cos((lat[0] * Math.PI) / 180);
    let x0 = Math.min(...lon) * k, x1 = Math.max(...lon) * k, y0 = Math.min(...lat), y1 = Math.max(...lat);
    const W = 340, H = 230, pad = 30;
    const span = Math.max(x1 - x0, (y1 - y0) * (W / H), 0.004);
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    const sc = (W - pad * 2) / span;
    const P = (at) => [W / 2 + (GEO[at][1] * k - cx) * sc, H / 2 - (GEO[at][0] - cy) * sc];
    const uniq = [];
    points.forEach((m) => { if (!uniq.find((u) => u.at === m.at)) uniq.push(m); });
    let path = "", labels = "";
    const chain = [base, ...uniq];
    chain.forEach((m, i) => {
      const [x, y] = P(m.at);
      path += (i ? " L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
      if (i) {
        const [px, py] = P(chain[i - 1].at);
        const h = hop(chain[i - 1].at, m.at);
        if (h && !h.same && Math.hypot(x - px, y - py) > 46) labels += `<g class="mm__lbl" transform="translate(${((x + px) / 2).toFixed(1)} ${((y + py) / 2).toFixed(1)})"><rect x="-15" y="-8" width="30" height="16" rx="8"/><text y="3.5">${h.min}′</text></g>`;
      }
    });
    const dots = uniq.map((m, i) => { const [x, y] = P(m.at); return `<g class="mm__dot"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="10"/><text x="${x.toFixed(1)}" y="${(y + 3.8).toFixed(1)}">${i + 1}</text></g>`; }).join("");
    const [bx, by] = P(base.at);
    return `<svg class="mm" viewBox="0 0 ${W} ${H}" style="--c:${accent}">
      <path class="mm__path" d="${path}" pathLength="1"/>
      <g class="mm__base"><rect x="${(bx - 7).toFixed(1)}" y="${(by - 7).toFixed(1)}" width="14" height="14" rx="3"/><text x="${(bx > W / 2 ? bx - 12 : bx + 12).toFixed(1)}" y="${(by + 3.5).toFixed(1)}" text-anchor="${bx > W / 2 ? "end" : "start"}">${base.name}</text></g>
      ${labels}${dots}
    </svg>`;
  }

  function marketsBlock(d, di) {
    if (!d.markets) return "";
    const L = d.markets.list;
    const uniqAt = [];
    L.forEach((m) => { if (!uniqAt.includes(m.at)) uniqAt.push(m.at); });
    const num = (m) => uniqAt.indexOf(m.at) + 1;
    const base = { at: d.base, name: BASE_NAME[d.base] };
    const first = hop(d.base, L[0].at);
    const items = L.map((m, i) => {
      const h = i ? hop(L[i - 1].at, m.at) : null;
      const conn = i ? `<li class="mk__hop">${ICON.walk}<span>${h && !h.same ? h.label : "en el mismo sitio"}</span></li>` : "";
      return `${conn}
        <li class="mk__item" data-reveal data-open="${m.open.join(",")}" data-date="${d.date}">
          <span class="mk__n">${num(m)}</span>
          <div class="mk__txt">
            <h4>${m.name}</h4>
            <p class="mk__h">${ICON.clock}<span>${m.hours}</span></p>
            ${m.tip ? `<p class="mk__tip">${m.tip}</p>` : ""}
            <span class="mk__status"></span>
          </div>
          <a class="mk__go" href="${mapsSearch(m.name + " " + d.city)}" target="_blank" rel="noopener" aria-label="Abrir en Google Maps">${ICON.pin}</a>
        </li>`;
    }).join("");
    return `
        <div class="block">
          <div class="block__head" data-reveal><h3>Mercados <em>navideños</em></h3><span class="eyebrow">Horarios · a pie</span></div>
          <p class="mk__note" data-reveal>${d.markets.note}</p>
          <div class="mk__map" data-reveal>${miniMap(L, base, d.accent)}</div>
          <ol class="mk">
            <li class="mk__hop mk__hop--start">${ICON.walk}<span>Desde ${BASE_NAME[d.base]}: ${first ? first.label : ""}</span></li>
            ${items}
          </ol>
        </div>`;
  }

  /* ---------- explorador de distancias ---------- */
  function distBlock(d, di) {
    const places = dayPlaces(d).filter((x) => x.kind !== "food");
    return `
        <div class="block">
          <div class="block__head" data-reveal><h3>Distancias <em>a pie</em></h3><span class="eyebrow">Elige origen</span></div>
          <div class="dx" data-dx="${di}" data-reveal>
            <div class="dx__chips"><button data-from="me" class="dx__me" ${ME ? "" : "hidden"}>${ICON.locate} Tú</button>${places.map((x, i) => `<button data-from="${x.at}" class="${i === 0 ? "is-on" : ""}">${x.name}</button>`).join("")}</div>
            <ul class="dx__list"></ul>
          </div>
        </div>`;
  }
  function renderDx(box, fromAt) {
    const d = DAYS[+box.dataset.dx];
    const rows = dayPlaces(d).filter((x) => x.at !== fromAt).map((x) => ({ ...x, h: hop(fromAt, x.at) })).filter((x) => x.h).sort((a, b) => a.h.m - b.h.m);
    const max = Math.min(Math.max(...rows.filter((r) => !r.h.far).map((r) => r.h.m), 800), 3000);
    $(".dx__list", box).innerHTML = rows.map((r, i) => `
      <li style="--i:${i}" class="${r.h.far ? "is-far" : ""}">
        <div class="dx__row"><span class="dx__name">${r.name}${r.kind === "food" ? ' <i>comer</i>' : r.kind === "market" ? ' <i>mercado</i>' : ""}</span><b>${r.h.far ? fmtM(r.h.m) : r.h.min + "′"}</b></div>
        <div class="dx__bar"><span style="--w:${Math.min(1, r.h.m / max).toFixed(3)}"></span></div>
        <small>${r.h.far ? "Mejor en bus/U-Bahn" : fmtM(r.h.m) + " a pie"}</small>
      </li>`).join("");
  }
  function bindDx() {
    $$("[data-dx]").forEach((box) => renderDx(box, $("button.is-on", box).dataset.from));
    document.addEventListener("click", (e) => {
      const b = e.target.closest(".dx__chips button");
      if (!b) return;
      const box = b.closest("[data-dx]");
      $$("button", box).forEach((x) => x.classList.toggle("is-on", x === b));
      renderDx(box, b.dataset.from);
    });
  }

  function marketStatus() {
    const t = todayISO();
    const now = nowD();
    const h = now.getHours() + now.getMinutes() / 60;
    $$(".mk__item").forEach((li) => {
      const [o, c] = li.dataset.open.split(",").map(Number);
      const st = $(".mk__status", li);
      const pad = (x) => (x >= 24 ? "00" : String(x).padStart(2, "0")) + ":00";
      if (li.dataset.date !== t) { st.className = "mk__status"; st.textContent = ""; return; }
      if (h < o) { st.className = "mk__status is-soon"; st.textContent = `Abre a las ${pad(o)}`; }
      else if (h < c) { st.className = "mk__status is-open"; st.textContent = `Abierto ahora · cierra ${pad(c)}`; }
      else { st.className = "mk__status is-closed"; st.textContent = "Cerrado por hoy"; }
    });
  }

  /* ---------- imprescindibles del día ---------- */
  function mustItems(d) {
    const out = [], ats = new Set();
    [...d.xmas, ...d.always, ...(d.gems || [])].filter((p) => p.must).forEach((p) => { out.push({ key: p.id, name: p.name, kind: p.tag, poi: p.id, at: p.at, img: p.img }); ats.add(p.at); });
    (d.markets ? d.markets.list : []).forEach((m) => { if (!ats.has(m.at)) { out.push({ key: `mk:${d.id}:${m.name}`, name: m.name, kind: "Mercado", at: m.at, img: d.xmas[0] ? d.xmas[0].img : d.hero }); ats.add(m.at); } });
    if (d.mustOrder) out.sort((a, b) => ((d.mustOrder.indexOf(a.key) + 1) || 99) - ((d.mustOrder.indexOf(b.key) + 1) || 99));
    return out;
  }
  function mustBlock(d) {
    const L = mustItems(d);
    if (!L.length) return "";
    let tot = 0;
    const items = L.map((x, i) => {
      const h = i ? hop(L[i - 1].at, x.at) : null;
      if (h && !h.far) tot += h.m;
      const hopHTML = i ? `<span class="tv__hop"><i></i><b>${h ? (h.same ? "aquí" : h.far ? "bus" : h.min + "′") : ""}</b></span>` : "";
      return `${hopHTML}
            <button class="tv" ${x.poi ? `data-poi="${x.poi}"` : ""} style="--i:${i}">
              <span class="tv__img" style="background-image:url('${img(x.img)}')"><b>${i + 1}</b></span>
              <strong>${x.name}</strong><small>${x.kind}</small>
            </button>`;
    }).join("");
    const nMk = L.filter((x) => x.kind === "Mercado").length + (d.markets ? 0 : 0);
    return `
        <div class="today" data-reveal>
          <div class="today__head">
            <div><span class="eyebrow">Hoy veréis</span><h3>${L.length} paradas</h3></div>
            <p>≈ ${fmtM(tot)} andando<br>${d.markets ? d.markets.list.length + " mercados" : ""}</p>
          </div>
          <div class="today__rail">${items}</div>
        </div>`;
  }
  function refreshMust() {}
  function bindMust() {}

  /* ---------- en cifras ---------- */
  function factsBlock(d) {
    if (!d.facts) return "";
    return `
        <div class="block">
          <div class="block__head" data-reveal><h3>En <em>cifras</em></h3><span class="eyebrow">Datos y precios</span></div>
          <div class="facts">${d.facts.map((f, i) => `
            <div class="fact" data-reveal style="--d:${i % 3}">
              <b><span class="fact__pre">${f.pre || ""}</span><span data-count="${f.n}">0</span>${f.u ? `<small>${f.u}</small>` : ""}</b>
              <p>${f.t}</p>
            </div>`).join("")}</div>
          ${d.prices ? `
          <div class="board" data-reveal>
            <div class="board__head"><span>Lo que cuesta</span><small>precios orientativos 2026</small></div>
            <ul>${d.prices.map(([k, v], i) => `<li style="--i:${i}"><span>${k}</span><i></i><b>${v}</b></li>`).join("")}</ul>
          </div>` : ""}
        </div>`;
  }
  function countUp() {
    const fmt = (v, dec) => {
      const [i, f] = v.toFixed(dec).split(".");
      return i.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (f ? "," + f : "");
    };
    const io = new IntersectionObserver((ents) => ents.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const el = e.target, n = parseFloat(el.dataset.count), dec = (String(n).split(".")[1] || "").length;
      const yr = n >= 1900 && n <= 2100 && Number.isInteger(n);   // años: sin separador
      const t0 = performance.now(), dur = 1400;
      const step = (now) => {
        const k = Math.min(1, (now - t0) / dur), e2 = 1 - Math.pow(1 - k, 4);
        const v = n * e2;
        el.textContent = yr ? String(Math.round(v)) : fmt(dec ? v : Math.round(v), dec);
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }), { threshold: 0.4 });
    $$("[data-count]").forEach((el) => io.observe(el));
  }

  /* ---------- apartamento ---------- */
  const hotelDir = (mode = "walking") => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(HOTEL.address)}&travelmode=${mode}`;
  function hotelStrip(d) {
    const inDus = d.cityKey === "dus";
    const sub = inDus
      ? `${HOTEL.address} · ${fmtM(dist("dus-hotel", "dus-hbf"))} del Hbf`
      : `Tren a Düsseldorf Hbf y ${walkMin(dist("dus-hotel", "dus-hbf"))}′ a pie hasta ${HOTEL.address.split(",")[0]}`;
    return `
        <a class="hotel" data-reveal href="${hotelDir(inDus ? "walking" : "transit")}" target="_blank" rel="noopener">
          <span class="hotel__ico">${ICON.home}</span>
          <span class="hotel__txt"><small>Volver al apartamento</small><b>${HOTEL.name}</b><em>${sub}</em></span>
          <span class="hotel__go">${ICON.pin}</span>
        </a>`;
  }

  /* ---------- plan si llueve ---------- */
  function rainBlock(d) {
    if (!d.rainPlan) return "";
    const items = d.rainPlan.map((id) => POI_INDEX[id]).filter(Boolean);
    return `
        <details class="rain" data-rain="${d.date}" data-reveal>
          <summary>${ICON.umbrella}<span class="rain__t">Plan B si llueve</span><span class="rain__badge"></span>${ICON.chev}</summary>
          <p>Todo bajo techo y cerca de la ruta del día:</p>
          <div class="rain__chips">${items.map((p) => `<button data-poi="${p.id}">${p.name}</button>`).join("")}</div>
        </details>`;
  }
  function markRain(data) {
    $$("[data-rain]").forEach((el) => {
      const d = DAYS.find((x) => x.date === el.dataset.rain);
      const dly = data[d.cityKey];
      if (!dly) return;
      const i = dly.time.indexOf(d.date);
      if (i < 0) return;
      const p = dly.precipitation_probability_max ? dly.precipitation_probability_max[i] : 0;
      const c = dly.weather_code[i];
      const wet = p >= 50 || (c >= 51 && c <= 67) || (c >= 80 && c <= 82) || c >= 95;
      el.classList.toggle("is-wet", wet);
      if (wet) {
        el.open = true;
        $(".rain__badge", el).textContent = `Previsión: ${p}% de lluvia`;
      }
    });
  }

  function mix(hex, hex2, t) {
    const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    const A = p(hex), B = p(hex2);
    return "#" + A.map((c, i) => Math.round(c + (B[i] - c) * t).toString(16).padStart(2, "0")).join("");
  }

  function lighten(hex) {
    const n = parseInt(hex.slice(1), 16);
    const r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    const m = (c) => Math.round(c + (255 - c) * 0.45);
    return `rgb(${m(r)},${m(g)},${m(b)})`;
  }

  function renderRails() {
    DAYS.forEach((d, di) => {
      const rail = $(`[data-rail="${di}"]`);
      const pool = [...d.xmas, ...d.always, ...(d.gems || [])];
      const musts = pool.filter((p) => p.must), extras = pool.filter((p) => !p.must);
      if (d.mustOrder) musts.sort((x, y) => ((d.mustOrder.indexOf(x.id) + 1) || 99) - ((d.mustOrder.indexOf(y.id) + 1) || 99));
      let items = mode === "extra" ? (extras.length ? extras : musts) : (musts.length ? musts : extras);
      items.forEach((p) => (POI_DAY[p.id] = d));
      if (NEAR && ME) items = [...items].sort((a, b) => (dist("me", a.at) ?? 1e9) - (dist("me", b.at) ?? 1e9));

      rail.innerHTML = items.map(poiCard).join("");
      rail.scrollLeft = 0;
      const dots = $(`[data-dots="${di}"]`);
      dots.innerHTML = items.map((_, i) => `<i class="${i === 0 ? "is-on" : ""}"></i>`).join("");
    });
    // también indexamos los de la otra pestaña para la ficha
    DAYS.forEach((d) => [...d.xmas, ...d.always, ...(d.gems || [])].forEach((p) => (POI_INDEX[p.id] = p)));
  }

  function bindRails() {
    $$("[data-rail]").forEach((rail) => {
      let raf;
      rail.addEventListener("scroll", () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const cards = rail.children;
          if (!cards.length) return;
          const w = cards[0].getBoundingClientRect().width + 12;
          const mid = rail.scrollLeft + rail.clientWidth / 2;
          for (const c of cards) {
            const im = c.firstElementChild;
            if (!im) continue;
            const off = (c.offsetLeft + c.offsetWidth / 2 - mid) / rail.clientWidth;
            im.style.transform = `translate3d(${(off * -12).toFixed(2)}%, 0, 0) scale(1.22)`;
          }
          const i = clamp(Math.round(rail.scrollLeft / w), 0, cards.length - 1);
          $$("i", $(`[data-dots="${rail.dataset.rail}"]`)).forEach((d, j) => d.classList.toggle("is-on", j === i));
        });
      }, { passive: true });
    });

    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-seg] button");
      if (b) {
        mode = b.dataset.m;
        store.set("mode2", mode);
        $$("[data-seg]").forEach((s) => {
          s.dataset.mode = mode;
          $$("button", s).forEach((x) => x.classList.toggle("is-on", x.dataset.m === mode));
        });
        renderRails();
        $$("[data-rail]").forEach((r) => r.dispatchEvent(new Event("scroll")));
        return;
      }
      const card = e.target.closest("[data-poi]");
      if (card) openSheet(card.dataset.poi, card.closest(".day"));
    });
  }

  /* ---------------------------------------------------------
     FICHA
     --------------------------------------------------------- */
  const sheet = $("#sheet");
  let sheetId = null;

  function openSheet(id, daySec) {
    const p = POI_INDEX[id];
    if (!p) return;
    sheetId = id;
    const cs = getComputedStyle(daySec || document.body);
    sheet.style.setProperty("--accent", cs.getPropertyValue("--accent"));
    sheet.style.setProperty("--accent-soft", cs.getPropertyValue("--accent-soft"));
    $("#sheetImg").src = img(p.img, true);
    $("#sheetImg").alt = p.name;
    $("#sheetTag").textContent = p.tag;
    $("#sheetTitle").textContent = p.name;
    $("#sheetDesc").textContent = p.desc;
    $("#sheetFacts").innerHTML = `<div><small>Tiempo</small><b>${p.time}</b></div><div><small>Precio</small><b>${p.price}</b></div>`;
    $("#sheetTip").innerHTML = `${ICON.bulb}<span>${p.tip}</span>`;
    const dd = POI_DAY[id];
    const near = dd ? dayPlaces(dd).filter((x) => x.at !== p.at).map((x) => ({ ...x, h: hop(p.at, x.at) })).filter((x) => x.h).sort((a, b) => a.h.m - b.h.m).slice(0, 7) : [];
    const meH = ME && hop("me", p.at);
    $("#sheetNear").innerHTML = (meH ? `<div class="near-me">${ICON.locate}<span>Desde donde estás: <b>${meH.label}</b></span></div>` : "") +
      (near.length ? `<h4>Distancias desde aquí</h4><ul>${near.map((x) => `<li><span>${x.name}</span><b>${x.h.short}</b></li>`).join("")}</ul>` : "");
    $("#sheetMaps").href = mapsSearch(p.q);
    updateSeenBtn();
    $(".sheet__scroll").scrollTop = 0;
    sheet.style.setProperty("--drag", "0px");
    sheet.classList.add("is-open");
    sheet.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("lock");
  }
  function closeSheet() {
    sheet.classList.remove("is-open");
    sheet.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("lock");
    sheetId = null;
  }
  function updateSeenBtn() {
    const on = seen.has(sheetId);
    const b = $("#sheetSeen");
    b.classList.toggle("is-on", on);
    $("span", b).textContent = on ? "Visto ✓" : "Marcar como visto";
  }
  function bindSheet() {
    sheet.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeSheet(); });
    $("#sheetSeen").addEventListener("click", () => {
      if (!sheetId) return;
      seen.has(sheetId) ? seen.delete(sheetId) : seen.add(sheetId);
      store.set("seen", [...seen]);
      updateSeenBtn();
      $$(`[data-poi="${sheetId}"]`).forEach((c) => c.classList.toggle("is-seen", seen.has(sheetId)));
      refreshMust();
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSheet(); });

    // arrastrar para cerrar
    const scroller = $(".sheet__scroll");
    let y0 = null, dy = 0;
    const start = (e) => {
      if (scroller.scrollTop > 0 && !e.target.closest("[data-grab]")) return;
      y0 = e.touches[0].clientY; dy = 0;
    };
    const move = (e) => {
      if (y0 == null) return;
      dy = e.touches[0].clientY - y0;
      if (dy <= 0) { sheet.classList.remove("is-dragging"); sheet.style.setProperty("--drag", "0px"); return; }
      if (e.cancelable) e.preventDefault();
      sheet.classList.add("is-dragging");
      sheet.style.setProperty("--drag", `${dy}px`);
    };
    const end = () => {
      if (y0 == null) return;
      sheet.classList.remove("is-dragging");
      if (dy > 110) closeSheet(); else sheet.style.setProperty("--drag", "0px");
      y0 = null;
    };
    const panel = $(".sheet__panel");
    panel.addEventListener("touchstart", start, { passive: true });
    panel.addEventListener("touchmove", move, { passive: false });
    panel.addEventListener("touchend", end);
    panel.addEventListener("touchcancel", end);
  }

  /* ---------------------------------------------------------
     INFO
     --------------------------------------------------------- */
  function buildInfo() {
    $("#tips").innerHTML = ESSENTIALS.map((t, i) => `
      <article class="tip" data-reveal style="--d:${i % 3}">
        <span class="tip__ico">${ICON[t.icon]}</span>
        <div><h4>${t.title}</h4><p>${t.body}</p></div>
      </article>`).join("");

    $("#phrases").innerHTML = `<div class="phrase__hd"><span>🇩🇪 Alemán</span><span>Cómo se dice</span></div>` +
      PHRASES.map((p) => `<div class="phrase"><small>${p.es}</small><div><b>${p.de}</b><b>${p.nl}</b></div></div>`).join("");

    const items = [
      "DNI o pasaporte",
      "Tarjeta Sanitaria Europea",
      "60–80 € en efectivo (billetes pequeños)",
      "Deutschlandticket de diciembre (DB Navigator)",
      "Apps: DB Navigator, Rheinbahn, KVB, ASEAG",
      "Mapas offline de las 3 ciudades",
      "Bañador si vais a las Carolus Thermen",
      "Reservar cena del día 8 en un Brauhaus",
      "Abrigo, gorro, guantes y calzado impermeable",
      "Batería externa",
      "Check-in online del vuelo de vuelta",
    ];
    const done = new Set(store.get("check", []));
    $("#checklist").innerHTML = items.map((t, i) => `<li><label><input type="checkbox" data-ck="${i}" ${done.has(i) ? "checked" : ""}><span>${t}</span></label></li>`).join("");
    $("#checklist").addEventListener("change", (e) => {
      const i = +e.target.dataset.ck;
      e.target.checked ? done.add(i) : done.delete(i);
      store.set("check", [...done]);
    });
  }

  /* ---------------------------------------------------------
     FECHAS · cuenta atrás y «hoy»
     --------------------------------------------------------- */
  const todayISO = () => {
    const d = nowD();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };
  function timeState() {
    const t = todayISO();
    const start = new Date(TRIP.start + "T00:00:00");
    const now = nowD();
    const c = $("#countdown");
    const tripDay = DAYS.find((d) => d.date === t);
    if (t < TRIP.start) {
      const days = Math.ceil((start - now) / 864e5);
      c.innerHTML = `<b>${days}</b><span>${days === 1 ? "día para salir" : "días para salir"}</span>`;
    } else if (tripDay) {
      const idx = DAYS.indexOf(tripDay) + 1;
      c.innerHTML = `<b>Día ${idx}</b><span>de 4 · ${tripDay.city}</span>`;
      const btn = $("#goToday");
      btn.hidden = false;
      btn.textContent = `Ir a hoy · ${tripDay.city} →`;
      btn.onclick = () => $("#" + tripDay.id).scrollIntoView({ behavior: "smooth" });
      const a = $(`.dock a[data-target="${tripDay.id}"]`);
      a && a.classList.add("is-today");
    } else {
      c.innerHTML = `<b>✦</b><span>Viaje completado</span>`;
    }

    // timeline: pasado / ahora
    const hm = now.getHours() * 60 + now.getMinutes();
    $$(".tl").forEach((tl) => {
      const date = tl.dataset.date;
      const lis = $$("li", tl);
      lis.forEach((li) => li.classList.remove("is-past", "is-now"));
      $$(".tl__now", tl).forEach((n) => n.remove());
      if (date < t) lis.forEach((li) => li.classList.add("is-past"));
      if (date === t) {
        let cur = -1;
        lis.forEach((li, i) => {
          const [h, m] = li.dataset.t.split(":").map(Number);
          if (h * 60 + m <= hm) cur = i;
        });
        lis.forEach((li, i) => { if (i < cur) li.classList.add("is-past"); });
        if (cur >= 0) {
          lis[cur].classList.add("is-now");
          $(".tl__time", lis[cur]).insertAdjacentHTML("beforeend", '<span class="tl__now">· AHORA</span>');
        }
      }
    });
  }

  /* ---------------------------------------------------------
     TIEMPO (Open-Meteo, sin clave). Solo si la fecha está dentro
     de la previsión (≈16 días); si no, se queda el clima medio.
     --------------------------------------------------------- */
  const COORDS = { dus: [51.2277, 6.7735], cgn: [50.9375, 6.9603], aac: [50.7753, 6.0839] };
  const wxText = (c) =>
    c === 0 ? ["Despejado", "sun"] : c <= 3 ? ["Nubes y claros", "weather"] : c <= 48 ? ["Niebla", "weather"] :
    c <= 67 ? ["Lluvia", "rain"] : c <= 77 ? ["Nieve", "snow"] : c <= 82 ? ["Chubascos", "rain"] : c <= 86 ? ["Nieve", "snow"] : ["Tormenta", "rain"];
  async function weather() {
    const cache = store.get("wx2", null);
    let data = cache && Date.now() - cache.ts < 3 * 3600e3 ? cache.data : null;
    if (!data) {
      try {
        const keys = Object.keys(COORDS);
        const lat = keys.map((k) => COORDS[k][0]).join(","), lon = keys.map((k) => COORDS[k][1]).join(",");
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FBerlin&forecast_days=16`;
        const r = await fetch(url);
        if (!r.ok) return;
        const j = await r.json();
        const arr = Array.isArray(j) ? j : [j];
        data = {};
        keys.forEach((k, i) => (data[k] = arr[i].daily));
        store.set("wx2", { ts: Date.now(), data });
      } catch { return; }
    }
    $$("[data-wx]").forEach((el) => {
      const dly = data[el.dataset.city];
      if (!dly) return;
      const i = dly.time.indexOf(el.dataset.wx);
      if (i < 0) return;
      const [txt, ic] = wxText(dly.weather_code[i]);
      const p = dly.precipitation_probability_max ? dly.precipitation_probability_max[i] : null;
      el.innerHTML = `${ICON[ic]}<span>${txt} · ${Math.round(dly.temperature_2m_max[i])}° / ${Math.round(dly.temperature_2m_min[i])}°${p != null ? ` · ${p}% lluvia` : ""}</span>`;
    });
    markRain(data);
  }

  /* ---------------------------------------------------------
     SCROLL: aparición, parallax, progreso, dock
     --------------------------------------------------------- */
  function bindReveal() {
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.01 });
    $$("[data-reveal], .split, [data-walk]").forEach((el) => io.observe(el));
  }

  function bindScroll() {
    const heroes = $$(".day-hero").map((el) => ({ el, im: el.firstElementChild, body: $(".day-hero__body", el), num: $(".day-hero__num", el), top: 0, h: 0, on: false }));
    const cv = $("#cover"), cvBody = $(".cover__body", cv), cvSlides = $(".cover__slides", cv);
    const tls = $$(".tl").map((el) => ({ el, top: 0, h: 0, last: -1 }));
    const dock = $("#dock");
    const pill = $(".dock__pill");
    const links = $$("a", dock);
    const sections = $$("[data-nav]").map((el) => ({ id: el.dataset.nav, top: 0 }));
    const cover = $("#cover");
    const navIndex = { cover: 0, route: 0, d1: 1, d2: 2, d3: 3, d4: 4, info: 5 };
    const navColor = { d1: DAYS[0].accent, d2: DAYS[1].accent, d3: DAYS[2].accent, d4: DAYS[3].accent };
    let ticking = false, current = null, vh = innerHeight, coverBottom = 0, shown = null;

    // medidas: solo al cargar y cuando cambia el tamaño de la página, nunca durante el scroll
    const measure = () => {
      vh = innerHeight;
      const y = scrollY;
      heroes.forEach((x) => { const r = x.el.getBoundingClientRect(); x.top = r.top + y; x.h = r.height; });
      tls.forEach((x) => { const r = x.el.getBoundingClientRect(); x.top = r.top + y; x.h = r.height; });
      $$("[data-nav]").forEach((el, k) => (sections[k].top = el.getBoundingClientRect().top + y));
      coverBottom = cover.offsetHeight;
      update();
    };

    const update = () => {
      ticking = false;
      const y = scrollY;
      for (const x of heroes) {
        const rel = x.top - y;
        const vis = rel < vh && rel + x.h > 0;
        if (vis !== x.on) { x.on = vis; x.im.style.willChange = vis ? "transform" : "auto"; }
        if (!vis) continue;
        x.im.style.transform = `translate3d(0, ${(-rel * 0.3).toFixed(1)}px, 0) scale(${(1.1 + clamp(-rel / vh, 0, 1) * 0.08).toFixed(3)})`;
        const out = clamp(-rel / (x.h * 0.7), 0, 1);
        x.body.style.transform = `translate3d(0, ${(-rel * 0.18).toFixed(1)}px, 0)`;
        x.body.style.opacity = (1 - out * 1.1).toFixed(3);
        x.num.style.transform = `translate3d(0, ${(rel * 0.25).toFixed(1)}px, 0)`;
      }
      for (const x of tls) {
        const rel = x.top - y;
        if (rel + x.h < -50 || rel > vh) continue;
        const v = Math.round(clamp((vh * 0.62 - rel) / x.h, 0, 1) * 200) / 200;
        if (v !== x.last) { x.last = v; x.el.style.setProperty("--tl", v); }
      }
      if (y < vh * 1.1) {
        const k = clamp(y / vh, 0, 1);
        cvBody.style.transform = `translate3d(0, ${(y * 0.45).toFixed(1)}px, 0)`;
        cvBody.style.opacity = (1 - k * 1.3).toFixed(3);
        cvSlides.style.transform = `translate3d(0, ${(y * 0.25).toFixed(1)}px, 0) scale(${(1 + k * 0.08).toFixed(3)})`;
      }
      const sh = coverBottom - y < vh * 0.55;
      if (sh !== shown) { shown = sh; dock.classList.toggle("is-shown", sh); }
      let id = "cover";
      for (const s of sections) if (s.top - y <= vh * 0.45) id = s.id;
      if (id !== current) {
        current = id;
        const k = navIndex[id] ?? 0;
        pill.style.setProperty("--k", k);
        dock.style.setProperty("--pill", navColor[id] || "rgba(255,255,255,.14)");
        links.forEach((a, i) => a.classList.toggle("is-on", i === k));
      }
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    addEventListener("scroll", onScroll, { passive: true });
    let rt;
    const remeasure = () => { clearTimeout(rt); rt = setTimeout(measure, 120); };
    addEventListener("resize", remeasure);
    if ("ResizeObserver" in window) new ResizeObserver(remeasure).observe($("#app"));
    addEventListener("load", measure);
    document.fonts && document.fonts.ready.then(measure);
    measure();
  }

  /* ---------------------------------------------------------
     NIEVE (solo portada)
     --------------------------------------------------------- */
  function snow() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv = $(".snow"), ctx = cv.getContext("2d");
    const cover = $("#cover");
    let w, h, dpr, flakes = [], on = true;
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = cover.clientWidth; h = cover.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    addEventListener("resize", resize);
    for (let i = 0; i < 70; i++) flakes.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.8 + .4, s: Math.random() * .5 + .25, d: Math.random() * Math.PI * 2 });
    new IntersectionObserver(([e]) => { on = e.isIntersecting; cover.classList.toggle("is-off", !on); if (on) requestAnimationFrame(tick); }).observe(cover);
    function tick() {
      if (!on) return;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,.8)";
      ctx.beginPath();
      for (const f of flakes) {
        f.y += f.s; f.d += 0.01; f.x += Math.sin(f.d) * 0.3;
        if (f.y > h + 4) { f.y = -4; f.x = Math.random() * w; }
        ctx.moveTo(f.x, f.y); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      }
      ctx.fill();
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------------------------------------------------------
     UBICACIÓN EN VIVO
     --------------------------------------------------------- */
  let watchId = null, lastFix = 0;
  function refreshNear() {
    renderRails();
    $$(".dx__me").forEach((b) => (b.hidden = !ME));
    $$("[data-dx]").forEach((box) => { const on = $("button.is-on", box); if (on && on.dataset.from === "me") renderDx(box, "me"); });
    $$("[data-near]").forEach((b) => b.classList.toggle("is-on", NEAR));
  }
  function startLocation() {
    if (!("geolocation" in navigator)) { toast("Este navegador no da la ubicación"); return; }
    if (watchId != null) return;
    $$("[data-near]").forEach((b) => b.classList.add("is-wait"));
    watchId = navigator.geolocation.watchPosition((pos) => {
      $$("[data-near]").forEach((b) => b.classList.remove("is-wait"));
      const first = !ME;
      ME = [pos.coords.latitude, pos.coords.longitude];
      GEO.me = ME;
      const now = Date.now();
      if (first || now - lastFix > 20000) { lastFix = now; refreshNear(); }
    }, () => {
      $$("[data-near]").forEach((b) => b.classList.remove("is-wait"));
      NEAR = false; refreshNear();
      toast("Sin permiso de ubicación: actívalo en Ajustes › Safari › Ubicación");
    }, { enableHighAccuracy: true, maximumAge: 15000, timeout: 20000 });
  }
  function bindNear() {
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-near]");
      if (!b) return;
      NEAR = !NEAR;
      if (NEAR) startLocation();
      refreshNear();
    });
  }

  /* ---------------------------------------------------------
     MODO OSCURO (automático de noche)
     --------------------------------------------------------- */
  let themePref = store.get("theme", "auto");
  function applyTheme() {
    const h = nowD().getHours();
    const dark = themePref === "dark" || (themePref === "auto" && (h >= 17 || h < 8));
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    const meta = $('meta[name="theme-color"]');
    meta && meta.setAttribute("content", dark ? "#0E1015" : "#15161C");
    $$("[data-theme-set]").forEach((b) => b.classList.toggle("is-on", b.dataset.themeSet === themePref));
  }
  function bindTheme() {
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-theme-set]");
      if (!b) return;
      themePref = b.dataset.themeSet;
      store.set("theme", themePref);
      applyTheme();
    });
  }

  /* ---------------------------------------------------------
     TAZAS DE GLÜHWEIN
     --------------------------------------------------------- */
  function mugTotal() { return Object.values(MUGS).reduce((a, b) => a + b, 0); }
  function renderMugs() {
    const box = $("#mugs");
    if (!box) return;
    const n = mugTotal();
    const entries = Object.entries(MUGS).filter(([, v]) => v > 0);
    const level = n >= 8 ? "Leyenda del Glühwein" : n >= 5 ? "Coleccionista" : n >= 2 ? "Aficionado" : n === 1 ? "Primera taza" : "Aún sin tazas";
    box.innerHTML = `
      <div class="mugs__top"><b>${n}</b><div><small>Tazas en la colección</small><span>${level}</span></div></div>
      ${entries.length ? `<ul>${entries.map(([k, v]) => `<li><span>${k.split(":")[1]}</span><b>${"🍷".repeat(Math.min(v, 6))}${v > 6 ? " ×" + v : ""}</b></li>`).join("")}</ul>` : `<p>Toca el icono de la taza en cada mercado para ir sumando.</p>`}`;
  }
  function bindMugs() {
    let pressT = null, longPressed = false;
    const change = (b, delta) => {
      const k = b.dataset.mug;
      MUGS[k] = Math.max(0, (MUGS[k] || 0) + delta);
      store.set("mugs", MUGS);
      $$(`[data-mug="${CSS.escape(k)}"] b`).forEach((x) => (x.textContent = MUGS[k]));
      b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop");
      renderMugs();
    };
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-mug]");
      if (!b) return;
      if (longPressed) { longPressed = false; return; }
      change(b, +1);
    });
    // mantener pulsado = quitar una
    document.addEventListener("touchstart", (e) => {
      const b = e.target.closest("[data-mug]");
      if (!b) return;
      pressT = setTimeout(() => { longPressed = true; change(b, -1); }, 600);
    }, { passive: true });
    ["touchend", "touchmove", "touchcancel"].forEach((ev) => document.addEventListener(ev, () => clearTimeout(pressT), { passive: true }));
  }

  /* ---------------------------------------------------------
     COMPARTIR PROGRESO CON LOS ACOMPAÑANTES (por enlace)
     --------------------------------------------------------- */
  function packState() {
    const data = { v: 1, seen: [...seen], mugs: MUGS };
    return btoa(unescape(encodeURIComponent(JSON.stringify(data)))).replace(/=+$/, "");
  }
  function mergeFromHash() {
    const m = location.hash.match(/#sync=([A-Za-z0-9+/_-]+)/);
    if (!m) return;
    try {
      const data = JSON.parse(decodeURIComponent(escape(atob(m[1]))));
      let added = 0;
      (data.seen || []).forEach((id) => { if (!seen.has(id)) { seen.add(id); added++; } });
      Object.entries(data.mugs || {}).forEach(([k, v]) => { if ((MUGS[k] || 0) < v) { MUGS[k] = v; added++; } });
      store.set("seen", [...seen]); store.set("mugs", MUGS);
      history.replaceState(null, "", location.pathname);
      toast(added ? `Progreso de tu acompañante añadido (${added} cambios)` : "Ya teníais el mismo progreso");
    } catch { toast("El enlace de progreso no es válido"); }
  }
  function bindShare() {
    const b = $("#shareBtn");
    if (!b) return;
    b.addEventListener("click", async () => {
      const url = location.origin + location.pathname + "#sync=" + packState();
      const text = "Mi progreso del viaje (vistos y tazas). Ábrelo en tu móvil para juntarlo con el tuyo:";
      try {
        if (navigator.share) await navigator.share({ title: "Invierno en el Rin", text, url });
        else { await navigator.clipboard.writeText(url); toast("Enlace copiado"); }
      } catch {}
    });
  }

  /* ---------------------------------------------------------
     AVISOS
     --------------------------------------------------------- */
  function toast(msg) {
    let t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add("is-on");
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove("is-on"), 3200);
  }

  /* ---------------------------------------------------------
     SIN ZOOM (iOS ignora user-scalable en algunos casos)
     --------------------------------------------------------- */
  function noZoom() {
    ["gesturestart", "gesturechange", "gestureend"].forEach((ev) =>
      document.addEventListener(ev, (e) => e.preventDefault(), { passive: false }));
    document.addEventListener("touchmove", (e) => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
    let last = 0;
    document.addEventListener("touchend", (e) => {
      const now = Date.now();
      if (now - last < 280 && !e.target.closest("a,button,input,label,summary")) e.preventDefault();
      last = now;
    }, { passive: false });
  }

  /* --------------------------------------------------------- */
  $("#slides").innerHTML = ["dus_city", "cgn_dom", "aac_wm"].map((k) => `<div class="cover__slide" style="background-image:url('${img(k, true)}')"></div>`).join("");
  window.TRIP = {
    img, hop, fmtM, walkMin, dist, mapsSearch, openSheet, toast, store, ICON,
    seen, POI_INDEX, POI_DAY, mustItems, refreshMust, todayISO, nowD,
    me: () => ME,
    markSeen(k, on) {
      if (on) seen.add(k); else seen.delete(k);
      store.set("seen", [...seen]);
      $$(`[data-poi="${CSS.escape(k)}"].poi`).forEach((c) => c.classList.toggle("is-seen", on));
      refreshMust();
    },
    startLocation: () => startLocation(),
  };
  buildMap();
  buildDays();
  buildInfo();
  mergeFromHash();
  applyTheme();
  bindRails();
  bindDx();
  $$("[data-rail]").forEach((r) => r.dispatchEvent(new Event("scroll")));
  bindNear();
  bindTheme();
  bindMugs();
  bindShare();
  countUp();
  renderMugs();
  bindSheet();
  bindReveal();
  bindScroll();
  timeState();
  marketStatus();
  setInterval(() => { timeState(); marketStatus(); applyTheme(); }, 60e3);
  weather();
  snow();
  noZoom();

  const offlineBtn = $("#offlineBtn");
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
    if (store.get("offline", false)) { offlineBtn.textContent = "Guardado ✓ (actualizar)"; offlineBtn.classList.add("is-done"); }
    offlineBtn.addEventListener("click", async () => {
      offlineBtn.textContent = "Descargando…";
      const reg = await navigator.serviceWorker.ready;
      const urls = [...new Set(Object.values(IMG).flatMap((v) => [v.s, v.l]).filter((u) => u.startsWith("http")))];
      navigator.serviceWorker.addEventListener("message", (e) => {
        if (e.data && e.data.type === "precached") {
          offlineBtn.textContent = "Guardado ✓";
          offlineBtn.classList.add("is-done");
          store.set("offline", true);
        }
      }, { once: true });
      reg.active && reg.active.postMessage({ type: "precache", urls });
    });
  } else {
    offlineBtn.closest(".offline").hidden = true;
  }
})();
