//--========================================================== -->
//--Scrip para editar usuarios-->
//--========================================================== -->

$(document).ready(function () {
    $('#editarUsuario').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);

        var id = button.data('id');
        var nombre = button.data('nombre');
        var correo = button.data('correo');
        var rol = button.data('rol');
        // var foto = button.data('foto');

        var modal = $(this);

        modal.find('#editarFormularioUsuario').attr('action', '/v1/usuarios/editarUsuario/' + id);
        modal.find('#editarUsuarioNombreCompleto').val(nombre);
        modal.find('#editarUsuarioCorreo').val(correo);
        modal.find('#editarUsuarioRol').val(rol);
        // modal.find('#editarUsuarioFotoPreview').attr('src', foto);

        console.log('Datos enviados al modal correctamente.');
    });

    $('#editarFormularioUsuario').on('submit', function (event) {
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

    $('#cerrarModalEditarUsuario').click(function () {
        $('#editarUsuario').modal('hide');
    });

});