-- Crear la base de datos
DROP DATABASE IF EXISTS usuarios;
CREATE DATABASE IF NOT EXISTS usuarios;

-- Seleccionar la base de datos
USE usuarios;

-- Crear la tabla de usuarios
CREATE TABLE IF NOT EXISTS usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    contraseña VARCHAR(255) NOT NULL
    -- Agrega más campos si lo deseas
);