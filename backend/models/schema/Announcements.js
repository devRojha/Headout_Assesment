const mongoose = require("mongoose")


const AnnouncementsSchema = new mongoose.Schema({
    department : { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    resourceLink: { type: String , required: false },
});

module.exports = mongoose.model("Announcements", AnnouncementsSchema);