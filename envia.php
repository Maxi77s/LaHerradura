<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "contacto";

$conex = new mysqli($servername, $username, $password, $dbname);

if ($conex->connect_error) {
    die("La conexión a la base de datos falló: " . $conex->connect_error);
}


