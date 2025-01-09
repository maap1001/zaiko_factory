$(document).ready(function () {
    $('#editarAlmacen').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); 

        var id = button.data('id');
        var codigo = button.data('codigo');
        var pasillo = button.data('pasillo');
        var seccion = button.data('seccion');
        var estante = button.data('estante');
        var nivel = button.data('nivel');
        var capacidad = button.data('capacidad');
        var ocupacion = button.data('ocupacion');
        var producto = button.data('producto');

        var modal = $(this);
        modal.find('#editarAlmacenForm').attr('action', '/v1/almacenes/editarAlmacen/' + id);
        modal.find('#editarAlmacenCodigo').val(codigo);
        modal.find('#editarAlmacenPasillo').val(pasillo);
        modal.find('#editarAlmacenSeccion').val(seccion);
        modal.find('#editarAlmacenEstante').val(estante);
        modal.find('#editarAlmacenNivel').val(nivel);
        modal.find('#editarAlmacenCapacidad').val(capacidad);
        modal.find('#editarAlmacenOcupacion').val(ocupacion);
        modal.find('#editarAlmacenProducto').val(producto);
    });

    $('#editarAlmacenForm').on('submit', function (event) {
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
                    text: xhr.responseText || 'Error al actualizar el almacén.',
                });
            }
        });
    });

    $('#cerrarModalEditarAlmacen').click(function () {
        $('#editarAlmacen').modal('hide');
    });
});
