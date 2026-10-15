// categorias.js — Desplegable para filtrar las palabras por categoría.
// Solo usa: filtros, aplicarFiltros(), PALABRAS y el elemento #controles.
(function () {
  const controles = document.getElementById("controles");

  const NOMBRES = {
    es: { todas: "Todas las categorías", control: "Control", funciones: "Funciones", clases: "Clases", excepciones: "Excepciones", otros: "Otros" },
    en: { todas: "All categories", control: "Control", funciones: "Functions", clases: "Classes", excepciones: "Exceptions", otros: "Others" }
  };

  // "todas" + las categorías que existen en PALABRAS, sin repetir y en orden de aparición.
  const categorias = ["todas"];
  PALABRAS.forEach(function (p) {
    if (!categorias.includes(p.categoria)) categorias.push(p.categoria);
  });

  const desplegable = document.createElement("select");
  desplegable.id = "categoria";
  desplegable.setAttribute("aria-label", "Filtrar por categoría");
  desplegable.style.cssText =
    "margin-top:16px;padding:10px 14px;font-family:Arial,Helvetica,sans-serif;font-size:1rem;" +
    "color:#0b1d3a;background:#e6f2ff;border:2px solid #1f5fa8;border-radius:10px;cursor:pointer;min-width:220px;";

  function rellenarOpciones() {
    const idioma = document.documentElement.lang === "en" ? "en" : "es";
    desplegable.innerHTML = "";
    categorias.forEach(function (cat) {
      const opcion = document.createElement("option");
      opcion.value = cat;
      opcion.textContent = NOMBRES[idioma][cat] || cat;
      desplegable.appendChild(opcion);
    });
    desplegable.value = filtros.categoria;
  }

  desplegable.addEventListener("change", function () {
    filtros.categoria = desplegable.value;
    aplicarFiltros();
  });

  // Coloca el desplegable en #controles y oculta los botones provisionales de categoría.
  function colocar() {
    controles.querySelectorAll(".chips").forEach(function (chips) {
      chips.style.display = "none";
    });
    if (!controles.contains(desplegable)) {
      controles.appendChild(desplegable);
      rellenarOpciones();
    }
  }

  colocar();
  new MutationObserver(colocar).observe(controles, { childList: true });
})();