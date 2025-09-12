const mongoose = require("mongoose")


const LostAndFoundSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["lost", "found"], 
    required: true,
  },

  itemName: { type: String, required: true },

  location: { type: String, required: true },

  imageUrl: { type: String, default: null },

  contactInfo: { type: String, required: true },
  
  dateReported: { type: Date, default: Date.now },
});

module.exports = mongoose.model("LostAndFound", LostAndFoundSchema);