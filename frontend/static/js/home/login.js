$(document).ready(function() {
    $('#loginForm').on('submit', function(event) {
        event.preventDefault(); 

        $.ajax({
            url: '/v1/usuarios/loginUsuario', 
            method: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Inicio de sesión exitoso',
                    confirmButtonText: 'Continuar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/v1/panelGestion';
                    }
                });
            },
            error: function(xhr) {
                let mensajeError = 'Ocurrió un error en el inicio de sesión'; 
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