const inventarioModel = require('../models/inventario.models');
const productosModel = require('../models/productos.models')
const almacenModel = require('../models/almacenes.models')

exports.inventario = async (req, res) => {
    try {
        const inventario = await inventarioModel.find()
            .populate('producto')    
            .populate('ubicacion');  

        res.render('admin/inventario/inventario', { inventario });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al listar el inventario", error: error.message }); 
    }
}


exports.obtenerProductosYUbicaciones = async (req, res) => {
    try {
        const [productos, ubicaciones] = await Promise.all([
            
            productosModel.find(),
            almacenModel.find()
             
        ]);

        res.json({ productos, ubicaciones });  
    } catch (error) {
        console.error("Error al obtener productos y ubicaciones:", error);
        res.status(500).json({ mensaje: "Error al obtener datos", error: error.message });
    }
};

exports.crearInventario = async (req, res) => {
    try {
        const nuevoInventario = new inventarioModel({
            producto: req.body.productoInventarioCrear, 
            cantidad: req.body.cantidadInventarioCrear, 
            ubicacion: req.body.ubicacionInventarioCrear 
        });

        await nuevoInventario.save();

        res.json({ mensaje: "Inventario creado con éxito", inventario: nuevoInventario });
    } catch (error) {
        console.log('Error al registrar el inventario:', error);
        res.status(400).json({ mensaje: "Error al registrar el inventario. Intenta nuevamente." });
    }
};

exports.detalleInventario = async (req, res) => {
    try {
        const { id } = req.params; 
        const inventario = await inventarioModel.findById(id).populate('producto ubicacion'); 

        if (!inventario) {
            return res.status(404).json({ mensaje: "Inventario no encontrado" }); 
        }

        res.json(inventario); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'No se pudo encontrar el inventario' }); 
    }
};

exports.editarInventario = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            editarInventarioCantidad,
            editarInventarioUbicacion,
            editarInventarioProducto
        } = req.body;

        const datosActualizados = {
            cantidad: editarInventarioCantidad,
            ubicacion: editarInventarioUbicacion,
            producto: editarInventarioProducto, 
        };

        const actualizarInventario = await inventarioModel.findByIdAndUpdate(id, datosActualizados, { new: true, runValidators: true });

        if (!actualizarInventario) {
            return res.status(404).json({ mensaje: "Inventario no encontrado" });
        }

        res.json({ mensaje: "Inventario actualizado exitosamente" });

    } catch (error) {
        console.error("Error al actualizar el inventario:", error);
        res.status(500).json({ mensaje: "Se presentó un error al editar el inventario", error: error.message });
    }
};

exports.eliminarInventario = async (req, res) => {
    try {
        const inventarioId = req.params.id;
        
        const inventario = await inventarioModel.findById(inventarioId);
        
        if (!inventario) {
            return res.status(404).json({ mensaje: "Inventario no encontrado" });
        }

        await inventarioModel.findByIdAndDelete(inventarioId);
        
        res.json({ mensaje: "Inventario eliminado exitosamente" });


    } catch (error) {
        console.error(error); 
        res.status(500).json({ mensaje: "Se presentó un error" });
    }
};


