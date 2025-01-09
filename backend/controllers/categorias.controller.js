const categoriasModel = require('../models/categorias.models')

exports.categorias = async (req, res) => {
    try {
        const categorias = await categoriasModel.find();  
        res.render('admin/categorias/categorias', { categorias });  
    } catch (error) {
        console.error("Error al listar categorías:", error); 
        res.status(500).json({ mensaje: "Error al listar categorías", error: error.message }); 
    }
};


exports.crearCategorias = async (req, res) => {
    try {
        const nuevaCategoria = new categoriasModel({
            nombre: req.body.nombreCategoriaCrear,
            descripcion: req.body.descripcionCategoriaCrear,
            presentacion: req.body.presentacionCategoriaCrear,
        });

        const nombreExistente = await categoriasModel.findOne({ nombre: req.body.nombreCategoriaCrear });
        if (nombreExistente) {
            return res.status(400).json({ mensaje: "El nombre ya está en uso. Por favor, utiliza otro." });
        }

        await nuevaCategoria.save();
        res.json({ mensaje: "Categoria creada con éxito" });
    } catch (error) {
        console.log('Error al registrar la categoria:', error);
        res.status(400).json({ mensaje: "Error al registrar la categoria. Intenta nuevamente." });
    }
};

exports.detalleCategorias = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await categoriasModel.findById(id);

        if (!categoria) {
            return res.status(404).json({ mensaje: "Categoria no encontrada" });
        }

        res.json(categoria);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'No se pudo encontrar la categoria' });
    }
};

exports.editarCategorias = async (req, res) => {
    try {
        const { id } = req.params;
        const { editarCategoriaNombre, editarCategoriaDescripcion, editarCategoriaPresentacion } = req.body;

        const datosActualizados = {
            nombre: editarCategoriaNombre,
            descripcion: editarCategoriaDescripcion,
            presentacion: editarCategoriaPresentacion,
        };

        const actualizarCategoria = await categoriasModel.findByIdAndUpdate(id, datosActualizados, { new: true, runValidators: true });

        if (!actualizarCategoria) {
            return res.status(404).json({ mensaje: "Categoria no encontrada" });
        }

        res.json({ mensaje: "Categoria actualizada exitosamente" });

    } catch (error) {
        console.error("Error al actualizar la categoria:", error);
        res.status(500).json({ mensaje: "Se presentó un error al editar el categoria", error: error.message });
    }
};

exports.eliminarCategorias = async (req, res) => {
    try {
        await categoriasModel.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Categoria eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Se presentó un error al eliminar la categoria" });
    }
};