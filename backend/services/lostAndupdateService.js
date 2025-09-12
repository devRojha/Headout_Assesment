const LostAndUpdate = require("../models/index.js").LostAndFound;

// Create a new lostAndUpdate entry
const lostAndUpdateCreate = async (data) => {
    try {
        const entry = new LostAndUpdate(data);
        const savedEntry = await entry.save();
        return savedEntry;
    } catch (error) {
        throw { status: 500, message: error.message };
    }
};

// Get all lostAndUpdate entries
const getAlllostAndUpdate = async () => {
    try {
        const entries = await LostAndUpdate.find().sort({ createdAt: -1 });
        return entries;
    } catch (error) {
        throw { status: 500, message: error.message };
    }
};

// Get lostAndUpdate entry by ID
const getIndividualLostAndUpdate = async (id) => {
    try {
        const entry = await LostAndUpdate.findById(id);
        if (!entry) {
            throw { status: 404, message: "Entry not found" };
        }
        return entry;
    } catch (error) {
        throw { status: error.status || 500, message: error.message };
    }
};

// Update lostAndUpdate entry by ID
const updatelostAndUpdate = async (id, data) => {
    try {
        const updatedEntry = await LostAndUpdate.findByIdAndUpdate(id, data, { new: true });
        if (!updatedEntry) {
            throw { status: 404, message: "Entry not found" };
        }
        return updatedEntry;
    } catch (error) {
        throw { status: error.status || 500, message: error.message };
    }
};

// Delete lostAndUpdate entry by ID
const deletelostAndUpdate = async (id) => {
    try {
        const deletedEntry = await LostAndUpdate.findByIdAndDelete(id);
        if (!deletedEntry) {
            throw { status: 404, message: "Entry not found" };
        }
        return { message: "Entry deleted successfully" };
    } catch (error) {
        throw { status: error.status || 500, message: error.message };
    }
};

module.exports = {
    lostAndUpdateCreate,
    getAlllostAndUpdate,
    getIndividualLostAndUpdate,
    updatelostAndUpdate,
    deletelostAndUpdate
};
