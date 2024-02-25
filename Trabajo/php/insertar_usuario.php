<?php
/**
 * Conexión a la base de datos y registro de usuario.
 *
 * Este archivo PHP se encarga de gestionar la conexión a la base de datos
 * y de insertar un nuevo usuario con los datos proporcionados por el formulario de registro.
 *
 * @package RegistroUsuario
 * @author Eloy Olalla
 */

// Incluir el archivo de conexión a la base de datos
include("../baseDeDatos/conexion.php");

// Obtener los datos del formulario
$nombreUsuario = $_POST['nombre-usuario']; // Nombre de usuario ingresado en el formulario
$nombre = $_POST['nombre']; // Nombre ingresado en el formulario
$apellidos = $_POST['apellidos']; // Apellidos ingresados en el formulario
$fechaNacimiento = $_POST['fecha-nacimiento']; // Fecha de nacimiento ingresada en el formulario
$contraseña = $_POST['contraseña']; // Contraseña ingresada en el formulario

// Encriptar la contraseña antes de almacenarla en la base de datos
$contraseñaEncriptada = password_hash($contraseña, PASSWORD_DEFAULT);

// Preparar la consulta SQL con consultas preparadas para evitar inyección SQL
$sql = "INSERT INTO usuario (nombre_usuario, nombre, apellidos, fecha_nacimiento, contraseña) VALUES (?, ?, ?, ?, ?)";

// Preparar la declaración SQL para su ejecución
$stmt = $conexion->prepare($sql);

// Vincular los parámetros de la consulta preparada
$stmt->bind_param("sssss", $nombreUsuario, $nombre, $apellidos, $fechaNacimiento, $contraseñaEncriptada);

// Ejecutar la consulta preparada
$stmt->execute();

// Cerrar la declaración SQL
$stmt->close();

// Cerrar la conexión a la base de datos
$conexion->close();
?>