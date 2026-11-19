/* =========================================================
   Contenido del viaje · Düsseldorf · Köln · Maastricht
   8–11 diciembre 2026
   Precios y horarios: aproximados (revisados nov. 2026).
   ========================================================= */

const TRIP = {
  start: "2026-12-08",
  end: "2026-12-11",
  base: "Düsseldorf",
};

/* Coordenadas proyectadas (viewBox 0 0 360 280) para el mapa artesanal */
const MAP_NODES = {
  dus:  { x: 270, y: 79,  label: "Düsseldorf" },
  air:  { x: 268, y: 57,  label: "DUS ✈" },
  cgn:  { x: 311, y: 181, label: "Köln" },
  mst:  { x: 31,  y: 211, label: "Maastricht" },
  aac:  { x: 118, y: 238, label: "Aachen" },
  mad:  { x: 200, y: 300, label: "Madrid" },
};

const DAYS = [
  /* ------------------------------------------------ DÍA 1 */
  {
    id: "d1",
    num: "08",
    weekday: "Martes",
    date: "2026-12-08",
    city: "Düsseldorf",
    cityKey: "dus",
    accent: "#1F4F5E",
    accentSoft: "#DCE8EA",
    kicker: "Llegada",
    title: "Düsseldorf",
    subtitle: "Altbier, la Kö y el Rin al anochecer",
    hero: "dus_city",
    heroAlt: "Düsseldorf de noche junto al Rin",
    intro:
      "Aterrizáis a mediodía y tenéis la tarde entera. El plan: dejar maletas, ramen en el barrio japonés, pasear por la Königsallee, perderse en la Altstadt y ver la puesta de sol (≈16:25) en el paseo del Rin antes de que se enciendan los mercados.",
    timeline: [
      { t: "08:00", h: "Salida de Madrid", d: "Vuelo MAD → DUS. Llevad algo de efectivo: en muchos Brauhaus solo aceptan cash." },
      { t: "12:30", h: "Aterrizaje en DUS", d: "Sigue los carteles «S-Bahn / Bahnhof Terminal». La estación está bajo la terminal." },
      { t: "12:50", h: "S11 → Düsseldorf Hbf", d: "12 min, cada 20 min. Billete EinzelTicket A (≈3,80 €) o Deutschlandticket.", tag: "transit" },
      { t: "13:30", h: "Ramen en Little Tokyo", d: "Immermannstraße, a 5 min a pie de la estación. Takumi o Naniwa (llegar antes de las 14 h)." },
      { t: "15:00", h: "Königsallee y Kö-Bogen", d: "El canal con árboles, las tiendas de lujo y el edificio verde de Kö-Bogen II. En diciembre: Winter Village en la Kö." },
      { t: "16:00", h: "Rheinuferpromenade al atardecer", d: "Atardece sobre las 16:25. Bajad al Burgplatz: Schlossturm, escaleras del Rin y la noria navideña." },
      { t: "17:00", h: "Ruta de mercados navideños", d: "Engelchen-Markt (Heinrich-Heine-Platz) → Marktplatz/Rathaus → Altstadt. Glühwein con taza de depósito." },
      { t: "19:30", h: "Cena en un Brauhaus", d: "Uerige, Zum Schiffchen o Im Füchschen. Pide Altbier; el Köbes te traerá otro hasta que tapes el vaso con el posavasos." },
      { t: "21:30", h: "Opcional: MedienHafen de noche", d: "Los edificios de Gehry iluminados y la Rheinturm a la vista. 20 min andando desde la Altstadt." },
    ],
    transit: [
      {
        from: "Aeropuerto DUS", to: "Düsseldorf Hbf",
        lines: [{ n: "S11", c: "#2E7D32" }],
        time: "12 min", price: "≈3,80 €", freq: "cada 20 min",
        steps: [
          "Desde llegadas, baja a la estación «Düsseldorf Flughafen Terminal» (bajo el edificio, sigue la S verde).",
          "Compra en máquina o en la app (Rheinbahn / VRR / DB Navigator): EinzelTicket Preisstufe A.",
          "S11 dirección Düsseldorf Hbf / Köln → bájate en Düsseldorf Hbf (≈12 min).",
        ],
        alt: "Alternativa: SkyTrain (gratis) a «Flughafen Fernbahnhof» y cualquier tren regional (RE/RB/S1) a Hbf en ~8 min. Taxi: ≈25–30 €, 20 min.",
      },
      {
        from: "Düsseldorf Hbf", to: "Altstadt (Heinrich-Heine-Allee)",
        lines: [{ n: "U70–U79", c: "#1565C0" }],
        time: "5 min", price: "mismo billete", freq: "cada pocos min",
        steps: [
          "Baja a la U-Bahn en el propio Hbf.",
          "Cualquier línea U70, U74, U75, U76, U77, U78 o U79 dirección centro.",
          "Bájate en Heinrich-Heine-Allee: sales entre la Kö y la Altstadt.",
        ],
        alt: "A pie: 20 min por Immermannstraße (barrio japonés) → Kö → Altstadt. Es el paseo recomendado.",
      },
    ],
    xmas: [
      { id: "dus-engel", name: "Engelchen-Markt", tag: "Mercado", img: "dus_engel", short: "El más bonito: casetas blancas con ángeles junto a la Heinrich-Heine-Allee.", desc: "Puestos con tejados blancos decorados con ángeles y luces doradas, en la Heinrich-Heine-Platz, junto al Carsch-Haus y a un paso de la Kö. Ideal para empezar la ruta con el primer Glühwein.", tip: "La taza lleva depósito (Pfand, ≈3–5 €). Devuélvela o quédatela de recuerdo.", time: "30–45 min", price: "Gratis", q: "Engelchen-Markt Heinrich-Heine-Platz Düsseldorf" },
      { id: "dus-rathaus", name: "Mercado del Marktplatz", tag: "Mercado", img: "dus_wm_rathaus", short: "Frente al Ayuntamiento, con la estatua ecuestre de Jan Wellem.", desc: "Casetas de estilo tradicional ante el Rathaus renacentista. Artesanía, adornos y comida: Reibekuchen (tortitas de patata con compota de manzana), Bratwurst y castañas.", tip: "Prueba los Reibekuchen con Apfelmus: ≈5 € la ración de 3.", time: "30 min", price: "Gratis", q: "Marktplatz Rathaus Düsseldorf" },
      { id: "dus-riesenrad", name: "Noria del Burgplatz", tag: "Vistas", img: "dus_riesenrad", short: "La noria junto al Rin: vistas a la Altstadt iluminada.", desc: "En temporada navideña suele instalarse una gran noria entre el Schlossturm y el río. Las vistas al atardecer sobre el Rin y los puentes son de las mejores de la ciudad.", tip: "Súbete justo al anochecer (16:30–17:00) para ver el cielo azul y las luces a la vez.", time: "20 min", price: "≈8–10 €", q: "Burgplatz Düsseldorf" },
      { id: "dus-ko", name: "Winter Village en la Kö", tag: "Mercado", img: "dus_ko", short: "Novedad 2026: pueblo de invierno en la avenida más elegante.", desc: "La Königsallee se viste con casetas, luces sobre el canal y ambiente más chic que en la Altstadt. Buen sitio para un vino caliente blanco o un ponche sin alcohol (Kinderpunsch).", tip: "Combínalo con el Sternchenmarkt de la Schadowstraße, a 5 min.", time: "30 min", price: "Gratis", q: "Königsallee Düsseldorf" },
    ],
    always: [
      { id: "dus-kobogen", name: "Kö-Bogen", tag: "Arquitectura", img: "dus_koebogen", short: "Libeskind y la fachada verde más grande de Europa.", desc: "Dos piezas: los edificios curvos de Daniel Libeskind y el Kö-Bogen II, con 8 km de setos de carpe cubriendo fachada y tejado. Al lado, el Hofgarten y la Schauspielhaus de líneas blancas.", tip: "La mejor foto: desde la Gustaf-Gründgens-Platz, con el teatro blanco en primer plano.", time: "20 min", price: "Gratis", q: "Kö-Bogen Düsseldorf" },
      { id: "dus-koe", name: "Königsallee", tag: "Paseo", img: "dus_ko", short: "La «Kö»: un canal flanqueado de castaños y escaparates.", desc: "Un kilómetro de bulevar con el Stadtgraben en el centro, puentes de piedra y la fuente del Tritón al norte. Aunque no compres nada, el paseo merece la pena.", tip: "Al final norte (Corneliusplatz) está el acceso más directo a la Altstadt.", time: "30 min", price: "Gratis", q: "Königsallee Düsseldorf" },
      { id: "dus-altstadt", name: "Altstadt y Bolkerstraße", tag: "Barrio", img: "dus_altstadt", short: "«La barra más larga del mundo»: 260 bares en medio km².", desc: "Calles empedradas, Brauhäuser centenarios y la casa natal de Heinrich Heine en la Bolkerstraße. De día es casco histórico; de noche, ambientazo.", tip: "Bolkerstraße 53: casa natal de Heine, hoy librería y café literario.", time: "1 h", price: "Gratis", q: "Bolkerstraße Düsseldorf" },
      { id: "dus-rhein", name: "Rheinuferpromenade", tag: "Paseo", img: "dus_rheinufer", short: "El paseo del Rin, con escalinatas para sentarse a ver el río.", desc: "Paseo peatonal sobre un túnel de autopista: une la Altstadt con la Rheinturm y el MedienHafen. Las escaleras del Burgplatz son el punto de encuentro clásico al atardecer.", tip: "Atardecer en diciembre ≈16:25. Llega 15 min antes.", time: "30–45 min", price: "Gratis", q: "Rheinuferpromenade Düsseldorf" },
      { id: "dus-schloss", name: "Schlossturm y St. Lambertus", tag: "Historia", img: "dus_schlossturm", short: "Lo que queda del castillo y la iglesia del campanario torcido.", desc: "El Schlossturm es la única torre del antiguo palacio (hoy museo de navegación). A dos pasos, St. Lambertus tiene una aguja retorcida que, según la leyenda, se giró para ver a una novia «demasiado» virtuosa.", tip: "Busca la columna de la ciudad (Stadterhebungsmonument) en el Burgplatz.", time: "20 min", price: "Gratis", q: "Schlossturm Burgplatz Düsseldorf" },
      { id: "dus-rheinturm", name: "Rheinturm", tag: "Vistas", img: "dus_rheinturm", short: "240 m y un reloj gigante de luces en el fuste.", desc: "La torre de telecomunicaciones tiene mirador a 168 m. Sus luces forman el reloj decimal más grande del mundo: aprende a leerlo y sorprende a todos.", tip: "Lectura del reloj: de arriba abajo, segundos, minutos y horas en grupos de luces.", time: "45 min", price: "≈12–14 €", q: "Rheinturm Düsseldorf" },
      { id: "dus-medien", name: "MedienHafen", tag: "Arquitectura", img: "dus_medienhafen", short: "El antiguo puerto, con los edificios ondulados de Frank Gehry.", desc: "Los Neuer Zollhof de Gehry (blanco, plata y ladrillo rojo) y arquitectura contemporánea alrededor de las dársenas. De noche, muy fotogénico.", tip: "Desde la Rheinturm son 5 min andando; desde la Altstadt, 20 min por el paseo.", time: "40 min", price: "Gratis", q: "Neuer Zollhof Düsseldorf" },
      { id: "dus-japan", name: "Little Tokyo", tag: "Barrio", img: "dus_japan", short: "La mayor comunidad japonesa de Europa continental.", desc: "Immermannstraße y alrededores: supermercados japoneses, pastelerías, librerías y algunos de los mejores ramen de Alemania.", tip: "Está entre el Hbf y la Kö: pásalo de camino.", time: "45 min", price: "€", q: "Immermannstraße Düsseldorf" },
    ],
    food: [
      { name: "Uerige", type: "Brauhaus", price: "€€", img: "dus_uerige", what: "Altbier de barril de madera y Mettbrötchen.", note: "Solo efectivo. Ambiente de pie en la calle.", q: "Uerige Düsseldorf" },
      { name: "Zum Schiffchen", type: "Brauhaus histórico", price: "€€", img: "dus_schiffchen", what: "Schweinshaxe (codillo) y Rheinischer Sauerbraten.", note: "Desde 1628. Reserva si vais a las 20 h.", q: "Zum Schiffchen Düsseldorf" },
      { name: "Im Füchschen", type: "Brauhaus", price: "€€", img: "food_haxe", what: "El codillo más famoso de la ciudad.", note: "Ratinger Straße, zona menos turística.", q: "Brauerei im Füchschen Düsseldorf" },
      { name: "Takumi / Naniwa", type: "Ramen", price: "€", img: "food_ramen", what: "Tonkotsu o miso ramen por ≈13–16 €.", note: "Colas a mediodía; rápidas.", q: "Naniwa Noodles Düsseldorf" },
      { name: "Carlsplatz", type: "Mercado gourmet", price: "€", img: "dus_carlsplatz", what: "Puestos de comida, café, Reibekuchen y dulces.", note: "Abre por la mañana y tarde; cerrado domingos.", q: "Carlsplatz Düsseldorf" },
      { name: "Currywurst", type: "Street food", price: "€", img: "food_currywurst", what: "Currywurst con patatas ≈5–7 €.", note: "En cualquier Imbiss de la Altstadt.", q: "Currywurst Altstadt Düsseldorf" },
    ],
    walk: {
      title: "Paseo de bienvenida",
      total: "≈ 2,8 km · 40 min sin paradas",
      stops: [
        { n: "Düsseldorf Hbf", m: "" },
        { n: "Immermannstraße · Little Tokyo", m: "5′" },
        { n: "Königsallee (norte)", m: "12′" },
        { n: "Kö-Bogen · Hofgarten", m: "5′" },
        { n: "Heinrich-Heine-Platz · Engelchen-Markt", m: "4′" },
        { n: "Marktplatz · Rathaus", m: "6′" },
        { n: "Burgplatz · Rin", m: "3′" },
        { n: "Rheinuferpromenade → Rheinturm", m: "15′" },
      ],
      gmaps: ["Düsseldorf Hauptbahnhof", "Immermannstraße Düsseldorf", "Kö-Bogen Düsseldorf", "Heinrich-Heine-Platz Düsseldorf", "Marktplatz Düsseldorf", "Burgplatz Düsseldorf", "Rheinturm Düsseldorf"],
    },
  },

  /* ------------------------------------------------ DÍA 2 */
  {
    id: "d2",
    num: "09",
    weekday: "Miércoles",
    date: "2026-12-09",
    city: "Köln",
    cityKey: "cgn",
    accent: "#7D2633",
    accentSoft: "#F1DEDF",
    kicker: "Excursión",
    title: "Köln",
    subtitle: "La catedral, siete mercados y Kölsch en vaso de 0,2",
    hero: "cgn_dom",
    heroAlt: "Catedral de Colonia",
    intro:
      "Colonia está a 25–35 min en tren regional. Sales de la estación y la catedral está literalmente delante. Día de mercados: el de la catedral, el de los gnomos en la Altstadt, el del puerto junto al Museo del Chocolate y el de los ángeles en el Neumarkt.",
    timeline: [
      { t: "09:30", h: "Tren Düsseldorf Hbf → Köln Hbf", d: "RE1, RE5, RE6 o S6 (lento). 25–35 min. ≈13 € por trayecto o Deutschlandticket.", tag: "transit" },
      { t: "10:15", h: "Catedral (Kölner Dom)", d: "Entrada gratis. Relicario de los Reyes Magos. Subir a la torre sur: 533 escalones (≈6 €)." },
      { t: "11:30", h: "Mercado de la Catedral", d: "Roncalliplatz: el árbol gigante y el techo de luces. Primer Glühwein del día." },
      { t: "12:30", h: "Comida en Früh am Dom", d: "Halver Hahn (¡no es medio pollo!) o Himmel un Ääd, con Kölsch." },
      { t: "13:45", h: "Altstadt y Heinzels Wintermärchen", d: "Alter Markt y Heumarkt: mercado de los gnomos (Heinzelmännchen) y pista de hielo." },
      { t: "15:00", h: "Rin → Museo del Chocolate", d: "Hafen-Weihnachtsmarkt junto al río y las Kranhäuser del Rheinauhafen." },
      { t: "16:15", h: "Atardecer en el puente Hohenzollern", d: "Cruza el puente de los candados hasta Deutz. Foto icónica de la catedral iluminada." },
      { t: "17:00", h: "KölnTriangle (opcional)", d: "Mirador en planta 29 (≈5 €). La catedral y el Rin de noche, desde arriba." },
      { t: "18:15", h: "Markt der Engel (Neumarkt)", d: "Estrellas colgando de los árboles y ángeles paseando: el más mágico de noche." },
      { t: "20:00", h: "Cena y vuelta", d: "Päffgen o Peters Brauhaus. Trenes de vuelta a Düsseldorf hasta tarde.", tag: "transit" },
    ],
    transit: [
      {
        from: "Düsseldorf Hbf", to: "Köln Hbf",
        lines: [{ n: "RE1", c: "#B71C1C" }, { n: "RE5", c: "#B71C1C" }, { n: "RE6", c: "#B71C1C" }, { n: "S6", c: "#2E7D32" }],
        time: "25–35 min", price: "≈13 €", freq: "varios por hora",
        steps: [
          "Compra en DB Navigator un billete Düsseldorf → Köln (tarifa NRW, solo regional).",
          "Coge cualquier RE (RE1/RE5/RE6) al Köln Hbf. La S6 también vale, pero tarda ~50 min.",
          "Ojo: los ICE/IC necesitan otro billete más caro. Con el regional sobra.",
          "Sal por la salida «Dom/Domplatte»: la catedral está enfrente.",
        ],
        alt: "Aviso: hay obras previstas en diciembre 2026 que pueden afectar a RE1/RE5 entre Düsseldorf y Köln-Mülheim. Mira DB Navigator la víspera; si fallan, usa RE6 o S6.",
      },
    ],
    xmas: [
      { id: "cgn-dommarkt", name: "Mercado de la Catedral", tag: "Mercado", img: "cgn_wmdom", short: "El más famoso de Alemania, bajo un techo de miles de luces.", desc: "En la Roncalliplatz, a los pies del Dom: el árbol de Navidad más alto de la región, casetas de tejado rojo y un manto de bombillas sobre todo el mercado. Escenario con conciertos por la tarde.", tip: "Va lleno a partir de las 17 h: visítalo por la mañana.", time: "45 min", price: "Gratis", q: "Weihnachtsmarkt am Kölner Dom" },
      { id: "cgn-heinzel", name: "Heinzels Wintermärchen", tag: "Mercado", img: "cgn_heinzel", short: "El mercado de los gnomos de Colonia en la Altstadt.", desc: "En Alter Markt y Heumarkt, dedicado a los Heinzelmännchen, los duendes que (según la leyenda) hacían el trabajo de los vecinos de noche. Pista de hielo, Eisstockschießen y casetas temáticas.", tip: "En el Heumarkt suele haber pista de patinaje: ver es gratis.", time: "45 min", price: "Gratis", q: "Heinzels Wintermärchen Köln" },
      { id: "cgn-hafen", name: "Hafen-Weihnachtsmarkt", tag: "Mercado", img: "cgn_choco", short: "Carpas blancas junto al río y al Museo del Chocolate.", desc: "El único junto al agua, con estética marinera. Perfecto para enlazar con el Museo del Chocolate y las Kranhäuser.", tip: "Prueba un Glühwein con chocolate o un Feuerzangenbowle (ponche flameado).", time: "30 min", price: "Gratis", q: "Hafen-Weihnachtsmarkt Köln" },
      { id: "cgn-engel", name: "Markt der Engel", tag: "Mercado", img: "cgn_engel", short: "Neumarkt: estrellas en los árboles y ángeles de verdad.", desc: "Casetas blancas bajo miles de luces estrella colgadas de los árboles, y personajes vestidos de ángel paseando. Más tranquilo y más bonito de noche.", tip: "Pide un Kinderpunsch si alguien no bebe alcohol.", time: "30 min", price: "Gratis", q: "Markt der Engel Neumarkt Köln" },
    ],
    always: [
      { id: "cgn-dom", name: "Kölner Dom", tag: "Imprescindible", img: "cgn_dom", short: "632 años de obras y Patrimonio de la Humanidad.", desc: "La catedral gótica más famosa de Alemania. Dentro: el Relicario de los Reyes Magos, las vidrieras de Gerhard Richter (pixeles de colores) y la Madonna de Milán.", tip: "Torre sur: 533 escalones, vistas a 97 m. Lleva monedas o tarjeta (≈6 €).", time: "1–1,5 h", price: "Gratis · Torre ≈6 €", q: "Kölner Dom" },
      { id: "cgn-bridge", name: "Puente Hohenzollern", tag: "Vistas", img: "cgn_bridge", short: "Miles de candados del amor sobre el Rin.", desc: "El puente ferroviario más transitado de Alemania, cubierto de candados. Crúzalo a Deutz para la foto clásica de la catedral con el puente.", tip: "Desde las escalinatas del Rheinboulevard (Deutz) se ve gratis la mejor postal.", time: "30 min", price: "Gratis", q: "Hohenzollernbrücke Köln" },
      { id: "cgn-altstadt", name: "Altstadt y Groß St. Martin", tag: "Barrio", img: "cgn_martin", short: "Casas de colores junto al río y una iglesia románica.", desc: "Alter Markt, el Ayuntamiento con su torre gótica y el Fischmarkt, con las casitas de colores que salen en todas las postales y Groß St. Martin detrás.", tip: "La foto: desde el Rheingarten, con las casas y la torre de St. Martin.", time: "45 min", price: "Gratis", q: "Fischmarkt Köln" },
      { id: "cgn-choco", name: "Museo del Chocolate", tag: "Museo", img: "cgn_choco", short: "Fuente de chocolate de 3 m y degustación.", desc: "Recorre la historia del cacao hasta una fábrica en marcha. La fuente de chocolate con barquillo es lo que todos quieren.", tip: "Tienda en la salida con chocolate de fábrica a buen precio.", time: "1,5 h", price: "≈16–18 €", q: "Schokoladenmuseum Köln" },
      { id: "cgn-kran", name: "Kranhäuser", tag: "Arquitectura", img: "cgn_kranhaus", short: "Tres edificios con forma de grúa en el antiguo puerto.", desc: "Las «casas grúa» del Rheinauhafen: oficinas y viviendas que recuerdan a las grúas portuarias. Paseo agradable junto al agua.", tip: "Al atardecer el reflejo en el Rin es espectacular.", time: "20 min", price: "Gratis", q: "Kranhäuser Rheinauhafen Köln" },
      { id: "cgn-triangle", name: "KölnTriangle", tag: "Vistas", img: "cgn_triangle", short: "El mirador con la mejor vista de la catedral.", desc: "Plataforma panorámica en la planta 29, al otro lado del Rin. Vista frontal del Dom, el puente y la Altstadt.", tip: "Ve después del atardecer para ver todo iluminado.", time: "30 min", price: "≈5 €", q: "KölnTriangle" },
      { id: "cgn-ludwig", name: "Museum Ludwig", tag: "Museo", img: "cgn_ludwig", short: "Picasso, Warhol y Lichtenstein junto a la catedral.", desc: "Una de las mayores colecciones de Picasso de Europa y de pop art fuera de EE. UU. Si llueve, es el plan.", tip: "Cierra los lunes; el miércoles está abierto.", time: "1,5 h", price: "≈13 €", q: "Museum Ludwig Köln" },
      { id: "cgn-4711", name: "Casa 4711", tag: "Historia", img: "cgn_4711", short: "La cuna del agua de Colonia, en la Glockengasse.", desc: "La tienda original del Eau de Cologne 4711. Fuente de colonia para probar y un carillón que suena a las horas en punto.", tip: "Gratis entrar. El carillón suena cada hora de 9 a 21 h.", time: "15 min", price: "Gratis", q: "4711 Glockengasse Köln" },
    ],
    food: [
      { name: "Früh am Dom", type: "Brauhaus", price: "€€", img: "cgn_frueh", what: "Kölsch, Halver Hahn y Himmel un Ääd.", note: "Al lado de la catedral; grande, sin reserva a mediodía.", q: "Früh am Dom Köln" },
      { name: "Päffgen", type: "Brauhaus", price: "€€", img: "cgn_koelsch", what: "Kölsch propio y cocina renana.", note: "Friesenstraße: más local y auténtico.", q: "Brauerei Päffgen Köln" },
      { name: "Peters Brauhaus", type: "Brauhaus", price: "€€", img: "cgn_altermarkt", what: "Rheinischer Sauerbraten y salchichas.", note: "En la Altstadt, precioso por dentro.", q: "Peters Brauhaus Köln" },
      { name: "Reibekuchen", type: "Street food", price: "€", img: "cgn_reibekuchen", what: "3 tortitas de patata + compota ≈5 €.", note: "En cualquier mercado navideño.", q: "Weihnachtsmarkt am Kölner Dom" },
      { name: "Halver Hahn", type: "Plato típico", price: "€", img: "cgn_halvehahn", what: "Panecillo de centeno, queso Gouda, mostaza y cebolla.", note: "El «medio pollo» que no es pollo.", q: "Früh am Dom Köln" },
      { name: "Glühwein & Co.", type: "Mercado", price: "€", img: "food_gluehwein", what: "Glühwein ≈4–5 € + depósito de taza.", note: "Cada mercado tiene su taza coleccionable.", q: "Markt der Engel Köln" },
    ],
    walk: {
      title: "Ruta circular por Colonia",
      total: "≈ 5,5 km · 1 h 20 min sin paradas",
      stops: [
        { n: "Köln Hbf · salida Dom", m: "" },
        { n: "Kölner Dom · Roncalliplatz", m: "2′" },
        { n: "Casa 4711 (Glockengasse)", m: "8′" },
        { n: "Alter Markt · Heumarkt", m: "8′" },
        { n: "Fischmarkt · Groß St. Martin", m: "3′" },
        { n: "Rheingarten → Museo del Chocolate", m: "12′" },
        { n: "Kranhäuser · Rheinauhafen", m: "8′" },
        { n: "Puente Hohenzollern → Deutz", m: "25′" },
        { n: "Neumarkt · Markt der Engel", m: "15′ en tranvía" },
      ],
      gmaps: ["Köln Hauptbahnhof", "Kölner Dom", "4711 Glockengasse Köln", "Alter Markt Köln", "Fischmarkt Köln", "Schokoladenmuseum Köln", "Kranhäuser Köln", "Hohenzollernbrücke Köln", "KölnTriangle"],
    },
  },

  /* ------------------------------------------------ DÍA 3 */
  {
    id: "d3",
    num: "10",
    weekday: "Jueves",
    date: "2026-12-10",
    city: "Maastricht",
    cityKey: "mst",
    accent: "#2F5442",
    accentSoft: "#DDE8E1",
    kicker: "Cruzamos frontera",
    title: "Maastricht",
    subtitle: "Puentes de piedra, vlaai y una librería dentro de una iglesia",
    hero: "mst_city",
    heroAlt: "Maastricht junto al río Mosa",
    intro:
      "Holanda, pero sin canales ni molinos de postal: Maastricht es borgoñona, de calles empedradas y plazas con terrazas. El bus os deja detrás de la estación; desde ahí, todo se hace andando en 15–20 min. Jueves = koopavond: tiendas abiertas hasta las 21 h.",
    timeline: [
      { t: "08:00", h: "FlixBus Düsseldorf → Maastricht", d: "Sale de la ZOB (estación de autobuses) en la Worringer Straße, detrás del Hbf. ≈2 h.", tag: "transit" },
      { t: "10:00", h: "Llegada a Maastricht", d: "Parada en Meerssenerweg, detrás de la estación. Cruza el edificio de la estación hacia el Stationsplein." },
      { t: "10:15", h: "Wyck y café", d: "Stationsstraat → Wycker Brugstraat: el barrio más cool, con cafeterías y boutiques." },
      { t: "10:45", h: "Puente de San Servacio", d: "El puente más antiguo de Holanda (s. XIII). Vista del Mosa y del perfil de la ciudad." },
      { t: "11:15", h: "Markt, OLV-plein y Stokstraat", d: "Ayuntamiento, la plaza de Nuestra Señora con su basílica y la calle más elegante." },
      { t: "12:00", h: "Helpoort y Jekerkwartier", d: "La puerta de ciudad más antigua del país (1229), las murallas y el molino-panadería Bisschopsmolen." },
      { t: "13:00", h: "Comida: patatas Reitz o zuurvlees", d: "Friture Reitz en el Markt (desde 1909) o zuurvlees (estofado agridulce) en Café Sjiek." },
      { t: "14:30", h: "Boekhandel Dominicanen", d: "Librería dentro de una iglesia gótica del s. XIII. Café en el coro." },
      { t: "15:15", h: "Vrijthof · Magisch Maastricht", d: "Pista de hielo, noria, casetas y las dos iglesias: San Servacio y San Juan (torre roja)." },
      { t: "17:00", h: "Compras (koopavond)", d: "Los jueves las tiendas abren hasta las 21 h. Grote Staat, Entre Deux, Mosae Forum." },
      { t: "19:00", h: "Bus de vuelta a Düsseldorf", d: "Elige la salida de la tarde-noche en la app de FlixBus. Misma parada en Meerssenerweg.", tag: "transit" },
    ],
    transit: [
      {
        from: "Düsseldorf ZOB (Hbf)", to: "Maastricht · Meerssenerweg",
        lines: [{ n: "FlixBus", c: "#5FA800" }],
        time: "≈2 h", price: "≈10–25 €", freq: "varias al día",
        steps: [
          "Compra en la app de FlixBus con antelación (más barato). Revisa la parada exacta en el billete.",
          "La ZOB de Düsseldorf está en la Worringer Straße: salida norte/este del Hbf, 3 min a pie.",
          "En Maastricht el bus para en la estación internacional de Meerssenerweg, detrás de la estación de tren.",
          "Atraviesa la estación por el pasillo interior hasta el Stationsplein (fachada principal).",
        ],
        alt: "Alternativa en tren: RE4 Düsseldorf → Aachen Hbf (~1 h 30) + RE18 a Maastricht (~50 min). Total ≈2 h 30.",
      },
      {
        from: "Estación de Maastricht", to: "Centro (Markt / Vrijthof)",
        lines: [{ n: "A pie", c: "#2F5442" }, { n: "Bus", c: "#00A3E0" }],
        time: "15–20 min", price: "Gratis / ≈2 €", freq: "—",
        steps: [
          "Sal al Stationsplein y sigue recto por la Stationsstraat (oeste).",
          "Continúa por la Wycker Brugstraat hasta el Mosa.",
          "Cruza el Sint Servaasbrug: al otro lado, el Markt queda a 3 min a la derecha y el Vrijthof a 8 min recto.",
          "En bus: casi todos los de Arriva desde la estación paran en «Maastricht, Markt». Paga con tarjeta contactless (OVpay): pasa al subir y al bajar.",
        ],
        alt: "Truco: en Holanda se paga con tarjeta en casi todo (incluso a veces SOLO tarjeta). En Alemania, al revés: lleva efectivo.",
      },
    ],
    xmas: [
      { id: "mst-magisch", name: "Magisch Maastricht", tag: "Mercado", img: "mst_magisch", short: "El Vrijthof convertido en pueblo de invierno.", desc: "Del 27 nov al 27 dic: pista de hielo, noria gigante, casetas de madera y luces sobre la plaza principal, con las basílicas de fondo. Entrada libre.", tip: "Sube a la noria al anochecer: la vista sobre las dos torres es la postal del viaje.", time: "1 h", price: "Gratis · noria y pista de pago", q: "Vrijthof Maastricht" },
      { id: "mst-xmaslights", name: "Luces de Wyck y el centro", tag: "Paseo", img: "mst_wyck", short: "Calles iluminadas y escaparates de Navidad.", desc: "Wycker Brugstraat, Stokstraat y la Grote Staat se decoran con guirnaldas. Paseo perfecto al caer la tarde (16:30) con las tiendas abiertas.", tip: "Jueves: tiendas abiertas hasta las 21 h.", time: "45 min", price: "Gratis", q: "Wycker Brugstraat Maastricht" },
      { id: "mst-dominicanen-x", name: "Dominicanen en Navidad", tag: "Cultura", img: "mst_dominicanen", short: "La librería-iglesia con su árbol y ambiente de invierno.", desc: "Entre estanterías bajo bóvedas góticas y frescos del s. XIV. En diciembre, con decoración navideña, es aún más especial.", tip: "Tómate un chocolate en el café del coro (Coffeelovers).", time: "30 min", price: "Gratis", q: "Boekhandel Dominicanen Maastricht" },
    ],
    always: [
      { id: "mst-vrijthof", name: "Vrijthof", tag: "Plaza", img: "mst_vrijthof", short: "La gran plaza, rodeada de terrazas y dos basílicas.", desc: "El salón de la ciudad: aquí da André Rieu sus conciertos en verano. A un lado, la Basílica de San Servacio (románica) y la iglesia de San Juan, con su torre roja.", tip: "La torre roja de Sint Janskerk se puede subir (≈2,50 €, 218 escalones) cuando está abierta.", time: "30 min", price: "Gratis", q: "Vrijthof Maastricht" },
      { id: "mst-servaas", name: "Basílica de San Servacio", tag: "Historia", img: "mst_servaas", short: "Una de las iglesias más antiguas de Holanda.", desc: "Sobre la tumba del primer obispo de los Países Bajos. Su tesoro tiene relicarios medievales impresionantes.", tip: "El acceso al tesoro es de pago; la nave, a veces gratis.", time: "40 min", price: "≈5–8 €", q: "Sint-Servaasbasiliek Maastricht" },
      { id: "mst-brug", name: "Sint Servaasbrug", tag: "Vistas", img: "mst_brug", short: "El puente más antiguo de Holanda.", desc: "Puente de piedra del s. XIII sobre el Mosa que une Wyck con el centro. Uno de sus tramos se puede levantar para dejar pasar barcos.", tip: "Para la foto, ve al muelle del lado de Wyck mirando al centro.", time: "15 min", price: "Gratis", q: "Sint Servaasbrug Maastricht" },
      { id: "mst-markt", name: "Markt y Stadhuis", tag: "Plaza", img: "mst_stadhuis", short: "El Ayuntamiento del s. XVII y la estatua de Minckelers.", desc: "Plaza del mercado con el Ayuntamiento clasicista, la estatua del inventor del gas de alumbrado y la famosa freiduría Reitz.", tip: "Mercado semanal: miércoles y viernes (el jueves no hay).", time: "20 min", price: "Gratis", q: "Markt Maastricht" },
      { id: "mst-olv", name: "Onze Lieve Vrouweplein", tag: "Plaza", img: "mst_olv", short: "La plaza más bonita, con terrazas bajo los árboles.", desc: "Pequeña plaza arbolada frente a la Basílica de Nuestra Señora, con la capilla de la Star of the Sea llena de velas.", tip: "Café y vlaai en una terraza con estufas: plan perfecto de diciembre.", time: "20 min", price: "Gratis", q: "Onze Lieve Vrouweplein Maastricht" },
      { id: "mst-helpoort", name: "Helpoort y murallas", tag: "Historia", img: "mst_helpoort", short: "La puerta de ciudad más antigua de Holanda (1229).", desc: "Puerta medieval y tramo de murallas junto al parque Stadspark y el río Jeker.", tip: "Sigue la muralla hacia el Stadspark: es un paseo precioso y tranquilo.", time: "30 min", price: "Gratis", q: "Helpoort Maastricht" },
      { id: "mst-molen", name: "Jekerkwartier y Bisschopsmolen", tag: "Barrio", img: "mst_molen", short: "El barrio universitario y un molino de agua que hornea vlaai.", desc: "Calles estrechas, canales del río Jeker y la Bisschopsmolen: molino de agua de origen medieval que todavía muele la harina de su propia panadería.", tip: "Compra una porción de vlaai de temporada y cómela junto a la rueda del molino.", time: "40 min", price: "€", q: "Bisschopsmolen Maastricht" },
      { id: "mst-dominicanen", name: "Boekhandel Dominicanen", tag: "Imprescindible", img: "mst_dominicanen", short: "Una de las librerías más bonitas del mundo.", desc: "Iglesia dominica del s. XIII reconvertida en librería con estructura de acero negro de tres pisos. Arriba, vistas sobre la nave.", tip: "Sube al último nivel para la foto cenital.", time: "30 min", price: "Gratis", q: "Boekhandel Dominicanen Maastricht" },
      { id: "mst-geis", name: "Mestreechter Geis", tag: "Curiosidad", img: "mst_geis", short: "La estatuilla que representa el espíritu de la ciudad.", desc: "Pequeña escultura de bronce en la Het Bat, junto al Mosa: simboliza el carácter alegre y borgoñón de los maastrichtenses.", tip: "Está de camino entre el puente y el Helpoort.", time: "5 min", price: "Gratis", q: "Mestreechter Geis Maastricht" },
    ],
    food: [
      { name: "Friture Reitz", type: "Patatas fritas", price: "€", img: "food_frites", what: "Patatas con mayonesa o salsa stoofvlees ≈4–6 €.", note: "En el Markt desde 1909. La mejor comida barata.", q: "Friture Reitz Maastricht" },
      { name: "Bisschopsmolen", type: "Panadería", price: "€", img: "mst_molen", what: "Vlaai de cereza, albaricoque o arroz.", note: "Molino de agua que funciona.", q: "Bisschopsmolen Maastricht" },
      { name: "Café Sjiek", type: "Cocina local", price: "€€", img: "mst_olvplein", what: "Zuurvlees con patatas y una cerveza local.", note: "Sint Pieterstraat. Sin reserva: llega pronto.", q: "Café Sjiek Maastricht" },
      { name: "Vlaai", type: "Dulce típico", price: "€", img: "mst_vlaai", what: "Tarta de masa de pan con fruta, ≈3 € la porción.", note: "En cualquier panadería; pide «een stukje».", q: "Bakkerij Mosterd Maastricht" },
      { name: "Coffeelovers Dominicanen", type: "Café", price: "€", img: "mst_dominicanen", what: "Café y tarta en el coro de una iglesia gótica.", note: "Dentro de la librería.", q: "Coffeelovers Dominicanen Maastricht" },
      { name: "Magisch Maastricht", type: "Mercado", price: "€", img: "food_gluehwein", what: "Glühwein (aquí «glühwein» o «bisschopswijn») y poffertjes.", note: "Las poffertjes (mini tortitas) son obligatorias.", q: "Vrijthof Maastricht" },
    ],
    walk: {
      title: "Del autobús al Vrijthof",
      total: "≈ 4 km · 55 min sin paradas",
      stops: [
        { n: "Bus · Meerssenerweg", m: "" },
        { n: "Atravesar la estación → Stationsplein", m: "3′" },
        { n: "Stationsstraat · Wycker Brugstraat", m: "6′" },
        { n: "Sint Servaasbrug", m: "3′" },
        { n: "Markt · Stadhuis", m: "4′" },
        { n: "Onze Lieve Vrouweplein", m: "6′" },
        { n: "Helpoort · murallas", m: "5′" },
        { n: "Bisschopsmolen · Jekerkwartier", m: "5′" },
        { n: "Boekhandel Dominicanen", m: "6′" },
        { n: "Vrijthof · Magisch Maastricht", m: "3′" },
      ],
      gmaps: ["Maastricht station", "Wycker Brugstraat Maastricht", "Sint Servaasbrug", "Markt Maastricht", "Onze Lieve Vrouweplein Maastricht", "Helpoort Maastricht", "Bisschopsmolen Maastricht", "Boekhandel Dominicanen", "Vrijthof Maastricht"],
    },
  },

  /* ------------------------------------------------ DÍA 4 */
  {
    id: "d4",
    num: "11",
    weekday: "Viernes",
    date: "2026-12-11",
    city: "Düsseldorf",
    cityKey: "dus",
    accent: "#3A3550",
    accentSoft: "#E3E1EA",
    kicker: "Vuelta",
    title: "Hasta pronto",
    subtitle: "Mañana tranquila y vuelo a las 16:30",
    hero: "dus_medienhafen",
    heroAlt: "MedienHafen de Düsseldorf",
    intro:
      "Mañana para lo que quedó pendiente: desayuno en el mercado de Carlsplatz, MedienHafen con luz de día o subir a la Rheinturm. Comida temprana y a las 13:45 rumbo al aeropuerto. Hay que estar en DUS hacia las 14:30.",
    timeline: [
      { t: "09:00", h: "Desayuno en Carlsplatz", d: "Mercado gourmet cubierto: café, pan, Reibekuchen y dulces." },
      { t: "10:15", h: "MedienHafen y Rheinturm", d: "Edificios de Gehry con luz de día y, si apetece, mirador de la Rheinturm (abre ≈10 h)." },
      { t: "12:00", h: "Comida temprana", d: "Último ramen en Little Tokyo o última Currywurst. Compras de última hora: Altbier-Senf (mostaza) y galletas Printen." },
      { t: "13:15", h: "Recoger maletas", d: "Vuelve al hotel / consigna (taquillas en el Hbf)." },
      { t: "13:45", h: "S11 → Flughafen Terminal", d: "Desde Düsseldorf Hbf, 12 min. Mismo billete que a la ida.", tag: "transit" },
      { t: "14:30", h: "En el aeropuerto", d: "Vuelo Schengen: con 2 h de margen vas sobrado." },
      { t: "16:30", h: "Vuelo a Madrid", d: "Auf Wiedersehen · Tot ziens · Hasta la próxima." },
    ],
    transit: [
      {
        from: "Düsseldorf Hbf", to: "Aeropuerto DUS",
        lines: [{ n: "S11", c: "#2E7D32" }],
        time: "12 min", price: "≈3,80 €", freq: "cada 20 min",
        steps: [
          "Andén de la S11 dirección «Düsseldorf Flughafen Terminal».",
          "Bájate en la última parada: subes directo a la terminal.",
          "Si se retrasa: cualquier RE/RB a «Flughafen (Fernbahnhof)» + SkyTrain gratuito a la terminal (5 min).",
        ],
        alt: "Taquillas de equipaje: en el Hbf de Düsseldorf hay consignas automáticas.",
      },
    ],
    xmas: [
      { id: "dus4-sternchen", name: "Sternchenmarkt", tag: "Mercado", img: "dus_wm2", short: "Schadowstraße: estrellas sobre las casetas.", desc: "El mercado de las estrellas, en la calle comercial Schadowstraße. Buen sitio para comprar adornos de última hora.", tip: "Está entre el Hbf y la Kö: pilla de camino.", time: "20 min", price: "Gratis", q: "Schadowstraße Düsseldorf" },
      { id: "dus4-engel", name: "Último Glühwein", tag: "Mercado", img: "food_gluehwein", short: "Despedida en el Engelchen-Markt.", desc: "Los mercados abren hacia las 11 h. Un último vino caliente con las tazas que aún no tienes.", tip: "No te pases: luego hay control de seguridad 😉", time: "20 min", price: "≈5 €", q: "Engelchen-Markt Düsseldorf" },
    ],
    always: [
      { id: "dus4-carls", name: "Carlsplatz", tag: "Mercado", img: "dus_carlsplatz", short: "El mercado gourmet de la ciudad.", desc: "Más de 60 puestos: fruta, quesos, flores, café y comida para llevar. El desayuno perfecto.", tip: "La mostaza de Düsseldorf (Löwensenf) es el souvenir que nadie se espera.", time: "45 min", price: "€", q: "Carlsplatz Düsseldorf" },
      { id: "dus4-medien", name: "MedienHafen de día", tag: "Arquitectura", img: "dus_medienhafen", short: "Gehry con luz natural.", desc: "Los Neuer Zollhof cambian de color según la luz. Pasea por las dársenas y el Hafenbrücke.", tip: "15–20 min a pie desde la Altstadt por el paseo del Rin.", time: "45 min", price: "Gratis", q: "Neuer Zollhof Düsseldorf" },
      { id: "dus4-hofgarten", name: "Hofgarten", tag: "Parque", img: "dus_hofgarten", short: "El parque público más antiguo de Alemania.", desc: "Un respiro verde (o invernal) detrás de la Kö-Bogen, con el estanque y el Jägerhof.", tip: "Atajo entre la Kö y la Altstadt.", time: "30 min", price: "Gratis", q: "Hofgarten Düsseldorf" },
    ],
    food: [
      { name: "Carlsplatz", type: "Desayuno", price: "€", img: "dus_carlsplatz", what: "Café, Brötchen y algo dulce.", note: "Ideal antes de las 10 h.", q: "Carlsplatz Düsseldorf" },
      { name: "Naniwa", type: "Ramen", price: "€", img: "food_ramen", what: "Ramen de despedida.", note: "Abre a mediodía: ve pronto.", q: "Naniwa Noodles Düsseldorf" },
      { name: "Bäckerei Hinkel", type: "Panadería", price: "€", img: "food_stollen", what: "Stollen y pan de la casa.", note: "Panadería mítica de la Altstadt.", q: "Bäckerei Hinkel Düsseldorf" },
    ],
    walk: null,
  },
];

