# Rin & Mosa · Invierno 2026

Cuaderno de viaje interactivo para **Düsseldorf · Köln · Maastricht** (8–11 diciembre 2026).
Web estática pensada para añadirse a la pantalla de inicio del móvil: pantalla completa, sin zoom y con modo sin conexión.

## Qué incluye

- **Portada** con fotos animadas, nieve y cuenta atrás (durante el viaje muestra «Día X de 4» y un botón «Ir a hoy»).
- **La ruta**: mapa dibujado a mano (Rin, Mosa y fronteras) que traza cada trayecto mientras haces scroll.
- **Un capítulo por día**: plan por horas (marca lo que ya pasó y lo que toca *ahora*), billetes de transporte paso a paso, sitios que ver con modo **Navidad / Todo el año**, dónde comer barato y ruta a pie que se abre en Google Maps.
- **Fichas** de cada sitio con foto, consejo, tiempo y precio; puedes marcarlos como vistos.
- **Tiempo real** (Open-Meteo) en cada día cuando la fecha entra en la previsión de 16 días.
- **Kit de viaje**: Deutschlandticket, efectivo, Pfand, frases en alemán y neerlandés y checklist que se guarda.

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

Precios y horarios son aproximados (noviembre 2026): confirmad trenes en DB Navigator y buses en FlixBus la víspera.
