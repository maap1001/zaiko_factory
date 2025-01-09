$(document).ready(function() {
    $('#registroForm').on('submit', function(event) {
        event.preventDefault(); 

        $.ajax({
            url: '/v1/usuarios/registroUsario', 
            method: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Registro exitoso inicia sesion para continuar',
                    confirmButtonText: 'Cerrar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/';
                    }
                });
            },
            error: function(xhr) {
                let mensajeError = 'Ocurrió un error al registrarse'; 
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