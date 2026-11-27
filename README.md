# Invierno en el Rin · 2026

Cuaderno de viaje interactivo para **Düsseldorf · Köln · Aachen (Aquisgrán)** (8–11 diciembre 2026).
Web estática pensada para añadirse a la pantalla de inicio del móvil: pantalla completa, sin zoom y con modo sin conexión.

## Qué incluye

- **Portada** con fotos animadas, nieve y cuenta atrás (durante el viaje muestra «Día X de 4» y un botón «Ir a hoy»).
- **La ruta**: mapa dibujado a mano (Rin, Mosa y fronteras) que traza cada trayecto mientras haces scroll.
- **Un capítulo por día**: plan por horas (marca lo que ya pasó y lo que toca *ahora*), billetes de transporte paso a paso, sitios que ver con modo **Navidad / Todo el año**, dónde comer barato y ruta a pie que se abre en Google Maps.
- **Fichas** de cada sitio con foto, consejo, tiempo, precio y distancias a pie al resto; puedes marcarlos como vistos.
- **Mercados navideños** con horarios oficiales 2026, mini-mapa, minutos a pie entre ellos y aviso «abierto ahora».
- **Joyas escondidas** (EKŌ-Haus, K21 In Orbit, Kolumba, Carolus Thermen…) y **explorador de distancias**: eliges un origen y ves cuánto se tarda andando a todo lo demás.
- **Apartamento como base** (Talstraße 9): distancias desde el apartamento y botón «Volver al apartamento» en cada día.
- **Vuelos Málaga ⇄ Weeze** (llegada 12:30, vuelta 14:55) con bus SW1 + RE10 y horarios orientativos.
- **Distancias reales a pie** calculadas por calles (OpenStreetMap / OSRM) y guardadas en la app (funcionan sin conexión).
- **Cerca de mí**: con tu ubicación, cada sitio muestra «a X min de ti» y se puede ordenar por cercanía.
- **Modo oscuro** automático de noche (17:00–8:00) o manual.
- **Plan B si llueve** (se abre solo si la previsión da lluvia).
- **Lo nuestro / Si sobra tiempo**: cada día enseña primero solo lo que queréis ver (mercados, catedrales, EKŌ-Haus, Little Tokyo…) y aparte lo secundario.
- **Hoy veréis**: franja con fotos de las paradas del día y los minutos andando entre ellas.
- **En cifras**: datos curiosos con números animados y una pizarra de precios (Glühwein, fianza de la taza, Kölsch, entradas…).
- **Mapa del día** a pantalla completa (MapLibre + OpenFreeMap): edificios en 3D, ruta a pie real que se dibuja sola, marcadores por tipo (imprescindible, mercado, comer, opcional), tu posición y tarjetas deslizables sincronizadas con el mapa.
- **Modo paseo**: los imprescindibles del día como historias a pantalla completa (tocar para avanzar, mantener para pausar, deslizar abajo para cerrar).
- **Tarjeta «Ahora»** durante el viaje: qué toca, qué viene después y cuánto falta. Para probarla antes: añade `?ahora=2026-12-08T16:10` a la dirección.
- **Tiempo real** (Open-Meteo) en cada día cuando la fecha entra en la previsión de 16 días.
- **Kit de viaje**: Deutschlandticket, efectivo, Pfand, frases en alemán con pronunciación y checklist que se guarda.

## Publicar con GitHub Pages

1. En GitHub: **Settings → Pages**.
2. *Source*: «Deploy from a branch», elige la rama y la carpeta `/ (root)`.
3. Abre la URL en Safari del iPhone → **Compartir → Añadir a pantalla de inicio**.
4. Dentro de la app, en *Info*, pulsa **Guardar sin conexión** para descargar todas las fotos.

## Estructura

```
index.html           página
css/style.css        estilos
js/data.js           contenido del viaje (editar aquí horarios, sitios, comida)
js/images.js         fotos (Wikimedia Commons)
js/app.js            interacción
sw.js                modo sin conexión
manifest.webmanifest pantalla completa / icono
credits.html         créditos de las fotos
```

Precios y horarios son aproximados (noviembre 2026): confirmad trenes en DB Navigator la víspera.
