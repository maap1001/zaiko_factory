const productosModel = require('../models/productos.models');
const proveedoresModel = require('../models/proovedores.models')
const logActivity = require('../utils/logActivity');
const categoriasModel = require('../models/categorias.models')

exports.productos = async (req, res) => {
    try {
        const productos = await productosModel.find();
        res.render('admin/productos/productos', { productos });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al listar los productos", error: error.message }); 
    }
}

exports.obtenerCategoriasYProveedores = async (req, res) => {
    try {
        const [categorias, proveedores] = await Promise.all([
            categoriasModel.find(),
            proveedoresModel.find(),
        ]);
        res.json({ categorias, proveedores }); 
    } catch (error) {
        console.error("Error al obtener categorías y proveedores:", error);
        res.status(500).json({ mensaje: "Error al obtener datos", error: error.message });
    }
};


exports.crearProductos = async (req, res) => {
    try {
        const nuevoProducto = new productosModel({
            nombre: req.body.nombreProductoCrear,
            precio: req.body.precioProductoCrear,
            cantidad: req.body.cantidadProductoCrear,
            fechaVencimiento: req.body.fechaVencimientoProductoCrear,
            categoria: req.body.categoriaProductoCrear,
            proveedor: req.body.proveedorProductoCrear,
            estado: req.body.estadoProductoCrear
        });

        if (req.file) {
            nuevoProducto.foto = req.file.filename;  
        } 

        await nuevoProducto.save();

        res.json({ mensaje: "Producto creado con éxito", producto: nuevoProducto });
    } catch (error) {
        console.log('Error al registrar el producto:', error);
        res.status(400).json({ mensaje: "Error al registrar el producto. Intenta nuevamente." });
    }
};


exports.detalleProductos = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await productosModel.findById(id)
            .populate('categoria', 'nombre') 
            .populate('proveedor', 'nombre'); 

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'No se pudo encontrar el producto' });
    }
};

exports.editarProductos = async (req, res) => {
    try {
        const { id } = req.params; 
        const { 
            editarProductoNombre,
            editarProductoPrecio,
            editarProductoCantidad, 
            editarProductoFechaVencimiento, 
            editarProductoCategoria, 
            editarProductoProveedor, 
            editarProductoEstado 
        } = req.body; 

        const datosActualizados = {
            nombre: editarProductoNombre,
            precio: editarProductoPrecio,
            cantidad: editarProductoCantidad,
            fechaVencimiento: editarProductoFechaVencimiento,
            categoria: editarProductoCategoria,
            proveedor: editarProductoProveedor,
            estado: editarProductoEstado,
        };

        if (req.file) {
            console.log(req.file); // Para verificar si el archivo está siendo subido
            datosActualizados.foto = req.file.filename;
        }
        
        const actualizarProducto = await productosModel.findByIdAndUpdate(id, datosActualizados, { new: true, runValidators: true });

        if (!actualizarProducto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        const productoCompleto = await productosModel.findById(actualizarProducto._id)
            .populate('categoria', 'nombre') 
            .populate('proveedor', 'nombre');

        res.json({ mensaje: "Producto actualizado exitosamente", producto: productoCompleto });

    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ mensaje: "Se presentó un error al editar el producto", error: error.message });
    }
};

exports.eliminarProductos = async (req, res) => {
    try {
        const productoId = req.params.id;
        
        const producto = await productosModel.findById(productoId);
        
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        await productosModel.findByIdAndDelete(productoId);
        
        res.json({ mensaje: "Producto eliminado exitosamente" });

        // logActivity.generateLog(logRoute, `Eliminación del ${producto.nombre} realizada por ${req.user.email} at ${new Date()}\n`);

    } catch (error) {
        console.error(error); 
        res.status(500).json({ mensaje: "Se presentó un error" });
    }
};


