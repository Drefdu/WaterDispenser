const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellidos: {
        type: String,
        required: true,
        trim: true
    },
    rol: {
        type: String,
        required: true,
        trim: true
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, "Por favor ingrese un correo válido"]
    },
    codigo:{
        type:String
    },
    telefono: {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: "El número de teléfono debe tener 10 dígitos"
        }
    }
});

module.exports = mongoose.model('Admin', AdminSchema);