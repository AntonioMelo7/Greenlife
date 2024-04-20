const router = require ("express").Router();
const Huella = require ("./../models/Huella.models");

//trae todos los formularios de huella de carbono
router.get("/getAllHuella", (req, res) =>{
    Huella.find()
    .select("question1 question2 question3 question4 question5 question6 question7 question8 question9 question10")
    .then ((response) => res.json(response))
    .catch((err)=> res.status(500).json(err))
})

router.post("/saveHuella", (req, res) =>{
    console.log("EntrandoLLamada")
    console.log(req.body);

    const {  question1, question2, question3, question4, question5,
        question6, question7, question8, question9, question10 } = req.body;

    Huella.create({question1, question2,question3,question4,question5,
        question6, question7, question8, question9, question10})
    .then ((response) => res.json(response))
    .catch((err)=> res.status(500).json(err))
})

module.exports = router;