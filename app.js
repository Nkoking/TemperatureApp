const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const temperature = require("./temperatureSchema");

mongoose.connect("mongodb://localhost/tempData", { useMongoClient: true });
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function(req, res){
    res.send("Use /get and /post to get or post new data.")
});

app.get("/get", function(req, res){
    temperature.find({}, function(err, data){
        if(err){
            res.send(err)};
        res.json(data);
    });
});

app.post("/post", function(req, res){

    var newTemperature = new temperature();
    newTemperature["temperature"] = req.body.temperature;

    newTemperature.save(function(err){
        if(err){
            res.send(err)};
        res.json({response: "success"})

    });
});

app.listen("80")