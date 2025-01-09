$(document).ready(function () {
    $('#editarCategoria').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);

        var id = button.data('id');
        var nombre = button.data('nombre');
        var descripcion = button.data('descripcion');
        var presentacion = button.data('presentacion');
        

        var modal = $(this);
        modal.find('#editarCategoriaForm').attr('action', '/v1/categorias/editarCategoria/' + id);
        modal.find('#editarCategoriaNombre').val(nombre);
        modal.find('#editarCategoriaDescripcion').val(descripcion);
        modal.find('#editarCategoriaPresentacion').val(presentacion);
    
    });

    $('#editarCategoriaForm').on('submit', function (event) {
        event.preventDefault();

        $.ajax({
            url: $(this).attr('action'),
            method: 'POST',
            data: $(this).serialize(),
            success: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Operación Éxitosa!',
                    text: response.mensaje,
                }).then(() => {
                    location.reload();
                });
            },
            error: function (xhr) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: xhr.responseText || 'Error al actualizar la categoria.',
                });
            }
        });
    });

    $('#cerrarModalEditarCategoria').click(function () {
        $('#editarCategoria').modal('hide');
    });

});