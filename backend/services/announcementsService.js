const Announcements = require("../models/index.js").Announcements;

// Create a new announcement
const announcementsCreate = async (data) => {
    try {
        const announcement = new Announcements(data);
        const savedAnnouncement = await announcement.save();
        return savedAnnouncement;
    } catch (error) {
        throw { status: 500, message: error.message };
    }
};

// Get all announcements
const getAllannouncements = async () => {
    try {
        const announcements = await Announcements.find().sort({ date: -1 });
        return announcements;
    } catch (error) {
        throw { status: 500, message: error.message };
    }
};

// Get announcement by ID
const getIndividualannouncements = async (id) => {
    try {
        const announcement = await Announcements.findById(id);
        if (!announcement) {
            throw { status: 404, message: "Announcement not found" };
        }
        return announcement;
    } catch (error) {
        throw { status: error.status || 500, message: error.message };
    }
};

// Update announcement by ID
const updateannouncements = async (id, data) => {
    try {
        const updatedAnnouncement = await Announcements.findByIdAndUpdate(id, data, { new: true });
        if (!updatedAnnouncement) {
            throw { status: 404, message: "Announcement not found" };
        }
        return updatedAnnouncement;
    } catch (error) {
        throw { status: error.status || 500, message: error.message };
    }
};

// Delete announcement by ID
const deleteannouncements = async (id) => {
    try {
        const deletedAnnouncement = await Announcements.findByIdAndDelete(id);
        if (!deletedAnnouncement) {
            throw { status: 404, message: "Announcement not found" };
        }
        return { message: "Announcement deleted successfully" };
    } catch (error) {
        throw { status: error.status || 500, message: error.message };
    }
};

module.exports = {
    announcementsCreate,
    getAllannouncements,
    getIndividualannouncements,
    updateannouncements,
    deleteannouncements
};
