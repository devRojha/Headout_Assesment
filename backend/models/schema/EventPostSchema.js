const mongoose = require("mongoose")


const EventPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    imageUrl: { type: String , required: false },
    going : { type: Number, default: 0 },
    interested : { type: Number, default: 0 },
    notGoing : { type: Number, default: 0 },
});

module.exports = mongoose.model("EventPost", EventPostSchema);