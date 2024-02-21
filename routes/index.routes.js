const router = require("express").Router();

//traemos todas las rutas

router.use("/eventos", require('./eventos.routes'))


module.exports = router;