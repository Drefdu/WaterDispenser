// middleware/auth.js
const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
  const token = req.query['lwl-token'] || req.get('Authorization');
  const secret = "5d9d662a-4298-486d-baa9-4410388d78ed"; // reemplaza con la clave secreta real usada para firmar los JWT

  if (req.session.user) {
    console.log(req.session.cookie.maxAge)
    console.log('A user is connected')
    return next();
  }

  if (!token) {
    return res.render("login");
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; 
    req.session.user = decoded
    console.log('A session has been created')
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = authenticateJWT;
