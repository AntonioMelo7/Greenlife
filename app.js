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


const allRoutes = require ('./routes/index.routes');
app.use('/api', allRoutes);

/*
// Conectar a la base de datos MongoDB
mongoose.connect("mongodb://localhost:27017/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
*/
app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});



module.exports = app;
