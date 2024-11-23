const crypto = require('crypto');
const Admin = require('../models/admin');
const Sucursal = require('../models/sucursales');
const Venta = require('../models/ventasDiarias'); 
const axios = require('axios')

// Administrador
// POST Administrador
module.exports.registroAdmin = async (req, res) => {
    try {
        const { nombre, apellidos, rol, correo, telefono } = req.body;

        if (!nombre || !apellidos || !rol || !correo || !telefono) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
        }

        const existeAdmin = await Admin.findOne({ $or: [{ correo }, { telefono }] });
        if (existeAdmin) {
            return res.status(400).json({ message: "El correo o teléfono ya está registrado" });
        }

        const nuevoAdmin = new Admin({
            nombre,
            apellidos,
            rol,
            correo,
            telefono
        });

        await nuevoAdmin.save();

        return res.redirect('/dashboard')

    } catch (error) {
        return res.json({ message: error.message });
    }
};

// GET Administrador by Correo
module.exports.obtenerAdminPorCorreo = async (req, res) => {
    try {
        const { correo } = req.body;
        const admin = await Admin.findOne({ correo });
        if (!admin) {
            return res.status(203).json({ message: "Administrador no encontrado" });
        }
        return res.json(admin);
    } catch (error) {
        return res.json({ message: error.message });
    }
};

module.exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Admin.find({ rol: { $ne: 'Administrador' } });
        if (!usuarios) {
            return res.status(203).json({ message: "Administrador no encontrado" });
        }
        return usuarios;
    } catch (error) {
        return res.json({ message: error.message });
    }
};

// UPDATE Administrador by Correo
module.exports.actualizarAdminPorCorreo = async (req, res) => {
    try {
        const correoAdmin = req.params.correo;
        const { nombre, apellidos, correoNuevo, rol, telefono, codigo } = req.body;

        // Crear un objeto de actualización solo con los campos que tienen valores
        const updateFields = {};
        if (nombre) updateFields.nombre = nombre;
        if (apellidos) updateFields.apellidos = apellidos;
        if (rol) updateFields.rol = rol;
        if (telefono) updateFields.telefono = telefono;
        if (correoNuevo) updateFields.correo = correoNuevo;
        if (codigo) updateFields.codigo = codigo;

        const admin = await Admin.findOneAndUpdate(
            { correo:correoAdmin },
            updateFields,
            { new: true, runValidators: true } // Devuelve el documento actualizado y valida los campos
        );

        if (!admin) {
            return res.status(404).json({ message: "Administrador no encontrado" });
        }

        return res.json({ message: "Administrador actualizado exitosamente", admin });
    } catch (error) {
        return res.json({ message: error.message });
    }
};

// Enviar codigo
module.exports.envioCodigo = async (req, res) => {
    const correoAdmin = req.params.correo;
    const url = 'https://rest.clicksend.com/v3/sms/send';
    const username = process.env.TEL_USER;
    const password = process.env.TEL_PASS;
    const { telefono } = req.body;
    // Aquí asegúrate de que req.body contenga los datos esperados
    const codigoNuevo = Math.floor(1000 + Math.random() * 9000);
    const data = {
        messages: [
            {
                body: `Tu codigo de seguridad es ${codigoNuevo}`,
                to: `+52${telefono}`,
                from: "{{from}}"
            }
        ]
    };

    axios.post(url, data, {
        auth: {
            username: username,
            password: password
        }
    })
    .then(async response => {
        const updateFields = {};
        updateFields.codigo = codigoNuevo;

        const admin = await Admin.findOneAndUpdate(
            { correo:correoAdmin },
            updateFields,
            { new: true, runValidators: true } // Devuelve el documento actualizado y valida los campos
        );
        return res.status(200).json({ message: 'SMS enviado exitosamente', data: response.data });
    })
    .catch(error => {
        return res.status(500).json({ message: 'Error al enviar SMS', error: error.message });
    });
}

