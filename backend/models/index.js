const mongoose = require("mongoose")


require('dotenv').config();

const announcementSchema = require('./schema/Announcements.js');
const eventPostSchema = require('./schema/EventPostSchema.js');
const lostAndFoundSchema = require('./schema/LostAndFoundSchema.js');

const dbURL = process.env.DB_URL;

// Connect to MongoDB
mongoose.connect(dbURL)
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Connection error', err);
});


// Create the User model

const Announcements = mongoose.models.Announcements || require('Announcements', announcementSchema);
const EventPost = mongoose.models.EventPost || require('EventPost', eventPostSchema);
const LostAndFound = mongoose.models.LostAndFound || require('LostAndFound', lostAndFoundSchema);



module.exports =  { Announcements, EventPost, LostAndFound } ;