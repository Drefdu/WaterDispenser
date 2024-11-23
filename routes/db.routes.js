const express = require("express");
const router = express.Router();
const { registroAdmin, registroSucursal, registroVenta, obtenerAdminPorCorreo, obtenerSucursales, obtenerVentasDiarias, obtenerVentasSemanales, obtenerVentasMensuales, actualizarAdminPorCorreo, actualizarEstadoCamara, envioCodigo, validarAdminPorCodigo, obtenerUsuarios } = require('../controllers/funcionesDB');
const axios = require('axios');

router.post('/registroAdmin', registroAdmin);
router.post('/registroSucursal', registroSucursal);
router.post('/registroVenta', registroVenta);

router.post('/actualiarAdmin/:correo', actualizarAdminPorCorreo);
router.post('/actualiarCamaras', actualizarEstadoCamara);

router.post('/obtenerAdmin', obtenerAdminPorCorreo);
router.get('/obtenerSucursales', obtenerSucursales);
router.get('/obtenerVentasD', obtenerVentasDiarias);
router.get('/obtenerVentasS', obtenerVentasSemanales);
router.get('/obtenerVentasM', obtenerVentasMensuales);

//Telefono
router.post('/enviar_sms/:correo', envioCodigo);
router.post('/validarCodigo',validarAdminPorCodigo);

module.exports = router;