const mongoose = require("mongoose");

const temperatureAppSchema = new mongoose.Schema({
    temperature: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("temperature", temperatureAppSchema);