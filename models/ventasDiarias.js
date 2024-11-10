const mongoose = require('mongoose');

const VentasDiariasSchema = new mongoose.Schema({
    sucursalesId:{
        type: String,
        required: true
    },
    fecha:{
        type: Date,
        default: Date.now
    },
    moneda1:{
        type:Number
    },
    moneda2:{
        type:Number
    },
    moneda5:{
        type:Number
    },
    moneda10:{
        type:Number
    },
    total:{
        type:Number,
        required: true
    },
    cantidadAgua:{
        type:Number,
        required: true
    }
});

module.exports = mongoose.model('Venta', VentasDiariasSchema);