//Validar Codigo
module.exports.validarAdminPorCodigo = async (req, res) => {
    try {
        const { correo, codigo } = req.body;

        // Crear un objeto de actualización solo con los campos que tienen valores
        const updateFields = {
            codigo : ""
        }
        const adminDatos = await Admin.findOne({ correo });
        if (!adminDatos) {
            return res.status(404).json({ message: "Administrador no encontrado" });
        }
        if(codigo == adminDatos.codigo){
            const admin = await Admin.findOneAndUpdate(
                { correo },
                updateFields,
                { new: true, runValidators: true } // Devuelve el documento actualizado y valida los campos
            );
            if (!admin) {
                return res.status(404).json({ message: "Administrador no encontrado" });
            }
            return res.redirect('/dashboard')
        }
        else{
            return res.status(404).json({ message: "El codigo es incorrecto" });
        }
    } catch (error) {
        return res.json({ message: error.message });
    }
};

// Sucursalees
// POST Sucursales
module.exports.registroSucursal = async (req, res) => {
    try {
        const { nombre, direccion, camaras } = req.body;

        if (!nombre || !direccion) {
            return res.status(400).json({ message: "Nombre y dirección son requeridos" });
        }

        const nuevaSucursal = new Sucursal({
            nombre,
            direccion,
            camaras // Asegúrate de que camaras sea un arreglo de objetos válidos
        });

        await nuevaSucursal.save();

        return res.status(201).json({ message: "Sucursal registrada exitosamente", sucursal: nuevaSucursal });
    } catch (error) {
        return res.json({ message: error.message });
    }
};

// GET Sucursales
module.exports.obtenerSucursales = async (req, res) => {
    try {
        const sucursales = await Sucursal.find();
        return sucursales;
    } catch (error) {
        return res.json({ message: error.message });
    }
};

// UPDATE Sucursales Camaras Estado
module.exports.actualizarEstadoCamara = async (req, res) => {
    try {
        const { sucursalId, camaraNumero, estado } = req.body;

        const sucursal = await Sucursal.findOneAndUpdate(
            { _id: sucursalId, "camaras.numero": camaraNumero },
            { $set: { "camaras.$.estado": estado } },
            { new: true }
        );

        if (!sucursal) {
            return res.status(404).json({ message: "Sucursal o cámara no encontrada" });
        }
        return res.json({ message: "Estado de cámara actualizado", sucursal });
    } catch (error) {
        return res.json({ message: error.message });
    }
};


// Ventas
// POST Ventas
module.exports.registroVenta = async (req, res) => {
    try {
        const { sucursalesId, moneda1, moneda2, moneda5, moneda10, cantidadAgua } = req.body;
        let totalMoneda1 = moneda1 * 1;
        let totalMoneda2 = moneda2 * 2;
        let totalMoneda5 = moneda5 * 5;
        let totalMoneda10 = moneda10 * 10;
        const total = totalMoneda1 + totalMoneda2 + totalMoneda5 + totalMoneda10; 

        const nuevaVenta = new Venta({
            sucursalesId,
            moneda1,
            moneda2,
            moneda5,
            moneda10,
            total,
            cantidadAgua
        });

        await nuevaVenta.save();

        return res.status(201).json({ message: "Venta registrada exitosamente", venta: nuevaVenta });
    } catch (error) {
        return res.json({ message: error.message });
    }
};

// GET Ventas Diario
module.exports.obtenerVentasDiarias = async (req, res) => {
    try {
        const hoy = new Date();
        const inicioDelDia = new Date(hoy.setHours(0, 0, 0, 0));
        const finDelDia = new Date(hoy.setHours(23, 59, 59, 999));

        const ventasDiarias = await Venta.find({
            fecha: { $gte: inicioDelDia, $lt: finDelDia }
        });

        return ventasDiarias;
    } catch (error) {
        return res.json({ message: error.message });
    }
};

// GET Ventas Semanales
module.exports.obtenerVentasSemanales = async (req, res) => {
    try {
        const hoy = new Date();
        const seisDiasAtras = new Date(hoy);
        seisDiasAtras.setDate(hoy.getDate() - 6); // Restar 6 días

        const ventasSemanales = await Venta.find({
            fecha: { $gte: seisDiasAtras, $lte: hoy }
        });

        return ventasSemanales;
    } catch (error) {
        return res.json({ message: error.message });
    }
};

// GET Ventas Mensuales
module.exports.obtenerVentasMensuales = async (req, res) => {
    try {
        const hoy = new Date();
        const inicioDelMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        const finDelMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0); // Último día del mes

        const ventasMensuales = await Venta.find({
            fecha: { $gte: inicioDelMes, $lt: finDelMes }
        });

        return ventasMensuales;
    } catch (error) {
        return res.json({ message: error.message });
    }
};