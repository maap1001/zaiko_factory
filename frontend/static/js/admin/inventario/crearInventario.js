$(document).ready(function() {
    $('#formCrearInventario').on('submit', function(event) {
        event.preventDefault(); 

        $.ajax({
            url: '/v1/inventario/crearInventario', 
            method: 'POST',  
            data: $(this).serialize(), 
            success: function(response) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Operación exitosa!',
                    text: response.mensaje,
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
            },
            error: function(xhr) {
                let mensajeError = 'Ocurrió un error al registrar el inventario';
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

$(document).ready(function() {
    $('#cerrarModalCrearInventario').click(function() {
        $('#crearInventario').modal('hide'); 
    });
});
