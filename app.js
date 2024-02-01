const express = require('express');
const app = express();
const puerto = 5005;

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});