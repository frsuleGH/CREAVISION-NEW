document.getElementById("whatsappForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que se envíe el formulario por defecto

    // Obtener el mensaje del textarea y el nombre del input
    var nombre = document.getElementById("nombre").value;
    var mensaje = document.getElementById("mensaje").value;

     // Verificar si el campo de mensaje está vacío
     if (mensaje.trim() === "" || nombre.trim() === "") {
        // Mostrar un mensaje de error en rojo
        var mensajeError = document.createElement("div");
        mensajeError.classList.add("alert", "alert-danger", "mt-2", "text-center");
        mensajeError.textContent = "Por favor, llena el campo de nombre y mensaje.";
        document.getElementById("whatsappForm").insertAdjacentElement("beforeend", mensajeError);

        // Eliminar el mensaje de error después de 5 segundos
        setTimeout(function() {
            mensajeError.remove();
        }, 5000);

        return; // Detener la ejecución del código
    }

    // Formatear el mensaje para la URL de WhatsApp
    var nombreMensaje = encodeURIComponent(nombre);
    var mensajeWhatsApp = encodeURIComponent(mensaje);

    var numeroTelefono = "543425336098";

    // URL de WhatsApp con el mensaje y tu número de teléfono
    var url =
        "https://api.whatsapp.com/send?phone=" +
        numeroTelefono +
        "&text=" +
        "*Nombre*: " + nombreMensaje + "%0A" +
        "Mensaje: " + mensajeWhatsApp;

    // Redirigir a WhatsApp
    window.location.href = url;
});