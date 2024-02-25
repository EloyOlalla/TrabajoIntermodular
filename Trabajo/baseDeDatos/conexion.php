<?php
/**
 * Establecer conexión a la base de datos.
 *
 * Este archivo PHP se encarga de establecer una conexión a la base de datos MySQL
 * utilizando la extensión mysqli de PHP. Se utiliza para conectar la aplicación
 * web al sistema de gestión de base de datos (SGBD) para interactuar con los datos.
 *
 * @package ConexionBD
 * @author Eloy Olalla
 */

// Establecer conexión a la base de datos MySQL
$conexion = new mysqli("localhost", "root", "", "usuarios");

// Comprobar si la conexión se realizó correctamente
if ($conexion->connect_error) {
    // Si hay un error en la conexión, mostrar mensaje de error y finalizar el script
    die("Conexión fallida: " . $conexion->connect_error);
}
?>