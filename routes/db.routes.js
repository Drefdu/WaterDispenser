const express = require("express");
const router = express.Router();
const { registroAdmin, registroSucursal, registroVenta, obtenerAdminPorCorreo, obtenerSucursales, obtenerVentasDiarias, obtenerVentasSemanales, obtenerVentasMensuales, actualizarAdminPorCorreo, actualizarEstadoCamara } = require('../controllers/funcionesDB');

router.post('/registroAdmin', registroAdmin);
router.post('/registroSucursal', registroSucursal);
router.post('/registroVenta', registroVenta);

router.post('/actualiarAdmin', actualizarAdminPorCorreo);
router.post('/actualiarCamaras', actualizarEstadoCamara);

router.get('/obtenerAdmin', obtenerAdminPorCorreo);
router.get('/obtenerSucursales', obtenerSucursales);
router.get('/obtenerVentasD', obtenerVentasDiarias);
router.get('/obtenerVentasS', obtenerVentasSemanales);
router.get('/obtenerVentasM', obtenerVentasMensuales);


module.exports = router;