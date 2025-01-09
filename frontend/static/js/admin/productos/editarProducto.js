//--========================================================== -->
//-- Scrip para editar productos -->
//--========================================================== -->

$(document).ready(function () {
    $('#editarProducto').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);

        var id = button.data('id');
        var nombre = button.data('nombre');
        var foto = button.data('foto'); 
        var precio = button.data('precio');
        var cantidad = button.data('cantidad');
        var fechaVencimiento = button.data('fechavencimiento');
        var categoria = button.data('categoria'); 
        var proveedor = button.data('proveedor'); 

        var modal = $(this);

        modal.find('#editarFormularioProducto').attr('action', '/v1/productos/editarProductos/' + id);
        modal.find('#editarProductoNombre').val(nombre);
        modal.find('#editarProductoFotoTexto').val(foto); 
        modal.find('#editarProductoPrecio').val(precio);
        modal.find('#editarProductoCantidad').val(cantidad);
        modal.find('#editarProductoFechaVencimiento').val(fechaVencimiento ? new Date(fechaVencimiento).toISOString().split('T')[0] : 'N/A');
        modal.find('#editarProductoCategoria').val(categoria);
        modal.find('#editarProductoProveedor').val(proveedor);

        console.log('Datos enviados al modal correctamente.');
    });

    $('#editarFormularioProducto').on('submit', function (event) {
        event.preventDefault();

        var form = $(this)[0]; 
        var formData = new FormData(form); 

        $.ajax({
            url: $(this).attr('action'),
            method: 'POST',
            data: formData, 
            processData: false, 
            contentType: false, 
            success: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: response.mensaje,
                }).then(() => {
                    location.reload();
                });
            },
            error: function (xhr) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: xhr.responseText || 'Error al actualizar el producto.',
                });
            }
        });
    });

    $('#cerrarModalEditarProducto').click(function () {
        $('#editarProducto').modal('hide');
    });
});