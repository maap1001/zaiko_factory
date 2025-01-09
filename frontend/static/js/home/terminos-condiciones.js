// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Manejador de evento para el botón "Acepto"
    document.getElementById('acceptTerms').addEventListener('click', function () {
        // Aquí puedes agregar la lógica para manejar la aceptación, como enviar datos al servidor o cambiar el estado de la interfaz.
        alert('Has aceptado los términos y condiciones.');

        // Cierra el modal
        var modal = bootstrap.Modal.getInstance(document.getElementById('termsModal'));
        modal.hide();
    });
});