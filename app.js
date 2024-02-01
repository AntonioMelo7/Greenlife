const express = require('express');
const mongoose = require('mongoose');

const app = express();
const puerto = process.env.PORT || 5005;

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
  res.send('¡Hola, chicos!');
});

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});