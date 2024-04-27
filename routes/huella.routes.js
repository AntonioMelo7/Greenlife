const router = require("express").Router();
const Huella = require("./../models/Huella.models");

//trae todos los formularios de huella de carbono
router.get("/getAllHuella", (req, res) => {
  Huella.find()
    .select(
      "question1 question2 question3 question4 question5 question6 question7 question8 question9 question10"
    )
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});

//Guarfa los datos de los formularios de huella de carbono
router.post("/saveHuella", (req, res) => {
  const {
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
    question9,
    question10,
  } = req.body;

  Huella.create({
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
    question9,
    question10,
  })
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});

//muestra lo datos de un formulario
router.get("/getOneHuella/:id", (req, res, next) => {
  const { id } = req.params;

  Huella.findById(id)
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
