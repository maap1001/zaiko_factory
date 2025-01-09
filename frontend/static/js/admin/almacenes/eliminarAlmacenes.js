//==========================================================
// Script para eliminar almacenes
//==========================================================

$('#eliminarAlmacen').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); 
    var id = button.data('id'); 

    var modal = $(this);
    var form = modal.find('#formEliminarAlmacen');

    form.attr('action', '/v1/almacenes/eliminarAlmacen/' + id);

    $('#formEliminarAlmacen').on('submit', function (event) {
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
                    text: xhr.responseText || 'Error al eliminar el almacén.', 
                });
            }
        });
    });
});
