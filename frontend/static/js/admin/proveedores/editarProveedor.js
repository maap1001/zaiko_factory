$(document).ready(function () {
    $('#editarProveedor').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);

        var id = button.data('id');
        var nombre = button.data('nombre');
        var documento = button.data('documento');
        var telefono = button.data('telefono');
        var correo = button.data('correo');
        var direccion = button.data('direccion');
        var ciudad = button.data('ciudad');
        var departamento = button.data('departamento');
        var tipoempresa = button.data('tipoempresa');
        var metodopago = button.data('metodopago');

        var modal = $(this);
        modal.find('#editarProveedorform').attr('action', '/v1/proveedores/editarProveedor/' + id);
        modal.find('#editarProveedorNombre').val(nombre);
        modal.find('#editarProveedorDocumento').val(documento);
        modal.find('#editarProveedorTelefono').val(telefono);
        modal.find('#editarProveedorCorreo').val(correo);
        modal.find('#editarProveedorDireccion').val(direccion);
        modal.find('#editarProveedorCiudad').val(ciudad);
        modal.find('#editarProveedorDepartamento').val(departamento);
        modal.find('#editarProveedorTipoEmpresa').val(tipoempresa);
        modal.find('#editarProveedorMetodoPago').val(metodopago);
    });

    $('#editarProveedorform').on('submit', function (event) {
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
                    text: xhr.responseText || 'Error al actualizar el proveedor.',
                });
            }
        });
    });

    $('#cerrarModalEditarProveedor').click(function () {
        $('#editarProveedor').modal('hide');
    });

});