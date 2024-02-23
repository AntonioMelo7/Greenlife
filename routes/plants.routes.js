const router = require("express").Router();
const Plant = require ("./../models/Plant.models")

router.get("/getAllPlants", (req, res) =>{   
    Plant.find()
        .select ('name image description')
        .then (response =>  res.json (response))
        .catch (err => res.status (500).json(err))
})

router.get("/getOnePlant/:id", (req, res, next) => {

    const { id } = req.params
  
    Plant
      .findById(id)
      .then(response => res.json(response))
      .catch(err => res.status(500).json(err))
  });
  

router.post("/savePlant", (req, res) => {
  const { name, image, description } = req.body;

  Plant.create({ name, image, description })
    .then((response) => res.json(response))
    .catch((err) => res.status(500).json(err));
});
router.delete("/deletePlant/:id", (req, res) => {
  const { id } = req.params;

  Plant.findByIdAndDelete(id)
    .then((response) => {
      if (!response) {
        // No se encontró el evento con ese ID
        return res.status(404).json({ message: "Esqueje no encontrado" });
      }

      res.json({ message: "Esqueje eliminado exitosamente" });
    })
    .catch((err) => res.status(500).json(err));
});
module.exports = router;