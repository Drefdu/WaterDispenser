const express = require("express");
const router = express.Router();
const authenticateJWT = require('../controllers/login-check')

const locations = [
    { 
      name: "Location 1", 
      coordinates: [-106.45669348233409, 31.6283579276569],
      funcionando: true,
      camaras: [
        { numero: 1, ip: "192.168.1.18", estado: true }
      ]
    },
    { 
      name: "Location 2", 
      coordinates: [-106.37187086975821, 31.65109736423809],
      funcionando: false,
      camaras: [
        { numero: 1, ip: "192.168.1.19", estado: false },
        { numero: 2, ip: "192.168.1.20", estado: true }
      ]
    },
    { 
      name: "Location 3", 
      coordinates: [-106.37439167963745, 31.64546430379584],
      funcionando: true,
      camaras: [
        { numero: 1, ip: "192.168.1.21", estado: true }
      ]
    },
    { 
      name: "Location 4", 
      coordinates: [-106.37029536358366, 31.642781774088252],
      funcionando: false,
      camaras: [
        { numero: 1, ip: "192.168.1.22", estado: true },
        { numero: 2, ip: "192.168.1.23", estado: false }
      ]
    },
    { 
      name: "Location 5", 
      coordinates: [-106.3636782376506, 31.63178259314013],
      funcionando: true,
      camaras: [
        { numero: 1, ip: "192.168.1.24", estado: true }
      ]
    },
    { 
      name: "Location 6", 
      coordinates: [-106.3797484006309, 31.62762402734581],
      funcionando: true,
      camaras: [
        { numero: 1, ip: "192.168.1.25", estado: true },
        { numero: 2, ip: "192.168.1.26", estado: true },
        { numero: 3, ip: "192.168.1.27", estado: false }
      ]
    },
    { 
      name: "Location 7", 
      coordinates: [-106.39849692410789, 31.617562212167368],
      funcionando: false,
      camaras: [
        { numero: 1, ip: "192.168.1.28", estado: false }
      ]
    },
    { 
      name: "Location 8", 
      coordinates: [-106.39424305743664, 31.596764346871495],
      funcionando: true,
      camaras: [
        { numero: 1, ip: "192.168.1.29", estado: true }
      ]
    },
    { 
      name: "Location 9", 
      coordinates: [-106.40243568954425, 31.5891149314072],
      funcionando: true,
      camaras: [
        { numero: 1, ip: "192.168.1.30", estado: false },
        { numero: 2, ip: "192.168.1.31", estado: true }
      ]
    },
    { 
      name: "Location 10", 
      coordinates: [-106.36352068703316, 31.604949867602517],
      funcionando: false,
      camaras: [
        { numero: 1, ip: "192.168.1.32", estado: false }
      ]
    },
    { 
      name: "Location 11", 
      coordinates: [-106.35312234628121, 31.588578106737174],
      funcionando: true,
      camaras: [
        { numero: 1, ip: "192.168.1.33", estado: true }
      ]
    },
    { 
      name: "Location 12", 
      coordinates: [-106.33925789194528, 31.619574662242307],
      funcionando: true,
      camaras: [
        { numero: 1, ip: "192.168.1.34", estado: true },
        { numero: 2, ip: "192.168.1.35", estado: true }
      ]
    },
    { 
      name: "Location 13", 
      coordinates: [-106.32334527958244, 31.62668497063184],
      funcionando: false,
      camaras: [
        { numero: 1, ip: "192.168.1.36", estado: false }
      ]
    },
    { 
      name: "Location 14", 
      coordinates: [-106.33825554271577, 31.566881726719547],
      funcionando: true,
      camaras: [
        { numero: 1, ip: "192.168.1.37", estado: true }
      ]
    },
    { 
      name: "Location 15", 
      coordinates: [-106.3685498783901, 31.548070260448043],
      funcionando: false,
      camaras: [
        { numero: 1, ip: "192.168.1.38", estado: false },
        { numero: 2, ip: "192.168.1.39", estado: true }
      ]
    }
  ];
  

// Views

router.get("/", async (req,res)=>{
    const messages = req.flash('error');
    return res.render("home", { messages: messages });
});

router.get("/login", async (req,res)=>{
    const messages = req.flash('error');
    return res.render("login", { messages: messages });
});

router.get("/dashboard", async (req,res)=>{
    const messages = req.flash('error');
    return res.render("dashboard", { messages: messages });
});

// Functions

router.get('/home', authenticateJWT, (req, res) => {
    return res.render("home", { user: req.session.user });
});

router.get('/api/locations', (req, res) => {
    res.json(locations);
});

module.exports = router;