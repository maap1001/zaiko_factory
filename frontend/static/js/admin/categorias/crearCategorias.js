//--========================================================== -->
//--CREAR CATEGORIAS-->
//--========================================================== -->

$(document).ready(function() {
    $('#formCrearCategoria').on('submit', function(event) {
        event.preventDefault(); 

        $.ajax({
            url: '/v1/categorias/crearCategoria',  
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
                        window.location.href = '/v1/categorias/';  
                    }
                });
            },
            error: function(xhr) {
                let mensajeError = 'Ocurrió un error al registrar el proveedor';
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
    $('#cerrarModalCrearCategoria').click(function () {
        $('#crearCategoria').modal('hide');
    });
});




