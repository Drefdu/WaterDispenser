const express = require("express");
const router = express.Router();
const authenticateJWT = require('../controllers/login-check')
const Sucursales = require('../models/sucursales')
const Venta = require('../models/ventasDiarias');
const Admin = require('../models/admin')
// Views

router.get("/", async (req,res)=>{
    const messages = req.flash('error');
    return res.render("login", { messages: messages });
});

router.get("/dashboard", async (req,res)=>{
    
    try {
        sucursales = await Sucursales.find()

        const ventasDiarias = await Venta.find();

        const hoy = new Date();
        const inicioDeLaSemana = new Date(hoy.setDate(hoy.getDate() - hoy.getDay())); // Domingo
        const finDeLaSemana = new Date(hoy.setDate(hoy.getDate() + 6)); // Sábado

        const ventasSemanales = await Venta.find({
            fecha: { $gte: inicioDeLaSemana, $lt: finDeLaSemana }
        });

        return res.render("dashboard", { sucursales, ventasDiarias, ventasSemanales });
    } catch (error) {
        
    }
});

// Functions

router.get('/home', authenticateJWT, (req, res) => {
    return res.render("home", { user: req.session.user });
});

router.get('/config', authenticateJWT, async (req, res) => {

    const correo  = req.session.user.email;
    const admin = await Admin.findOne({ correo });

    console.log(admin)
    
    return res.render("config",{ user: admin });
});

router.get('/api/locations', (req, res) => {
    res.json(locations);
});

module.exports = router;