const announcementsService = require("../services/announcementsService");

// Create announcement
const announcementsCreate = async (req, res) => {
    try {
        const result = await announcementsService.announcementsCreate(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

// Get all announcements
const getAllannouncements = async (req, res) => {
    try {
        const result = await announcementsService.getAllannouncements();
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

// Get announcement by ID
const getIndividualannouncements = async (req, res) => {
    try {
        const result = await announcementsService.getIndividualannouncements(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

// Update announcement by ID
const updateannouncements = async (req, res) => {
    try {
        const result = await announcementsService.updateannouncements(req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

// Delete announcement by ID
const deleteannouncements = async (req, res) => {
    try {
        const result = await announcementsService.deleteannouncements(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

module.exports = {
    announcementsCreate,
    getAllannouncements,
    getIndividualannouncements,
    updateannouncements,
    deleteannouncements
};
