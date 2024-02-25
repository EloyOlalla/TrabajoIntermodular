<?php
/**
 * Iniciar sesión y verificar credenciales de usuario.
 *
 * Este archivo PHP se encarga de iniciar sesión, verificar las credenciales
 * del usuario proporcionadas en el formulario de inicio de sesión y gestionar
 * la creación de una cookie de sesión si las credenciales son válidas.
 *
 * @package IniciarSesion
 * @author Eloy Olalla
 */

// Iniciar sesión
session_start();

// Incluir el archivo de conexión a la base de datos
include("../baseDeDatos/conexion.php");

// Obtener los datos del formulario
$nombreUsuario = $_POST['nombre-usuario']; // Nombre de usuario ingresado en el formulario
$contraseña = $_POST['contraseña']; // Contraseña ingresada en el formulario

// Encriptar la contraseña antes de compararla con la almacenada en la base de datos
$contraseñaEncriptada = password_hash($contraseña, PASSWORD_DEFAULT);

// Consulta SQL para obtener la contraseña encriptada del usuario desde la base de datos
$sql = "SELECT contraseña FROM usuario WHERE nombre_usuario = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $nombreUsuario);
$stmt->execute();
$stmt->bind_result($contraseñaEncriptadaDB);
$stmt->fetch();
$stmt->close();

// Verificar si se encontró el usuario en la base de datos
if ($contraseñaEncriptadaDB) {
    // Verificar si la contraseña ingresada coincide con la almacenada en la base de datos
    if (password_verify($contraseña, $contraseñaEncriptadaDB)) {
        // Guardar el nombre de usuario en la sesión
        $_SESSION['nombre_usuario'] = $nombreUsuario;

        // Crear una cookie con el nombre de usuario
        setcookie('nombre_usuario', $nombreUsuario, time() + (86400 * 30), '/'); // Cookie válida por 30 días

        echo "Usuario correcto";
    } else {
        echo "Contraseña incorrecta";
    }
} else {
    echo "Nombre de usuario incorrecto";
}

// Cerrar la conexión a la base de datos
$conexion->close();
?>