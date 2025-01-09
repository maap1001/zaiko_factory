$(document).ready(function() {
    $('#recoverForm').on('submit', function(event) {
        event.preventDefault(); 

        $.ajax({
            url: '/v1/usuarios/solitarRecuperacionContrasena', 
            method: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Correo enviado correctamente',
                    confirmButtonText: 'Cerrar ventana'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/';
                    }
                });
            },
            error: function(xhr) {
                let mensajeError = 'Ocurrió un error al enviar el correo'; 
                if (xhr.responseJSON && xhr.responseJSON.mensaje) {
                    mensajeError = xhr.responseJSON.mensaje; 
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: mensajeError,
                });
            }
        });
    });
});