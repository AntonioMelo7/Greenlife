//Conecta a la base de datos
require ("./db");


const express = require("express");
const mongoose = require("mongoose");

const app = express();
const puerto = process.env.PORT || 5005;

//Conectar las rutas
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());

const allRoutes = require ('./routes/index.routes');
app.use('/api', allRoutes);

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});



module.exports = app;
