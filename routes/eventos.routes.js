const router = require("express").Router();
const Event = require ('./../models/Event.model')

router.get('/getAllEvent', (req, res) =>{
    
    Event
        .find()
        .select ('name image date')
        .then (response =>  res.json (response))
        .catch (err => res.status (500).json(err))
})

router.get("/getOneEvent/:id", (req, res, next) => {

    const { id } = req.params
  
    Event
      .findById(id)
      .then(response => res.json(response))
      .catch(err => res.status(500).json(err))
  });

module.exports = router;