const router = require("express").Router();
const Event = require("./../models/Event.models");

//trae todos los eventos
router.get("/getAllEvents", (req, res) => {
  Event.find()
    .select("name image date")
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});

//muestra lo datos de un solo evento
router.get("/getOneEvent/:id", (req, res, next) => {
  const { id } = req.params;

  Event.findById(id)
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});

//Guarda un evento

router.post("/saveEvento", (req, res) => {
  const { name, image, date, location, description } = req.body;

  Event.create({ name, image, date, location, description })
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});
module.exports = router;
