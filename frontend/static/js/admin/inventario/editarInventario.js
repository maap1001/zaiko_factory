$(document).ready(function () {
    $('#editarInventario').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); 

        var id = button.data('id');
        var cantidad = button.data('cantidad');
        var ubicacion = button.data('ubicacion');
        var producto = button.data('producto');

        var modal = $(this);
        modal.find('#editarInventarioForm').attr('action', '/v1/inventario/editarInventario/' + id);
        modal.find('#editarInventarioCantidad').val(cantidad);
        modal.find('#editarInventarioUbicacion').val(ubicacion); 
        modal.find('#editarInventarioProducto').val(producto); 
    });

    $('#editarInventarioForm').on('submit', function (event) {
        event.preventDefault(); 

        $.ajax({
            url: $(this).attr('action'), 
            method: 'POST', 
            data: $(this).serialize(), 
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
                    text: xhr.responseText || 'Error al actualizar el inventario.',
                });
            }
        });
    });

    $('#cerrarModalEditarInventario').click(function () {
        $('#editarInventario').modal('hide');
    });
});
