const proveedoresModel = require('../models/proovedores.models');

exports.proveedores = async (req, res) => {
    try {
        const proveedores = await proveedoresModel.find();
        res.render('admin/proveedores/proveedores', { proveedores });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al listar proveedores", error: error.message }); 
    }
}

exports.crearProveedores = async (req, res) => {
    try {
        const nuevoProveedor = new proveedoresModel({
            nombre: req.body.nombreProveedorCrear,
            documento: req.body.documentoProveedorCrear,
            telefono: req.body.telefonoProveedorCrear,
            correo: req.body.correoProveedorCrear,
            ubicacion: {
                direccion: req.body.direccionProveedorCrear,
                ciudad: req.body.ciudadProveedorCrear,
                departamento: req.body.departamentoProveedorCrear
            },
            tipoEmpresa: req.body.tipoEmpresaProveedorCrear,
            metodoPago: req.body.metodoPagoProveedorCrear,
        });

        const documentoExistente = await proveedoresModel.findOne({ documento: req.body.documentoProveedorCrear });
        if (documentoExistente) {
            return res.status(400).json({ mensaje: "El documento ya está en uso. Por favor, utiliza otro." });
        }

        const correoExistente = await proveedoresModel.findOne({ correo: req.body.correoProveedorCrear });
        if (correoExistente) {
            return res.status(400).json({ mensaje: "El correo ya está en uso. Por favor, utiliza otro." });
        }

        await nuevoProveedor.save();
        res.json({ mensaje: "Proveedor creado con éxito" });
    } catch (error) {
        console.log('Error al registrar El proveedor:', error);
        res.status(400).json({ mensaje: "Error al registrar el proveedor. Intenta nuevamente." });
    }
};

exports.detalleProveedores = async (req, res) => {
    try {
        const { id } = req.params;
        const proveedor = await proveedoresModel.findById(id);

        if (!proveedor) {
            return res.status(404).json({ mensaje: "Proveedor no encontrado" });
        }

        res.json(proveedor);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'No se pudo encontrar el proveedor' });
    }
};

exports.editarProveedores = async (req, res) => {
    try {
        const { id } = req.params;
        const { editarProveedorNombre, editarProveedorDocumento, editarProveedorTelefono, editarProveedorCorreo, editarProveedorDireccion, editarProveedorCiudad, editarProveedorDepartamento, editarProveedorTipoEmpresa, editarProveedorMetodoPago } = req.body;

        const datosActualizados = {
            nombre: editarProveedorNombre,
            documento: editarProveedorDocumento,
            telefono: editarProveedorTelefono,
            correo: editarProveedorCorreo,
            ubicacion: {
                direccion: editarProveedorDireccion,
                ciudad: editarProveedorCiudad,
                departamento: editarProveedorDepartamento,
            },
            tipoEmpresa: editarProveedorTipoEmpresa,
            metodoPago: editarProveedorMetodoPago,
        };

        const actualizarProveedor = await proveedoresModel.findByIdAndUpdate(id, datosActualizados, { new: true, runValidators: true });

        if (!actualizarProveedor) {
            return res.status(404).json({ mensaje: "Proveedor no encontrado" });
        }

        res.json({ mensaje: "Proveedor actualizado exitosamente" });

    } catch (error) {
        console.error("Error al actualizar el proveedor:", error);
        res.status(500).json({ mensaje: "Se presentó un error al editar el proveedor", error: error.message });
    }
};

exports.eliminarProveedores = async (req, res) => {
    try {
        await proveedoresModel.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Proveedor eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Se presentó un error" });
    }
};