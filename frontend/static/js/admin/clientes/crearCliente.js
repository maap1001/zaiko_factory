//--========================================================== -->
//--CREAR CLIENTES-->
//--========================================================== -->

$(document).ready(function() {
    $('#formCrearCliente').on('submit', function(event) {
        event.preventDefault(); 

        $.ajax({
            url: '/v1/clientes/crearCliente',  
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
                let mensajeError = 'Ocurrió un error al registrar el cliente'; 
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
    $('#cerrarModalCrearCliente').click(function () {
        $('#crearCliente').modal('hide'); // Cambiado el ID del modal a 'crearCliente'
    });
});
