$(document).ready(function () {
    $('#editarCliente').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); 

        var id = button.data('id');
        var nombre = button.data('nombre');
        var documento = button.data('documento');
        var telefono = button.data('telefono');
        var correo = button.data('correo');
        var direccion = button.data('direccion');

        var modal = $(this);
        modal.find('#editarClienteForm').attr('action', '/v1/clientes/editarCliente/' + id);
        modal.find('#editarClienteNombre').val(nombre);
        modal.find('#editarClienteDocumento').val(documento);
        modal.find('#editarClienteTelefono').val(telefono);
        modal.find('#editarClienteCorreo').val(correo);
        modal.find('#editarClienteDireccion').val(direccion);
    });

    $('#editarClienteForm').on('submit', function (event) {
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
                    text: xhr.responseText || 'Error al actualizar el cliente.',
                });
            }
        });
    });

    $('#cerrarModalEditarCliente').click(function () {
        $('#editarCliente').modal('hide');
    });
});