/* Guía práctica */
const ESSENTIALS = [
  { icon: "ticket", title: "¿Deutschlandticket?", body: "63 €/mes, transporte regional ilimitado en Alemania (S, U, tranvía, RE/RB; no ICE). Sumando aeropuerto ida/vuelta (7,60 €), Colonia ida/vuelta (≈26 €) y metros (≈15 €) salís por ≈50 € en billetes sueltos. Compensa si añadís algún trayecto en tren (p. ej. a Aachen). Es suscripción: cancélala antes del 10 de diciembre." },
  { icon: "cash", title: "Efectivo en Alemania", body: "Muchos Brauhaus (Uerige, Päffgen…) y puestos de mercado aceptan solo efectivo. Lleva 60–80 € en billetes pequeños. En Holanda pasa lo contrario: tarjeta en casi todo." },
  { icon: "cup", title: "El Pfand de la taza", body: "El Glühwein se sirve en taza de cerámica con depósito (≈3–5 €). Devuélvela en cualquier caseta del mismo mercado o quédatela: cada mercado tiene la suya." },
  { icon: "weather", title: "Clima y luz", body: "Entre 1 y 7 °C, a menudo húmedo. Amanece hacia las 8:20 y anochece sobre las 16:25: planifica lo exterior temprano y deja los mercados para la noche." },
  { icon: "beer", title: "Altbier vs Kölsch", body: "En Düsseldorf se pide Alt (oscura, 0,25 l); en Colonia, Kölsch (rubia, en «Stange» de 0,2 l). Nunca pidas Kölsch en Düsseldorf. El camarero (Köbes) te repone hasta que pongas el posavasos encima del vaso." },
  { icon: "app", title: "Apps útiles", body: "DB Navigator (trenes y billetes), Rheinbahn (Düsseldorf), FlixBus, 9292 (transporte en Holanda) y Google Maps sin conexión descargado para las tres ciudades." },
  { icon: "plug", title: "Lo básico", body: "Mismo enchufe que en España. Emergencias: 112. Roaming UE incluido. Agua del grifo potable." },
];

const PHRASES = [
  { es: "Hola / Adiós", de: "Hallo / Tschüss", nl: "Hoi / Doei" },
  { es: "Gracias", de: "Danke", nl: "Dank je" },
  { es: "Una cerveza, por favor", de: "Ein Alt / Kölsch, bitte", nl: "Een biertje, alstublieft" },
  { es: "La cuenta", de: "Zahlen, bitte", nl: "De rekening, graag" },
  { es: "¿Puedo pagar con tarjeta?", de: "Kann ich mit Karte zahlen?", nl: "Kan ik pinnen?" },
  { es: "¡Salud!", de: "Prost!", nl: "Proost!" },
  { es: "¡Feliz Navidad!", de: "Frohe Weihnachten!", nl: "Vrolijk kerstfeest!" },
];
