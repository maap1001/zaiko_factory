//--========================================================== -->
//--DETALLE CATEGORIAS-->
//--========================================================== -->

document.addEventListener('DOMContentLoaded', function () {
    const verModal = document.getElementById('detalleCategoria');

    verModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const categoriaId = button.getAttribute('data-id');

        fetch(`/v1/categorias/detalleCategoria/${categoriaId}`)
            .then(response => response.json())
            .then(categorias => {
                document.getElementById('detalleCategoriaId').textContent = categorias._id;
                document.getElementById('detalleCategoriaNombre').textContent = categorias.nombre;
                document.getElementById('detalleCategoriaDescripcion').textContent = categorias.descripcion;
                document.getElementById('detalleCategoriaPresentacion').textContent = categorias.presentacion;
                
                // Mostrar la fecha de creación
                const createdAt = new Date(categorias.createdAt);
                const fechaCreacion = createdAt.toLocaleString('es-CO', { timeZone: 'America/Bogota' });
                document.getElementById('detalleCategoriaFechaCreacion').textContent = fechaCreacion || 'No disponible';
                // Mostrar la fecha de modificación
                const updatedAt = new Date(categorias.updatedAt);
                const fechaModificacion = updatedAt.toLocaleString('es-CO', { timeZone: 'America/Bogota' });
                document.getElementById('detalleCategoriaFechaModificacion').textContent = fechaModificacion || 'No disponible';
            })
            .catch(error => console.error('Error al cargar los detalles de la categoria:', error));
    });
});