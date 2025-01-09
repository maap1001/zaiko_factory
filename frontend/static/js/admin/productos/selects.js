$(document).ready(function() {
    $('#crearProducto').on('show.bs.modal', function() {
        $.ajax({
            url: '/v1/productos/obtenerCategoriaProveedor', 
            method: 'GET',
            success: function(data) {
                const { categorias, proveedores } = data;

                if (Array.isArray(categorias) && Array.isArray(proveedores)) {
                    const categoriaSelect = $('#categoriaProductoCrear');
                    categoriaSelect.empty().append('<option value="" disabled selected>Seleccione la categoría</option>');
                    categorias.forEach(categoria => {
                        categoriaSelect.append(`<option value="${categoria._id}">${categoria.nombre}</option>`);
                    });

                    const proveedorSelect = $('#proveedorProductoCrear');
                    proveedorSelect.empty().append('<option value="" disabled selected>Seleccione el proveedor</option>');
                    proveedores.forEach(proveedor => {
                        proveedorSelect.append(`<option value="${proveedor._id}">${proveedor.nombre}</option>`);
                    });
                } else {
                    console.error('Las propiedades categorias y proveedores no son arrays');
                }
            },
            error: function() {
                alert('Error al cargar categorías y proveedores.');
            }
        });
    });
});
