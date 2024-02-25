/**
 * URL base de la API de Wikipedia para realizar búsquedas.
 * @type {string}
 */
const apiUrl =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

/**
 * Elemento del formulario de búsqueda.
 * @type {HTMLElement}
 */
const formulario = document.querySelector(".form");

/**
 * Entrada de texto donde el usuario ingresa el término de búsqueda.
 * @type {HTMLInputElement}
 */
const entradaUsuario = document.querySelector(".form-input");

/**
 * Contenedor donde se mostrarán los resultados de la búsqueda.
 * @type {HTMLElement}
 */
const contenedorResultados = document.querySelector(".results");

/**
 * Botón de búsqueda.
 * @type {HTMLButtonElement}
 */
const botonBuscar = document.querySelector(".submit-btn");

/**
 * URL base para redirigir a los resultados de Wikipedia.
 * @type {string}
 */
const resultadoUrlBase = "http://en.wikipedia.org/?curid=";

/**
 * Función asincrónica para realizar la búsqueda en Wikipedia.
 * @param {Event} evento - Evento de clic en el botón de búsqueda.
 * @returns {Promise<void>} - Promesa que no devuelve ningún valor.
 */
async function realizarBusqueda(evento) {
  evento.preventDefault();
  
  // Obtener el término de búsqueda ingresado por el usuario.
  const terminoBusqueda = entradaUsuario.value;

  try {
    // Realizar la solicitud a la API de Wikipedia.
    const respuesta = await fetch(apiUrl + encodeURIComponent(terminoBusqueda));
    const datos = await respuesta.json();
    const resultados = await datos.query.search;

    let htmlResultados = "<div class='articles'>";

    // Generar el HTML para mostrar los resultados de la búsqueda.
    for (const resultado of resultados) {
      const { pageid, title, snippet } = resultado;

      // Generar el enlace al artículo de Wikipedia correspondiente.
      const enlaceResultado = `<a href=${resultadoUrlBase}${pageid} target='_blank'>
        <h4>${title}</h4>
        <p>${snippet}</p>
      </a>`;

      htmlResultados += enlaceResultado;
    }

    htmlResultados += "</div>";

    // Mostrar los resultados en el contenedor correspondiente.
    contenedorResultados.innerHTML = htmlResultados;
  } catch (error) {
    console.error("Ha fallado algo ", error);
  }
}

// Escuchar el evento de clic en el botón de búsqueda.
botonBuscar.addEventListener("click", realizarBusqueda);
