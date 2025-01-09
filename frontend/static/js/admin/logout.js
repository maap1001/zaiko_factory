//--========================================================== -->
//--Scrip para cerrar sesion-->
//--========================================================== -->

$(document).ready(function() {
    $('#logoutButton').on('click', function(event) {
        event.preventDefault();

        $.ajax({
            url: '/v1/usuarios/logoutUsuario',  
            method: 'POST',  
            success: function(response) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Sesión cerrada!',
                    text: response.mensaje,
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/';  
                    }
                });
            },
            error: function(xhr) {
                let mensajeError = 'Ocurrió un error al cerrar la sesión';
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