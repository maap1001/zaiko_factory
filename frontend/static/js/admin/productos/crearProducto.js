$(document).ready(function() {
    $('#formCrearProducto').on('submit', function(event) {
        event.preventDefault(); 

        // Crear un nuevo objeto FormData
        var formData = new FormData(this); 

        $.ajax({
            url: '/v1/productos/crearProductos',  
            method: 'POST',  
            data: formData, 
            contentType: false,  
            processData: false,  
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
    $('#cerrarModalCrearProducto').click(function () {
        $('#crearProducto').modal('hide');
    });
});
