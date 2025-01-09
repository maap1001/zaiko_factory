$(document).ready(function() {
    $('#restablecerContrasenaForm').on('submit', function(event) {
        event.preventDefault(); 

        $.ajax({
            url: $(this).attr('action'), 
            method: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Contraseña actualizada!',
                    text: 'Tu contraseña ha sido restablecida correctamente.',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/'; 
                    }
                });
            },
            error: function(xhr) {
                let mensajeError = 'Ocurrió un error al restablecer la contraseña'; 
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