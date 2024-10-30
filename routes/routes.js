const express = require("express");
const router = express.Router();

router.get("/dashboard", async (req,res)=>{
    const messages = req.flash('error');
    return res.render("dashboard", { messages: messages });
});

router.get("/login", async (req,res)=>{
    const messages = req.flash('error');
    return res.render("login", { messages: messages });
});
module.exports = router;