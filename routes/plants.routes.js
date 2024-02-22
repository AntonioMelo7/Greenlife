const router = require("express").Router();
const Event = require ('./../models/Plant.models')

router.get('/getAllPlants', (req, res) =>{
    
    Plant
        .find()
        .select ('name image')
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

module.exports = router;