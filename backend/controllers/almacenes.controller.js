const almacenesModel = require('../models/almacenes.models')

exports.almacenes = async (req, res) => {
    try {
        const almacenes = await almacenesModel.find();
        res.render('admin/almacenes/almacenes', { almacenes });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al listar almacenes", error: error.message }); 
    }
}

exports.crearAlmacenes = async (req, res) => {
    try {
        const nuevoAlmacen = new almacenesModel({
            codigo: req.body.codigoAlmacenCrear,
            pasillo: req.body.pasilloAlmacenCrear,
            seccion: req.body.seccionAlmacenCrear,
            estante: req.body.estanteAlmacenCrear,
            nivel: req.body.nivelAlmacenCrear,
            capacidad: req.body.capacidadAlmacenCrear,
            ocupacion: req.body.ocupacionAlmacenCrear,
            producto: req.body.productoAlmacenCrear,
        });

        const codigoExistente = await almacenesModel.findOne({ codigo: req.body.codigoAlmacenCrear });
        if (codigoExistente) {
            return res.status(400).json({ mensaje: "El codigo ya está en uso. Por favor, utiliza otro." });
        }

        await nuevoAlmacen.save();
        res.json({ mensaje: "Almacen creado con éxito" });
    } catch (error) {
        console.log('Error al registrar el almacen:', error);
        res.status(400).json({ mensaje: "Error al registrar el almacen. Intenta nuevamente." });
    }
};

exports.detalleAlmacenes = async (req, res) => {
    try {
        const { id } = req.params;
        const almacen = await almacenesModel.findById(id);

        if (!almacen) {
            return res.status(404).json({ mensaje: "Proveedor no encontrado" });
        }

        res.json(almacen);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'No se pudo encontrar el almacen' });
    }
};

exports.editarAlmacenes = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            editarAlmacenCodigo, 
            editarAlmacenPasillo, 
            editarAlmacenSeccion, 
            editarAlmacenEstante, 
            editarAlmacenNivel, 
            editarAlmacenCapacidad, 
            editarAlmacenOcupacion, 
            editarAlmacenProducto 
        } = req.body;

        const datosActualizados = {
            codigo: editarAlmacenCodigo,
            pasillo: editarAlmacenPasillo,
            seccion: editarAlmacenSeccion,
            estante: editarAlmacenEstante,
            nivel: editarAlmacenNivel,
            capacidad: editarAlmacenCapacidad,
            ocupacion: editarAlmacenOcupacion,
            producto: editarAlmacenProducto || null, 
        };


        const actualizarAlmacen = await almacenesModel.findByIdAndUpdate(id, datosActualizados, { new: true, runValidators: true });

        if (!actualizarAlmacen) {
            return res.status(404).json({ mensaje: "Almacén no encontrado" });
        }

        res.json({ mensaje: "Almacén actualizado exitosamente"});

    } catch (error) {
        console.error("Error al actualizar el almacén:", error);
        res.status(500).json({ mensaje: "Se presentó un error al editar el almacén", error: error.message });
    }
};

exports.eliminarAlmacenes = async (req, res) => {
    try {
        await almacenesModel.findByIdAndDelete(req.params.id);

        res.json({ mensaje: "Almacén eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Se presentó un error al eliminar el almacén", error: error.message });
    }
};
