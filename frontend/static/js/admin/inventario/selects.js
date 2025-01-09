$(document).ready(function() {
    $('#crearInventario').on('show.bs.modal', function() {
        $.ajax({
            url: '/v1/inventario/obtenerProductoUbicacion', 
            method: 'GET',
            success: function(data) {
                const { productos, ubicaciones } = data;

                if (Array.isArray(productos)) {
                    const productoSelect = $('#productoInventarioCrear');
                    productoSelect.empty().append('<option value="" disabled selected>Seleccione el producto</option>');
                    productos.forEach(producto => {
                        productoSelect.append(`<option value="${producto._id}">${producto.nombre}</option>`);
                    });
                } else {
                    console.error('La propiedad productos no es un array');
                }

                if (Array.isArray(ubicaciones)) {
                    const ubicacionSelect = $('#ubicacionInventarioCrear');
                    ubicacionSelect.empty().append('<option value="" disabled selected>Seleccione la ubicación</option>');
                    ubicaciones.forEach(ubicacion => {
                        ubicacionSelect.append(`<option value="${ubicacion._id}">${ubicacion.codigo}</option>`);
                    });
                } else {
                    console.error('La propiedad ubicaciones no es un array');
                }
            },
            error: function() {
                alert('Error al cargar productos y ubicaciones.');
            }
        });
    });
});
