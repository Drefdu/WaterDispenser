const express = require("express");
const router = express.Router();
const authenticateJWT = require('../controllers/login-check')

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

module.exports = router;