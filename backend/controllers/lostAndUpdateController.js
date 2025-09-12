
const lostAndupdateService = require("../services/lostAndupdateService.js");

const lostAndUpdateCreate = async (req, res) => {
    try {
        const result = await lostAndupdateService.lostAndUpdateCreate(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const getAlllostAndUpdate = async (req, res) => {
    try {
        const result = await lostAndupdateService.getAlllostAndUpdate(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const getIndividualLostAndUpdate = async (req, res) => {
    try {
        const result = await lostAndupdateService.getIndividualLostAndUpdate(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const deletelostAndUpdate = async (req, res) => {
    try {
        const result = await lostAndupdateService.deletelostAndUpdate(req.params.id)
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
}

const updatelostAndUpdate = async (req, res) => {
    try {
        const result = await lostAndupdateService.updatelostAndUpdate(req.params.id)
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
} 



module.exports = {
    lostAndUpdateCreate,
    getAlllostAndUpdate,
    getIndividualLostAndUpdate,
    deletelostAndUpdate,
    updatelostAndUpdate
};