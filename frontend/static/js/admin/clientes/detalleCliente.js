//--========================================================== -->
//--DETALLE CLIENTE-->
//--========================================================== -->

document.addEventListener('DOMContentLoaded', function () {
    const verModal = document.getElementById('detalleCliente');

    verModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const clienteId = button.getAttribute('data-id'); 

        fetch(`/v1/clientes/detalleCliente/${clienteId}`)
            .then(response => response.json())
            .then(cliente => {
                document.getElementById('detalleClienteNombre').textContent = cliente.nombre;
                document.getElementById('detalleClienteDocumento').textContent = cliente.documento;
                document.getElementById('detalleClienteTelefono').textContent = cliente.telefono;
                document.getElementById('detalleClienteCorreo').textContent = cliente.correo;
                document.getElementById('detalleClienteDireccion').textContent = cliente.direccion || 'No disponible';

                const createdAt = new Date(cliente.createdAt);
                document.getElementById('detalleClienteFechaCreacion').textContent = createdAt.toLocaleString('es-CO', { timeZone: 'America/Bogota' });

                const updatedAt = new Date(cliente.updatedAt);
                if (createdAt.getTime() !== updatedAt.getTime()) {
                    document.getElementById('detalleClienteFechaModificacion').textContent = updatedAt.toLocaleString('es-CO', { timeZone: 'America/Bogota' });
                } else {
                    document.getElementById('detalleClienteFechaModificacion').textContent = 'Sin modificaciones';
                }
            })
            .catch(error => console.error('Error al cargar los detalles del cliente:', error));
    });
});
