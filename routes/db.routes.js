const express = require("express");
const router = express.Router();
const { registroAdmin, registroSucursal, registroVenta, obtenerAdminPorCorreo, obtenerSucursales, obtenerVentasDiarias, obtenerVentasSemanales, obtenerVentasMensuales, actualizarAdminPorCorreo, actualizarEstadoCamara } = require('../controllers/funcionesDB');

router.post('/registroAdmin', registroAdmin);
router.post('/registroSucursal', registroSucursal);
router.post('/registroVenta', registroVenta);

router.post('/actualiarAdmin', actualizarAdminPorCorreo);
router.post('/actualiarCamaras', actualizarEstadoCamara);

router.post('/obtenerAdmin', obtenerAdminPorCorreo);
router.get('/obtenerSucursales', obtenerSucursales);
router.get('/obtenerVentasD', obtenerVentasDiarias);
router.get('/obtenerVentasS', obtenerVentasSemanales);
router.get('/obtenerVentasM', obtenerVentasMensuales);

//Telefono
const url = 'https://rest.clicksend.com/v3/sms/send';
const username = process.env.TEL_USER;
const password = process.env.TEL_PASS;
router.post('/enviar_sms', (req, res) => {
    const { telefono } = req.body;
    // Aquí asegúrate de que req.body contenga los datos esperados
    const data = {
        messages: [
            {
                body: "Tu codigo de seguridad es 12345",
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
    .then(response => {
        console.log('Respuesta:', response.data);
        res.status(200).json({ message: 'SMS enviado exitosamente', data: response.data });
    })
    .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al enviar SMS', error: error.message });
    });
});

function enviarSMS(req, res, next) {
    const data = {
        messages: [
            {
                body: "Tu codigo de seguridad es 12345",
                to: "+526562553802",
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
    .then(response => {
        console.log('Respuesta:', response.data);
        next()
    })
    .catch(error => {
        console.error('Error:', error);
        res.send('<script>alert("Algo a fallado"); window.location.href = "/verificar";</script>');
    });
}

module.exports = router;