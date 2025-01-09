//--========================================================== -->
//--Scrip para ver el detalle del usuario-->
//--========================================================== -->

document.addEventListener('DOMContentLoaded', function () {
    const verModal = document.getElementById('detalleUsuario');

    verModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const usuarioId = button.getAttribute('data-id');

        fetch(`/v1/usuarios/detalleUsario/${usuarioId}`)
            .then(response => response.json())
            .then(usuarios => {
                document.getElementById('detalleUsuarioId').textContent = usuarios._id;
                document.getElementById('detalleUsuarioNombre').textContent = usuarios.nombreCompleto;
                document.getElementById('detalleUsuarioCorreo').textContent = usuarios.correo;
                document.getElementById('detalleUsuarioContraseña').textContent = usuarios.contraseña;
                document.getElementById('detalleUsuarioRol').textContent = usuarios.rol;
                
                if (usuarios.foto) {
                    document.getElementById('detalleUsuarioFoto').src = `/uploads/${usuarios.foto}`;
                } else {
                    document.getElementById('detalleUsuarioFoto').src = '/img/default/user.png'; 
                }

                // Mostrar la fecha de creación
                const createdAt = new Date(usuarios.createdAt);
                const fechaCreacion = createdAt.toLocaleString('es-CO', { timeZone: 'America/Bogota' });
                document.getElementById('detalleUsuarioCreacion').textContent = fechaCreacion || 'No disponible';
                // Mostrar la fecha de modificación
                const updatedAt = new Date(usuarios.updatedAt);
                const fechaModificacion = updatedAt.toLocaleString('es-CO', { timeZone: 'America/Bogota' });
                document.getElementById('detalleUsuarioModificacion').textContent = fechaModificacion || 'No disponible';
            })
            .catch(error => console.error('Error al cargar los detalles del usuarioo:', error));
    });
});