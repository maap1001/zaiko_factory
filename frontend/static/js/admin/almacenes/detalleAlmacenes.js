//--========================================================== -->
//--Scrip para ver el detalle del proveedor-->
//--========================================================== -->

document.addEventListener('DOMContentLoaded', function () {
    const verModal = document.getElementById('detalleAlmacen');

    verModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const almacenId = button.getAttribute('data-id'); 

        fetch(`/v1/almacenes/detalleAlmacen/${almacenId}`)
            .then(response => response.json())
            .then(almacenes => {
                document.getElementById('detalleAlmacenId').textContent = almacenes._id;
                document.getElementById('detalleAlmacenCodigo').textContent = almacenes.codigo;
                document.getElementById('detalleAlmacenPasillo').textContent = almacenes.pasillo;
                document.getElementById('detalleAlmacenSeccion').textContent = almacenes.seccion;
                document.getElementById('detalleAlmacenEstante').textContent = almacenes.estante;
                document.getElementById('detalleAlmacenNivel').textContent = almacenes.nivel;
                document.getElementById('detalleAlmacenCapacidad').textContent = almacenes.capacidad;
                document.getElementById('detalleAlmacenOcupacion').textContent = almacenes.ocupacion;
                
                // Si existe un producto almacenado, se muestra su nombre. Si no, se muestra 'Ninguno'.
                document.getElementById('detalleAlmacenProducto').textContent = almacenes.producto ? almacen.producto.nombre : 'Ninguno';

                // Mostrar la fecha de creación en formato local
                const createdAt = new Date(almacenes.createdAt);
                const fechaCreacion = createdAt.toLocaleString('es-CO', { timeZone: 'America/Bogota' });
                document.getElementById('detalleAlmacenFechaCreacion').textContent = fechaCreacion || 'No disponible';

                // Mostrar la fecha de modificación en formato local
                const updatedAt = new Date(almacenes.updatedAt);
                const fechaModificacion = updatedAt.toLocaleString('es-CO', { timeZone: 'America/Bogota' });
                document.getElementById('detalleAlmacenFechaModificacion').textContent = fechaModificacion || 'No disponible';
            })
            .catch(error => console.error('Error al cargar los detalles del almacén:', error));
    });
});
