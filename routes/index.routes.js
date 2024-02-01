const router = require("express").Router();

router.get("/",(req, res, next) =>{
    res.json("todo bien por aqui");
});

module.exports = router;