/**
 * @fileoverview Este archivo contiene funciones para el manejo de formularios de registro y inicio de sesión.
 */

/**
 * Elementos del DOM para manipular los formularios de registro e inicio de sesión.
 * @type {HTMLElement}
 */
var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");

/**
 * Desplaza el formulario de registro fuera de la pantalla y muestra el de inicio de sesión.
 */
function register() {
  x.style.left = "-400px";
  y.style.left = "50px";
  z.style.left = "110px";
}

/**
 * Desplaza el formulario de inicio de sesión fuera de la pantalla y muestra el de registro.
 */
function login() {
  x.style.left = "50px";
  y.style.left = "450px";
  z.style.left = "0px";
}

/**
 * Maneja el envío del formulario de registro.
 * @param {Event} event - El evento de envío del formulario.
 */
const registerForm = document.getElementById("register");
const nombreUsuarioInput = document.querySelector("#register [name='nombre-usuario']");
const nombreInput = document.querySelector("#register [name='nombre']");
const apellidosInput = document.querySelector("#register [name='apellidos']");
const fechaNacimientoInput = document.querySelector("#register [name='fecha-nacimiento']");
const contraseñaInput = document.querySelector("#register [name='contraseña']");
registerForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    if (!nombreUsuarioInput.value || !nombreInput.value || !apellidosInput.value || !fechaNacimientoInput.value || !contraseñaInput.value) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    if (nombreUsuarioInput.value.length < 8) {
        alert("El nombre de usuario debe tener al menos 8 caracteres.");
        return;
    }

    if (!/^[A-Z]/.test(nombreInput.value) || !/^[A-Z]/.test(apellidosInput.value)) {
        alert("El nombre y apellidos deben empezar por mayúscula.");
        return;
    }

    if (!/[A-Z]/.test(contraseñaInput.value) || !/[ $&_* ]/.test(contraseñaInput.value)) {
        alert("La contraseña debe contener al menos 1 mayúscula y 1 caracter especial ($&_*).");
        return;
    }

    const formData = new FormData(registerForm);

    fetch('../php/insertar_usuario.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        registerForm.reset();
        alert("Usuario registrado con éxito");
        window.location.reload();
    })    
    .catch(error => {
        console.error('Error:', error);
    });
});

/**
 * Maneja el envío del formulario de inicio de sesión.
 * @param {Event} event - El evento de envío del formulario.
 */
const loginForm = document.getElementById("login");
const usuarioInput = document.querySelector("#login [name='nombre-usuario']");
loginForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    if (!usuarioInput.value) {
        alert("Te falta el usuario");
        return;
    }

    const formData = new FormData(loginForm);

    fetch('../php/verificar_login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data === "Usuario correcto") {
            alert("Inicio de sesión exitoso.");
            window.location.href = "../html/paginaPrincipal.html";
        } else {
            alert("Nombre de usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
            loginForm.reset();
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
