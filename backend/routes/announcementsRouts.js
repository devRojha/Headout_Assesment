
const express = require("express");

const announcementsController = require("../controllers/announcementsController.js");    


const router = express.Router();

// get all announcements
router.get("/", announcementsController.getAllannouncements);

// create an announcement
router.post("/", announcementsController.announcementsCreate);

// get announcement by id
router.get("/:id", announcementsController.getIndividualannouncements);

// update announcement by id
router.put("/:id", announcementsController.updateannouncements);

// delete announcement by id
router.delete("/:id", announcementsController.deleteannouncements);

module.exports = router