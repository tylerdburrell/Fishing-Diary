const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tripSchema = new Schema({
    date: {type: Date, require: true},
    time: {type: String,required: true},
    location: {type: String, require: true},
    weather: {type: String, require: true},
    fishCaught: {type: String, require: true},
    generalNotes: {type: String, require: false}, 
}, {
    timestamps: true,
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;