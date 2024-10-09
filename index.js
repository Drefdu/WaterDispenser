const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const dotenv = require("dotenv");

dotenv.config()

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(dotenv())
app.get('/', (req, res) => {
  res.send("<h1>Hola mundo<h1>")
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on: http://localhost:${port}`)
})