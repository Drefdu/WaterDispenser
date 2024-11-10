const crypto = require('crypto');
const Admin = require('../models/admin');
const Sucursal = require('../models/sucursales');
const Venta = require('../models/ventasDiarias'); 

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

        return res.status(201).json({ message: "Administrador registrado exitosamente", admin: nuevoAdmin });

    } catch (error) {
        return res.status(500).json({ message: error.message });
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

        return res.status(200).json(admin);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// UPDATE Administrador by Correo
module.exports.actualizarAdminPorCorreo = async (req, res) => {
    try {
        const { nombre, apellidos, correo, correoNuevo, rol, telefono } = req.body;

        // Crear un objeto de actualización solo con los campos que tienen valores
        const updateFields = {};
        if (nombre) updateFields.nombre = nombre;
        if (apellidos) updateFields.apellidos = apellidos;
        if (rol) updateFields.rol = rol;
        if (telefono) updateFields.telefono = telefono;
        if (correoNuevo) updateFields.correo = correoNuevo;

        const admin = await Admin.findOneAndUpdate(
            { correo },
            updateFields,
            { new: true, runValidators: true } // Devuelve el documento actualizado y valida los campos
        );

        if (!admin) {
            return res.status(404).json({ message: "Administrador no encontrado" });
        }

        return res.status(200).json({ message: "Administrador actualizado exitosamente", admin });
    } catch (error) {
        return res.status(500).json({ message: error.message });
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
        return res.status(500).json({ message: error.message });
    }
};

// GET Sucursales
module.exports.obtenerSucursales = async (req, res) => {
    try {
        const sucursales = await Sucursal.find();
        return res.status(200).json(sucursales);
    } catch (error) {
        return res.status(500).json({ message: error.message });
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

        return res.status(200).json({ message: "Estado de cámara actualizado", sucursal });
    } catch (error) {
        return res.status(500).json({ message: error.message });
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
        return res.status(500).json({ message: error.message });
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

        return res.status(200).json(ventasDiarias);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// GET Ventas Semanales
module.exports.obtenerVentasSemanales = async (req, res) => {
    try {
        const hoy = new Date();
        const inicioDeLaSemana = new Date(hoy.setDate(hoy.getDate() - hoy.getDay())); // Domingo
        const finDeLaSemana = new Date(hoy.setDate(hoy.getDate() + 6)); // Sábado

        const ventasSemanales = await Venta.find({
            fecha: { $gte: inicioDeLaSemana, $lt: finDeLaSemana }
        });

        return res.status(200).json(ventasSemanales);
    } catch (error) {
        return res.status(500).json({ message: error.message });
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

        return res.status(200).json(ventasMensuales);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

