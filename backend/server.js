const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app= express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const uri = process.env.Atlas_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
})

const tripsRouter = require("./routes/trips")

app.use("/trips", tripsRouter);

app.listen(port, () => {
    console.log("server is running on port " + port);
});