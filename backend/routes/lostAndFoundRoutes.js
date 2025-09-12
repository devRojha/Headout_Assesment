
const express = require("express");

const lostAndFoundController = require("../controllers/lostAndUpdateController");


const router = express.Router();

// post an event
router.post("/", lostAndFoundController.lostAndUpdateCreate);
// get all events
router.get("/", lostAndFoundController.getAlllostAndUpdate);
// get event by id
router.get("/:id", lostAndFoundController.getIndividualLostAndUpdate);
// update event by id
router.put("/:id", lostAndFoundController.updatelostAndUpdate);
// delete event by id
router.delete("/:id", lostAndFoundController.deletelostAndUpdate);


module.exports = router