const express = require('express')
const bodyParser = require('body-parser');
const app = express()

port = 4000


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("<h1>Hola mundo<h1>")
})

app.listen(port, () => {
  console.log(`server running on: http://localhost:${port}`)
})