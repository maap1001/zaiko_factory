//--========================================================== -->
//--CREAR ALMACENES-->
//--========================================================== -->

$(document).ready(function() {
    $('#formCrearAlmacen').on('submit', function(event) {
        event.preventDefault(); 

        $.ajax({
            url: '/v1/almacenes/crearAlmacen',  
            method: 'POST',  
            data: $(this).serialize(), 
            success: function(response) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Operación exitosa!',
                    text: response.mensaje,
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    location.reload();
                });
            },
            error: function(xhr) {
                let mensajeError = 'Ocurrió un error al registrar el almacen';
                if (xhr.responseJSON && xhr.responseJSON.mensaje) {
                    mensajeError = xhr.responseJSON.mensaje; 
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: mensajeError,
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    });
});

$(document).ready(function () {
    $('#cerrarModalCrearAlmacen').click(function () {
        $('#crearAlmacen').modal('hide');
    });
});




