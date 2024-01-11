<?php
    include("envia.php");

    session_start();

    // Verifica si se envió el formulario
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["contact"])) {
        // Validación del formulario
        if (
            strlen($_POST["nombre"]) >= 1 &&
            strlen($_POST["email"]) >= 1 &&
            strlen($_POST["asunto"]) >= 1 &&
            strlen($_POST["mensaje"]) >= 1
        ) {
            $name = trim($_POST["nombre"]);
            $email = trim($_POST["email"]);
            $asunto = trim($_POST["asunto"]);
            $mensaje = trim($_POST["mensaje"]);
            $fecha = date("d/m/y");
            // Enviar correo electrónico
            $destinatario = "fnievas68@gmail.com"; // Reemplaza con tu dirección de correo
            $asuntoCorreo = "Nuevo mensaje desde el formulario de contacto";
            $cuerpoCorreo = "Nombre: $name\nEmail: $email\nAsunto: $asunto\nMensaje: $mensaje";
            // Crear el mensaje a enviar
            $consulta = "INSERT INTO datos(nombres, email, asunto, mensaje, fecha) VALUES ('$name', '$email', '$asunto', '$mensaje', '$fecha')";
            $resultado = mysqli_query($conex, $consulta);

            header("Location: http://localhost:8081/index.html?enviado=true#titleForm");
            exit();
        }
    }
?>
