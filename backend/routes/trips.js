const router = require("express").Router();
let Trip = require("../models/trip.model");

router.route("/").get((req, res) => {
    Trip.find()
        .then(trips => res.json(trips))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req,res) =>{
    const date = Date.parse(req.body.date);
    const time = req.body.time;
    const location = req.body.location;
    const weather = req.body.weather;
    const fishCaught = req.body.fishCaught;
    const generalNotes = req.body.generalNotes;
    const imageURL = req.body.imageURL;

    const newTrip = new Trip({
        date,
        time,
        location,
        weather,
        fishCaught,
        generalNotes,
        imageURL,
    });

    newTrip.save()
    .then(() => res.json("Trip added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req,res) =>{
    Trip.findById(req.params.id)
        .then(trip => res.json(trip))
        .catch(err => res.status(400).json("Error: " + err))
})

router.route("/:id").delete((req,res) =>{
    Trip.findByIdAndDelete(req.params.id)
        .then(() => res.json("Trip deleted"))
        .catch(err => res.status(400).json("Error: " + err))
})

router.route("/update/:id").post((req,res) =>{
    Trip.findById(req.params.id)
    .then(trip => {
        trip.date = Date.parse(req.body.date);
        trip.time = req.body.time;
        trip.location = req.body.location;
        trip.weather = req.body.weather;
        trip.fishCaught = req.body.fishCaught;
        trip.generalNotes = req.body.generalNotes;
        trip.imageURL = req.body.imageURL;

        trip.save()
            .then(() => res.json('Trip updated!'))
            .catch(err => res.status(400).json("Error: " + err))
    })
    .catch(err => res.status(400).json("Error: " + err))
})



module.exports = router;