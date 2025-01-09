document.addEventListener('DOMContentLoaded', function () {
    const verModalProducto = document.getElementById('detalleProducto');

    verModalProducto.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const productoId = button.getAttribute('data-id');  

        fetch(`/v1/productos/detalleProductos/${productoId}`)
            .then(response => response.json())
            .then(producto => {
                document.getElementById('detalleProductoId').textContent = producto._id;
                document.getElementById('detalleProductoNombre').textContent = producto.nombre;
                document.getElementById('detalleProductoPrecio').textContent = `$${producto.precio.toFixed(2)}`;
                document.getElementById('detalleProductoCantidad').textContent = producto.cantidad;

                if (producto.fechaVencimiento) {
                    const fechaVencimiento = new Date(producto.fechaVencimiento).toLocaleDateString();
                    document.getElementById('detalleProductoFechaVencimiento').textContent = fechaVencimiento;
                } else {
                    document.getElementById('detalleProductoFechaVencimiento').textContent = 'N/A';
                }

                document.getElementById('detalleProductoCategoria').textContent = producto.categoria.nombre;  
                document.getElementById('detalleProductoProveedor').textContent = producto.proveedor.nombre;  
                document.getElementById('detalleProductoEstado').textContent = producto.estado;

                if (producto.foto) {
                    document.getElementById('detalleProductoFoto').src = `/uploads/${producto.foto}`;
                } else {
                    document.getElementById('detalleProductoFoto').src = '/img/default/default.png';  
                }

                // Mostrar la fecha de creación
                const createdAt = new Date(producto.createdAt);
                document.getElementById('detalleProductoCreacion').textContent = createdAt.toLocaleString('es-CO', { timeZone: 'America/Bogota' });

                const updatedAt = new Date(producto.updatedAt);
                if (createdAt.getTime() !== updatedAt.getTime()) {
                    document.getElementById('detalleProductoModificacion').textContent = updatedAt.toLocaleString('es-CO', { timeZone: 'America/Bogota' });
                } else {
                    document.getElementById('detalleProductoModificacion').textContent = 'Sin modificaciones'; 
                }
            })
            .catch(error => console.error('Error al cargar los detalles del producto:', error));
    });
});
