const EventPost = require("../models/index.js").EventPost;

// Create a new event
const eventsCreate = async (data) => {
    try {
        const event = new EventPost(data);
        const savedEvent = await event.save();
        return savedEvent;
    } catch (error) {
        throw { status: 500, message: error.message };
    }
};

// Get all events
const getAllevents = async () => {
    try {
        const events = await EventPost.find().sort({ date: -1 });
        return events;
    } catch (error) {
        throw { status: 500, message: error.message };
    }
};

// Get event by ID
const getIndividualevents = async (id) => {
    try {
        const event = await EventPost.findById(id);
        if (!event) {
            throw { status: 404, message: "Event not found" };
        }
        return event;
    } catch (error) {
        throw { status: error.status || 500, message: error.message };
    }
};

// Update event by ID
const updateevents = async (id, data) => {
    try {
        const updatedEvent = await EventPost.findByIdAndUpdate(id, data, { new: true });
        if (!updatedEvent) {
            throw { status: 404, message: "Event not found" };
        }
        return updatedEvent;
    } catch (error) {
        throw { status: error.status || 500, message: error.message };
    }
};

// Delete event by ID
const deleteevents = async (id) => {
    try {
        const deletedEvent = await EventPost.findByIdAndDelete(id);
        if (!deletedEvent) {
            throw { status: 404, message: "Event not found" };
        }
        return { message: "Event deleted successfully" };
    } catch (error) {
        throw { status: error.status || 500, message: error.message };
    }
};

module.exports = {
    eventsCreate,
    getAllevents,
    getIndividualevents,
    updateevents,
    deleteevents
};
