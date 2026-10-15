let filtros = { texto: "", categoria: "todas" };

let idioma = "es";

const TEXTOS = {
  es: {
    subtitulo: APP_SUBTITULO,
    buscar: "Buscar palabra...",
    contador: "Mostrando {n} de {m} palabras",
    vacio: "No hay palabras que coincidan con la búsqueda.",
    girar: "Pulsa para ver la descripción",
    volver: "Pulsa para volver",
    botonIdioma: "EN",
    tituloBoton: "Switch to English",
    categorias: { todas: "Todas", control: "Control", funciones: "Funciones", clases: "Clases", excepciones: "Excepciones", otros: "Otros" }
  },
  en: {
    subtitulo: "PHP reserved words",
    buscar: "Search word...",
    contador: "Showing {n} of {m} words",
    vacio: "No words match your search.",
    girar: "Tap to see the description",
    volver: "Tap to go back",
    botonIdioma: "ES",
    tituloBoton: "Cambiar a español",
    categorias: { todas: "All", control: "Control", funciones: "Functions", clases: "Classes", excepciones: "Exceptions", otros: "Others" }
  }
};

const DESCRIPCIONES_EN = {
  if: "Runs a block of code only if the condition is true.",
  else: "Alternative block that runs when the if condition is false.",
  elseif: "Checks a new condition when the previous ones were false.",
  switch: "Compares an expression against several possible cases.",
  case: "Defines each possible value inside a switch.",
  while: "Repeats a block while the condition is true.",
  for: "Loop with initialisation, condition and increment.",
  foreach: "Iterates over every element of an array or iterable object.",
  break: "Immediately exits the current loop or switch.",
  continue: "Skips to the next iteration of the loop.",
  match: "Strict comparison expression that returns a value (PHP 8).",
  function: "Declares a reusable function.",
  return: "Returns a value and ends the function's execution.",
  fn: "Declares a single-expression arrow function.",
  yield: "Hands a value out of a generator without ending the function.",
  static: "Variable that keeps its value between calls, or class member.",
  class: "Declares a class, a blueprint for creating objects.",
  new: "Creates a new instance of a class.",
  extends: "Indicates that a class inherits from another.",
  implements: "Indicates that a class fulfils one or more interfaces.",
  interface: "Defines the methods a class must implement.",
  abstract: "Class or method that cannot be used without being inherited.",
  trait: "Reusable block of methods shared between classes.",
  public: "Member accessible from anywhere in the code.",
  private: "Member accessible only from its own class.",
  protected: "Member accessible from the class and its subclasses.",
  try: "Opens a block where exceptions may occur.",
  catch: "Catches and handles an exception thrown in the try.",
  finally: "Block that always runs, whether there was an exception or not.",
  throw: "Throws an exception.",
  echo: "Outputs one or more strings to the screen.",
  namespace: "Groups classes and functions to avoid name clashes.",
  use: "Imports a namespace, class or trait.",
  require: "Includes a file and stops the script if it is missing.",
  include: "Includes a file and only warns if it is missing.",
  const: "Defines a constant whose value never changes."
};

function crearControles() {
  const controles = document.getElementById("controles");
  const t = TEXTOS[idioma];
  controles.innerHTML = "";

  const fila = document.createElement("div");
  fila.className = "fila-busqueda";

  const buscador = document.createElement("input");
  buscador.type = "search";
  buscador.id = "buscador";
  buscador.placeholder = t.buscar;
  buscador.value = filtros.texto;
  buscador.addEventListener("input", function () {
    filtros.texto = buscador.value;
    aplicarFiltros();
  });

  const botonIdioma = document.createElement("button");
  botonIdioma.type = "button";
  botonIdioma.className = "boton-idioma";
  botonIdioma.textContent = t.botonIdioma;
  botonIdioma.title = t.tituloBoton;
  botonIdioma.addEventListener("click", function () {
    idioma = idioma === "es" ? "en" : "es";
    traducirPagina();
  });

  fila.appendChild(buscador);
  fila.appendChild(botonIdioma);
  controles.appendChild(fila);

  const chips = document.createElement("div");
  chips.className = "chips";
  Object.keys(t.categorias).forEach(function (clave) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip" + (filtros.categoria === clave ? " activo" : "");
    chip.textContent = t.categorias[clave];
    chip.addEventListener("click", function () {
      filtros.categoria = clave;
      document.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("activo"); });
      chip.classList.add("activo");
      aplicarFiltros();
    });
    chips.appendChild(chip);
  });
  controles.appendChild(chips);
}

function aplicarFiltros() {
  const lista = document.getElementById("lista");
  const contador = document.getElementById("contador");
  const t = TEXTOS[idioma];
  const texto = filtros.texto.trim().toLowerCase();

  const resultado = PALABRAS.filter(function (p) {
    const coincideTexto = p.palabra.toLowerCase().includes(texto);
    const coincideCategoria = filtros.categoria === "todas" || p.categoria === filtros.categoria;
    return coincideTexto && coincideCategoria;
  });

  lista.innerHTML = "";

  if (resultado.length === 0) {
    const vacio = document.createElement("li");
    vacio.className = "vacio";
    vacio.textContent = t.vacio;
    lista.appendChild(vacio);
  }

  resultado.forEach(function (p, i) {
    const item = document.createElement("li");
    item.className = "tarjeta cat-" + p.categoria;
    item.tabIndex = 0;
    item.style.animationDelay = (i * 0.03) + "s";

    const descripcion = idioma === "es" ? p.descripcion : (DESCRIPCIONES_EN[p.palabra] || p.descripcion);

    item.innerHTML =
      '<div class="tarjeta-interior">' +
        '<div class="cara frente">' +
          '<span class="etiqueta">' + t.categorias[p.categoria] + '</span>' +
          '<span class="palabra">' + p.palabra + '</span>' +
          '<span class="pista">' + t.girar + '</span>' +
        '</div>' +
        '<div class="cara dorso">' +
          '<span class="palabra-mini">' + p.palabra + '</span>' +
          '<p class="descripcion">' + descripcion + '</p>' +
          '<span class="pista">' + t.volver + '</span>' +
        '</div>' +
      '</div>';

    item.addEventListener("click", function () { item.classList.toggle("girada"); });
    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        item.classList.toggle("girada");
      }
    });

    lista.appendChild(item);
  });

  contador.textContent = t.contador.replace("{n}", resultado.length).replace("{m}", PALABRAS.length);
}

function traducirPagina() {
  document.documentElement.lang = idioma;
  document.getElementById("subtitulo").textContent = TEXTOS[idioma].subtitulo;
  crearControles();
  aplicarFiltros();
}

document.getElementById("titulo").textContent = APP_TITULO;
document.getElementById("subtitulo").textContent = APP_SUBTITULO;
document.getElementById("version").textContent = "v" + APP_VERSION;
crearControles();
aplicarFiltros();
