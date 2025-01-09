const clientesModel = require('../models/clientes.models');

exports.clientes = async (req, res) => {
    try {
        const clientes = await clientesModel.find();
        res.render('admin/clientes/clientes', { clientes });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al listar clientes", error: error.message }); 
    }
}

exports.crearClientes = async (req, res) => {
    try {
        const nuevoCliente = new clientesModel({
            nombre: req.body.nombreClienteCrear,
            documento: req.body.documentoClienteCrear,
            telefono: req.body.telefonoClienteCrear,
            correo: req.body.correoClienteCrear,
            direccion: req.body.direccionClienteCrear 
        });

        const documentoExistente = await clientesModel.findOne({ documento: req.body.documentoClienteCrear });
        if (documentoExistente) {
            return res.status(400).json({ mensaje: "El documento ya está en uso. Por favor, utiliza otro." });
        }

        const correoExistente = await clientesModel.findOne({ correo: req.body.correoClienteCrear });
        if (correoExistente) {
            return res.status(400).json({ mensaje: "El correo ya está en uso. Por favor, utiliza otro." });
        }

        await nuevoCliente.save();
        res.json({ mensaje: "Cliente creado con éxito" });
    } catch (error) {
        console.log('Error al registrar el cliente:', error);
        res.status(400).json({ mensaje: "Error al registrar el cliente. Intenta nuevamente." });
    }
};

exports.detalleClientes = async (req, res) => { 
    try {
        const { id } = req.params; 
        const cliente = await clientesModel.findById(id); 

        if (!cliente) {
            return res.status(404).json({ mensaje: "Cliente no encontrado" }); 
        }

        res.json(cliente); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'No se pudo encontrar el cliente' }); 
    }
};

exports.editarClientes = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            editarClienteNombre,
            editarClienteDocumento,
            editarClienteTelefono,
            editarClienteCorreo,
            editarClienteDireccion
        } = req.body;

        const datosActualizados = {
            nombre: editarClienteNombre,
            documento: editarClienteDocumento,
            telefono: editarClienteTelefono,
            correo: editarClienteCorreo,
            direccion: editarClienteDireccion || null
        };

        const actualizarCliente = await clientesModel.findByIdAndUpdate(id, datosActualizados, { new: true, runValidators: true });

        if (!actualizarCliente) {
            return res.status(404).json({ mensaje: "Cliente no encontrado" });
        }

        res.json({ mensaje: "Cliente actualizado exitosamente" });

    } catch (error) {
        console.error("Error al actualizar el cliente:", error);
        res.status(500).json({ mensaje: "Se presentó un error al editar el cliente", error: error.message });
    }
};

exports.eliminarClientes = async (req, res) => {
    try {
        await clientesModel.findByIdAndDelete(req.params.id); 

        res.json({ mensaje: "Cliente eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Se presentó un error al eliminar el cliente", error: error.message });
    }
};


