const mongoose = require('mongoose');

const CamaraSchema = new mongoose.Schema({
    numero: {
        type: Number,
        required: true
    },
    ip: {
        type: String,
        required: true,
        match: [/^(\d{1,3}\.){3}\d{1,3}$/, 'Por favor, ingrese una dirección IP válida']
    },
    estado: {
        type: String,
        enum: ['funcionando', 'no funcionando'],
        required: true,
        default: 'funcionando'
    }
});
const SucursalSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    funcionando: {
        type: Boolean,
        required: true,
        default: true
    },
    camaras: [CamaraSchema]
});

module.exports = mongoose.model('Sucursal', SucursalSchema);