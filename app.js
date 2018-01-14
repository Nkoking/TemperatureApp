const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const temperature = require("./temperatureSchema");

var port = process.env.PORT || 80

server.listen(port, function(){
    console.log("Server & Api on port: %s", port)
});

mongoose.connect("mongodb://localhost/tempData", { useMongoClient: true }).then(() => {
    temparature.find({}, function(err, data){
        console.log(data)
       });
    });

mongoose.Promise = global.Promise;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function(req, res){
    res.sendFile("index.html");
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
    console.log(newTemperature)
    newTemperature.save(function(err){
        if(err){
            res.send(err)};
        res.json({response: "success"})

    });
});