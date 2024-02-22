const express = require("express");
const router = express.Router();

// Traemos todas las rutas
router.use("/eventos", require('./eventos.routes'));
router.use("/plants", require('./plants.routes'));
router.use("/user", require('./user.routes'));

module.exports = router;