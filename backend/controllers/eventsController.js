const eventsService = require("../services/eventsService");

// Create a new event
const eventsCreate = async (req, res) => {
    try {
        const result = await eventsService.eventsCreate(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

// Get all events
const getAllevents = async (req, res) => {
    try {
        const result = await eventsService.getAllevents();
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

// Get event by ID
const getIndividualevents = async (req, res) => {
    try {
        const result = await eventsService.getIndividualevents(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

// Update event by ID
const updateevents = async (req, res) => {
    try {
        const result = await eventsService.updateevents(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

// Delete event by ID
const deleteevents = async (req, res) => {
    try {
        const result = await eventsService.deleteevents(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

module.exports = {
    eventsCreate,
    getAllevents,
    getIndividualevents,
    updateevents,
    deleteevents
};
