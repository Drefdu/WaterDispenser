const express = require("express");
const router = express.Router();
const authenticateJWT = require('../controllers/login-check')
// const Sucursales = require('../models/sucursales')
// const Venta = require('../models/ventasDiarias');
// const Admin = require('../models/admin')
const { obtenerSucursales, obtenerVentasDiarias, obtenerVentasSemanales, obtenerVentasMensuales, obtenerUsuarios } = require('../controllers/funcionesDB');
const Admin = require("../models/admin");
// Views

router.get("/", async (req,res)=>{
    const messages = req.flash('error');
    return res.render("login", { messages: messages });
});

router.get("/login-tel", authenticateJWT, async (req,res)=>{
    const correo = req.session.user;
    console.log(correo)
    const messages = req.flash('error');
    return res.render("login-tel", { messages: messages, correo:correo });
});

router.get("/dashboard", authenticateJWT, async (req,res)=>{
    try {
        const sucursales = await obtenerSucursales(req,res);
        const ventasDiarias = await obtenerVentasDiarias(req,res);
        const ventasSemanales = await obtenerVentasSemanales(req,res);
        const ventasMensuales = await obtenerVentasMensuales(req,res);
        return res.render("dashboard", { user: req.session.user, sucursales, ventasDiarias, ventasSemanales, ventasMensuales });
    } catch (error) {        
        console.error('Error al obtener pacientes:', err);
        return res.status(500).send('Error interno del servidor.');
    }
});

// Functions

router.get('/home',authenticateJWT, async (req, res) => {
    try{
        const sucursales = await obtenerSucursales(req,res);
        const ventasDiarias = await obtenerVentasDiarias(req,res);
        const ventasSemanales = await obtenerVentasSemanales(req,res);
        const ventasMensuales = await obtenerVentasMensuales(req,res);
        return res.render("home", { sucursales, ventasDiarias, ventasSemanales, ventasMensuales });
    } catch (error) {        
        console.error('Error al obtener pacientes:', error);
        return res.status(500).send('Error interno del servidor.');
    }
});

router.get('/config', authenticateJWT, async (req, res) => {

    const correo  = req.session.user.email;
    const admin = await Admin.findOne({ correo });
    const usuarios = await obtenerUsuarios(req,res);
    console.log(usuarios)
    return res.render("config",{ user: admin, usuarios:usuarios });
});

router.get('/api/locations', (req, res) => {
    res.json(locations);
});

module.exports = router;