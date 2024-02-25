/**
 * @fileoverview Este archivo contiene funciones para el manejo de eventos de clic en elementos de navegación.
 */

/**
 * Selecciona todos los elementos de lista de la clase 'enlaces-nav' y agrega un evento de clic a cada uno.
 * @type {NodeList}
 */
let links = document.querySelectorAll('.enlaces-nav li');

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function(e) {
    for (let j = 0; j < links.length; j++) {
      links[j].classList.remove('activo');
    }
    e.target.classList.add('activo');
  });
}

/**
 * Agrega un evento de clic a cada enlace dentro de '.enlaces-nav' para desactivar el menú desplegable.
 */
document.querySelectorAll('.enlaces-nav a').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.menu-toggle').checked = false;
    });
});
