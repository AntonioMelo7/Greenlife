const fs = require('fs');
const configPath = './db/config.json'; 
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const MONGO_URI = config.mongo.uri;


const mongoose = require("mongoose");

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });