/* =========================================================
   Rin & Mosa · interacción
   ========================================================= */
(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
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
  };

  /* ---------------------------------------------------------
     MAPA ARTESANAL
     --------------------------------------------------------- */
  const LEGS = [
    { id: "fly1", day: 1, d: "M178 330 C 215 250, 245 150, 268 57", flight: true },
    { id: "l1", day: 1, d: "M268 57 C 273 64, 273 72, 270 79" },
    { id: "l2", day: 2, d: "M270 79 C 292 100, 318 128, 322 150 C 325 165, 317 176, 311 181" },
    { id: "l3", day: 3, d: "M270 79 C 232 82, 202 90, 182 110 C 160 134, 122 160, 92 180 C 66 195, 46 205, 31 211" },
    { id: "l4", day: 4, d: "M270 79 C 265 72, 263 64, 268 57" },
    { id: "fly2", day: 4, d: "M268 57 C 240 140, 205 240, 160 330", flight: true },
  ];
  const STEPS = [
    { n: "✦", kick: "Resumen", title: "Cuatro días entre dos ríos", text: "Base en Düsseldorf. Un día en Colonia siguiendo el Rin y otro cruzando a Holanda, a orillas del Mosa.", stats: [["4", "días"], ["3", "ciudades"], ["2", "países"], ["10+", "mercados"]], c: "#B08D57", on: [] },
    { n: "08", kick: "Martes · Llegada", title: "Madrid → Düsseldorf", text: "Aterrizaje 12:30. S11 al centro en 12 minutos y tarde de Kö, Altstadt y mercados.", stats: [["12′", "al centro"], ["≈3,80€", "billete"]], c: DAYS[0].accent, on: ["fly1", "l1"], nodes: ["air", "dus"] },
    { n: "09", kick: "Miércoles · Excursión", title: "Düsseldorf → Köln", text: "Regional por la orilla del Rin. Catedral, siete mercados y Kölsch.", stats: [["≈40 km", "distancia"], ["25–35′", "en RE"]], c: DAYS[1].accent, on: ["l2"], nodes: ["dus", "cgn"] },
    { n: "10", kick: "Jueves · Holanda", title: "Düsseldorf → Maastricht", text: "FlixBus cruzando la frontera. Todo el centro se hace a pie desde la estación.", stats: [["≈105 km", "distancia"], ["≈2 h", "en bus"]], c: DAYS[2].accent, on: ["l3"], nodes: ["dus", "mst"] },
    { n: "11", kick: "Viernes · Vuelta", title: "Düsseldorf → Madrid", text: "Mañana libre, S11 al aeropuerto a las 13:45 y vuelo a las 16:30.", stats: [["16:30", "vuelo"], ["14:30", "en DUS"]], c: DAYS[3].accent, on: ["l4", "fly2"], nodes: ["dus", "air"] },
  ];

  function buildMap() {
    const svg = $("#map");
    const N = MAP_NODES;
    const legColor = (l) => DAYS[l.day - 1].accent;
    let grid = "";
    for (let x = 0; x <= 360; x += 30) grid += `<line class="grid" x1="${x}" y1="0" x2="${x}" y2="290"/>`;
    for (let y = 0; y <= 290; y += 30) grid += `<line class="grid" x1="0" y1="${y}" x2="360" y2="${y}"/>`;
    const towns = [
      ["Bonn", 341, 251], ["Venlo", 137, 30], ["Roermond", 95, 92], ["Aachen", 118, 238], ["Duisburg", 268, 10],
    ];
    svg.innerHTML = `
      <defs>
        <radialGradient id="vign" cx="50%" cy="45%" r="70%"><stop offset="60%" stop-color="#F4EFE6" stop-opacity="0"/><stop offset="100%" stop-color="#F4EFE6" stop-opacity="1"/></radialGradient>
      </defs>
      ${grid}
      <path class="river" d="M350 290 C 345 265, 342 255, 338 245 C 330 225, 318 200, 314 182 C 310 165, 320 150, 316 140 C 312 128, 298 125, 292 118 C 284 108, 262 100, 265 88 C 268 76, 258 66, 260 52 C 262 38, 258 22, 264 0"/>
      <path class="river river--thin" d="M0 285 C 12 262, 26 236, 30 212 C 33 190, 45 165, 65 140 C 82 118, 92 104, 96 92 C 104 70, 128 50, 136 30 C 140 18, 140 8, 142 0"/>
      <text class="river-label" x="322" y="214" transform="rotate(68 322 214)">Rhein</text>
      <text class="river-label" x="50" y="164" transform="rotate(-55 50 164)">Maas</text>
      <path class="border" d="M150 0 C 152 15, 151 25, 150 40 C 148 60, 146 80, 141 95 C 130 115, 90 130, 72 155 C 86 170, 116 172, 119 190 C 121 205, 110 225, 104 245"/>
      <path class="border" d="M104 245 C 80 249, 50 251, 36 251 C 24 240, 22 226, 24 214 C 28 196, 44 172, 60 150 C 40 140, 20 130, 0 125"/>
      <path class="border" d="M104 245 C 112 262, 120 276, 126 290"/>
      <text class="country" x="20" y="70">NEDERLAND</text>
      <text class="country" x="176" y="146">DEUTSCHLAND</text>
      <text class="country" x="40" y="282">BELGIË</text>
      ${towns.map(([n, x, y]) => `<circle class="town" cx="${x}" cy="${y}" r="1.6"/><text class="town-label" x="${x + 4}" y="${y + 2.5}">${n}</text>`).join("")}
      <rect x="0" y="0" width="360" height="290" fill="url(#vign)"/>
      ${LEGS.map((l) => `<path class="leg ${l.flight ? "leg--flight" : ""}" data-leg="${l.id}" pathLength="1" d="${l.d}" stroke="${legColor(l)}" ${l.flight ? 'stroke-dasharray="0.012 0.012"' : ""}/>`).join("")}
      ${["air", "dus", "cgn", "mst"].map((k) => {
        const p = N[k];
        const anchor = k === "mst" ? "start" : "end";
        const dx = k === "mst" ? 9 : -9;
        const dy = k === "air" ? -2 : 4;
        return `<g class="node" data-node="${k}"><circle class="halo" cx="${p.x}" cy="${p.y}" r="5"/><circle class="core" cx="${p.x}" cy="${p.y}" r="${k === "air" ? 2.6 : 4}"/><text x="${p.x + dx}" y="${p.y + dy}" text-anchor="${anchor}">${p.label}</text></g>`;
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

    const setStep = (i) => {
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
  const seen = new Set(store.get("seen", []));
  let mode = store.get("mode", "xmas");
  const POI_INDEX = {};

  function poiCard(p, i) {
    POI_INDEX[p.id] = p;
    return `
      <button class="poi ${seen.has(p.id) ? "is-seen" : ""}" data-poi="${p.id}" style="--i:${i}">
        <img src="${img(p.img)}" alt="${p.name}" loading="lazy" decoding="async">
        <div class="poi__top"><span class="chip">${p.tag}</span><span class="poi__seen">${ICON.check}</span></div>
        <div class="poi__body">
          <h4>${p.name}</h4>
          <p>${p.short}</p>
          <div class="poi__meta"><span>${ICON.clock}${p.time}</span><span>${ICON.euro}${p.price}</span></div>
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
    root.innerHTML = DAYS.map((d, di) => {
      const walk = d.walk ? `
        <div class="block">
          <div class="block__head" data-reveal><h3>Ruta <em>a pie</em></h3><span class="eyebrow">${ICON.walk ? "" : ""}Paso a paso</span></div>
          <div class="walk" data-reveal data-walk style="--accent-line:${lighten(d.accent)}">
            <div class="walk__head">
              <span class="eyebrow" style="opacity:.6">${d.city}</span>
              <h4>${d.walk.title}</h4>
              <p>${d.walk.total}</p>
            </div>
            <ol>${d.walk.stops.map((s, i) => `<li style="--i:${i}"><span class="walk__dot"></span><span class="walk__name">${s.n}</span><span class="walk__min">${s.m ? "+" + s.m : "inicio"}</span></li>`).join("")}</ol>
            <a class="btn btn--light" href="${mapsWalk(d.walk.gmaps)}" target="_blank" rel="noopener">${ICON.pin}Abrir ruta en Google Maps</a>
          </div>
        </div>` : "";

      return `
      <section class="day" id="${d.id}" data-nav="${d.id}" style="--accent:${d.accent};--accent-soft:${d.accentSoft}">
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

        <div class="block">
          <div class="block__head" data-reveal><h3>El <em>plan</em></h3><span class="eyebrow">${d.weekday}</span></div>
          <ol class="tl" data-date="${d.date}">
            <span class="tl__fill" aria-hidden="true"></span>
            ${d.timeline.map((t, i) => `
              <li data-reveal style="--d:${Math.min(i, 3)}" data-t="${t.t}" class="${t.tag === "transit" ? "is-transit" : ""}">
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
          <div class="block__head" data-reveal><h3>Qué <em>ver</em></h3></div>
          <div class="seg" data-reveal data-seg data-mode="${mode}">
            <span class="seg__pill"></span>
            <button data-m="xmas" class="${mode === "xmas" ? "is-on" : ""}">✦ En Navidad</button>
            <button data-m="always" class="${mode === "always" ? "is-on" : ""}">Todo el año</button>
          </div>
          <div class="rail" data-rail="${di}"></div>
          <div class="rail__hint"><span>Toca una tarjeta para ver la ficha</span><span class="dots" data-dots="${di}"></span></div>
        </div>

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

        ${walk}
        <div class="day__end"></div>
      </section>`;
    }).join("");

    renderRails();
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
      const items = d[mode] && d[mode].length ? d[mode] : d.always;
      rail.innerHTML = items.map(poiCard).join("");
      rail.scrollLeft = 0;
      const dots = $(`[data-dots="${di}"]`);
      dots.innerHTML = items.map((_, i) => `<i class="${i === 0 ? "is-on" : ""}"></i>`).join("");
    });
    // también indexamos los de la otra pestaña para la ficha
    DAYS.forEach((d) => [...d.xmas, ...d.always].forEach((p) => (POI_INDEX[p.id] = p)));
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
          const i = clamp(Math.round(rail.scrollLeft / w), 0, cards.length - 1);
          $$("i", $(`[data-dots="${rail.dataset.rail}"]`)).forEach((d, j) => d.classList.toggle("is-on", j === i));
        });
      }, { passive: true });
    });

    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-seg] button");
      if (b) {
        mode = b.dataset.m;
        store.set("mode", mode);
        $$("[data-seg]").forEach((s) => {
          s.dataset.mode = mode;
          $$("button", s).forEach((x) => x.classList.toggle("is-on", x.dataset.m === mode));
        });
        renderRails();
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

    $("#phrases").innerHTML = `<div class="phrase__hd"><span>🇩🇪 Alemán</span><span>🇳🇱 Neerlandés</span></div>` +
      PHRASES.map((p) => `<div class="phrase"><small>${p.es}</small><div><b>${p.de}</b><b>${p.nl}</b></div></div>`).join("");

    const items = [
      "DNI o pasaporte",
      "Tarjeta Sanitaria Europea",
      "60–80 € en efectivo (billetes pequeños)",
      "Billete FlixBus a Maastricht (ida y vuelta)",
      "Apps: DB Navigator, Rheinbahn, FlixBus",
      "Mapas offline de las 3 ciudades",
      "Decidir: Deutschlandticket o billetes sueltos",
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
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };
  function timeState() {
    const t = todayISO();
    const start = new Date(TRIP.start + "T00:00:00");
    const now = new Date();
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
  const COORDS = { dus: [51.2277, 6.7735], cgn: [50.9375, 6.9603], mst: [50.8514, 5.691] };
  const wxText = (c) =>
    c === 0 ? ["Despejado", "sun"] : c <= 3 ? ["Nubes y claros", "weather"] : c <= 48 ? ["Niebla", "weather"] :
    c <= 67 ? ["Lluvia", "rain"] : c <= 77 ? ["Nieve", "snow"] : c <= 82 ? ["Chubascos", "rain"] : c <= 86 ? ["Nieve", "snow"] : ["Tormenta", "rain"];
  async function weather() {
    const cache = store.get("wx", null);
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
        store.set("wx", { ts: Date.now(), data });
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
    const bar = $(".progress span");
    const heroes = $$(".day-hero");
    const tls = $$(".tl");
    const dock = $("#dock");
    const pill = $(".dock__pill");
    const links = $$("a", dock);
    const sections = $$("[data-nav]");
    const cover = $("#cover");
    const navIndex = { cover: 0, route: 0, d1: 1, d2: 2, d3: 3, d4: 4, info: 5 };
    const navColor = { d1: DAYS[0].accent, d2: DAYS[1].accent, d3: DAYS[2].accent, d4: DAYS[3].accent };
    let ticking = false, current = null;

    const update = () => {
      ticking = false;
      const vh = innerHeight;
      const doc = document.documentElement;
      const max = doc.scrollHeight - vh;
      bar.style.setProperty("--p", max > 0 ? (scrollY / max).toFixed(4) : 0);

      heroes.forEach((h) => {
        const r = h.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const im = h.firstElementChild;
        im.style.setProperty("--py", `${(-r.top * 0.22).toFixed(1)}px`);
        im.style.setProperty("--ps", (1.08 + clamp(-r.top / vh, 0, 1) * 0.06).toFixed(3));
      });

      tls.forEach((tl) => {
        const r = tl.getBoundingClientRect();
        if (r.bottom < -50 || r.top > vh) return;
        tl.style.setProperty("--tl", clamp((vh * 0.62 - r.top) / r.height, 0, 1).toFixed(3));
      });

      dock.classList.toggle("is-shown", cover.getBoundingClientRect().bottom < vh * 0.55);

      let id = "cover";
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= vh * 0.45) id = s.dataset.nav;
      }
      if (id !== current) {
        current = id;
        const k = navIndex[id] ?? 0;
        pill.style.setProperty("--k", k);
        dock.style.setProperty("--pill", navColor[id] || "rgba(255,255,255,.14)");
        links.forEach((a, i) => a.classList.toggle("is-on", i === k));
        const meta = $('meta[name="theme-color"]');
        meta && meta.setAttribute("content", "#15161C");
      }
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    update();
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
    new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on) requestAnimationFrame(tick); }).observe(cover);
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
  $("#slides").innerHTML = ["dus_city", "cgn_dom", "mst_magisch"].map((k) => `<div class="cover__slide" style="background-image:url('${img(k, true)}')"></div>`).join("");
  buildMap();
  buildDays();
  buildInfo();
  bindRails();
  bindSheet();
  bindReveal();
  bindScroll();
  timeState();
  setInterval(timeState, 60e3);
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
