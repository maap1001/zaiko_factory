//--========================================================== -->
//--Scrip para ver el detalle del proveedor-->
//--========================================================== -->

document.addEventListener('DOMContentLoaded', function () {
    const verModal = document.getElementById('detalleProveedor');

    verModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const proveedorId = button.getAttribute('data-id');

        fetch(`/v1/proveedores/detalleProveedor/${proveedorId}`)
            .then(response => response.json())
            .then(proveedores => {
                document.getElementById('detalleProveedorId').textContent = proveedores._id;
                document.getElementById('detalleProveedorNombre').textContent = proveedores.nombre;
                document.getElementById('detalleProveedorDocumento').textContent = proveedores.documento;
                document.getElementById('detalleProveedorTelefono').textContent = proveedores.telefono;
                document.getElementById('detalleProveedorCorreo').textContent = proveedores.correo;
                document.getElementById('detalleProveedorDireccion').textContent = proveedores.ubicacion.direccion;
                document.getElementById('detalleProveedorCiudad').textContent = proveedores.ubicacion.ciudad;
                document.getElementById('detalleProveedorDepartamento').textContent = proveedores.ubicacion.departamento;
                document.getElementById('detalleProveedorTipoEmpresa').textContent = proveedores.tipoEmpresa;
                document.getElementById('detalleProveedorMetodoPago').textContent = proveedores.metodoPago;
                
                // Mostrar la fecha de creación
                const createdAt = new Date(proveedores.createdAt);
                const fechaCreacion = createdAt.toLocaleString('es-CO', { timeZone: 'America/Bogota' });
                document.getElementById('detalleProveedorFechaCreacion').textContent = fechaCreacion || 'No disponible';
                // Mostrar la fecha de modificación
                const updatedAt = new Date(proveedores.updatedAt);
                const fechaModificacion = updatedAt.toLocaleString('es-CO', { timeZone: 'America/Bogota' });
                document.getElementById('detalleProveedorFechaModificacion').textContent = fechaModificacion || 'No disponible';
            })
            .catch(error => console.error('Error al cargar los detalles del proveedor:', error));
    });
});