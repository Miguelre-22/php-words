# PHP Words

Aplicación web estática que muestra las palabras reservadas de PHP en tarjetas interactivas.

## Ejecución

Abre `index.html` con doble clic. No necesita servidor, módulos, librerías externas ni `fetch`.

## Estructura

```
php-words/
├── index.html
├── README.md
├── notas.txt        (se crea a mano en la Misión 1)
├── css/
│   └── estilos.css
└── js/
    ├── config.js    APP_TITULO, APP_SUBTITULO, APP_VERSION
    ├── palabras.js  PALABRAS (una palabra por línea)
    └── app.js       filtros + aplicarFiltros()
```

## Funcionalidades

- Buscador por texto y filtro por categoría (control, funciones, clases, excepciones, otros).
- Tarjetas que giran al hacer clic (o con Enter/Espacio) para mostrar la descripción.
- Botón de idioma ES/EN (español por defecto).
- Contador "Mostrando N de M palabras".
