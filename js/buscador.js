// buscador.js — Campo de texto para filtrar las palabras por nombre.
// Solo usa: filtros, aplicarFiltros(), PALABRAS y el elemento #controles.
(function () {
  const controles = document.getElementById("controles");

  const campo = document.createElement("input");
  campo.type = "search";
  campo.id = "buscador";
  campo.dataset.origen = "buscador.js";
  campo.autocomplete = "off";
  campo.setAttribute("aria-label", "Buscar palabra");

  function ponerPlaceholder() {
    const ejemplo = PALABRAS.length > 0 ? PALABRAS[0].palabra : "for";
    campo.placeholder = document.documentElement.lang === "en"
      ? "Type a keyword, e.g. " + ejemplo + "..."
      : "Escribe una palabra, p. ej. " + ejemplo + "...";
  }

  campo.addEventListener("input", function () {
    filtros.texto = campo.value;
    aplicarFiltros();
  });

  // Coloca este buscador en #controles y retira cualquier otro campo con el mismo id.
  function colocar() {
    controles.querySelectorAll("#buscador").forEach(function (otro) {
      if (otro !== campo) otro.remove();
    });
    if (!controles.contains(campo)) {
      const fila = controles.querySelector(".fila-busqueda") || controles;
      fila.insertBefore(campo, fila.firstChild);
    }
    campo.value = filtros.texto;
    ponerPlaceholder();
  }

  colocar();
  new MutationObserver(colocar).observe(controles, { childList: true, subtree: true });
})();