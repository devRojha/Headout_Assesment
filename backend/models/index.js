const mongoose = require("mongoose")


require('dotenv').config();

const dbURL = process.env.DB_URL;

// Connect to MongoDB
mongoose.connect(dbURL)
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Connection error', err);
});


// Create the User model

const Announcements = mongoose.models.Announcements || require('Announcements', './schema/Announcements');
const EventPost = mongoose.models.EventPost || require('EventPost', './schema/EventPostSchema');
const LostAndFound = mongoose.models.LostAndFound || require('LostAndFound', './schema/LostAndFoundSchema');



module.exports =  { Announcements, EventPost, LostAndFound } ;