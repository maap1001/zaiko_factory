//--========================================================== -->
//--DETALLE INVENTARIO-->
//--========================================================== -->

document.addEventListener('DOMContentLoaded', function () {
    const verModal = document.getElementById('detalleInventario');

    verModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget; 
        const inventarioId = button.getAttribute('data-id'); 

        fetch(`/v1/inventario/detalleInventario/${inventarioId}`) 
            .then(response => response.json())
            .then(inventario => {
                document.getElementById('detalleInventarioId').textContent = inventario._id;
                document.getElementById('detalleInventarioProducto').textContent = inventario.producto ? inventario.producto.nombre : 'Ninguno';
                document.getElementById('detalleInventarioUbicacion').textContent = inventario.ubicacion ? inventario.ubicacion.codigo : 'No disponible';
                document.getElementById('detalleInventarioCantidad').textContent = inventario.cantidad;

                const createdAt = new Date(inventario.createdAt);
                const fechaCreacion = createdAt.toLocaleString('es-CO', { timeZone: 'America/Bogota' });

                const updatedAt = new Date(inventario.updatedAt);
                const fechaModificacion = updatedAt.toLocaleString('es-CO', { timeZone: 'America/Bogota' });

                if (fechaCreacion === fechaModificacion) {
                    document.getElementById('detalleInventarioCreacion').textContent = fechaCreacion || 'No disponible';
                    document.getElementById('detalleInventarioModificacion').textContent = 'Sin modificaciones'; 
                } else {
                    document.getElementById('detalleInventarioCreacion').textContent = fechaCreacion || 'No disponible';
                    document.getElementById('detalleInventarioModificacion').textContent = fechaModificacion || 'No disponible';
                }
            })
            .catch(error => console.error('Error al cargar los detalles del inventario:', error));
    });
});

