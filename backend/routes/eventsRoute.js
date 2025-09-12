
const express = require("express");

const eventsController = require("../controllers/eventsController.js");



const router = express.Router();

// post an event
router.post("/", eventsController.eventsCreate);
// get all events
router.get("/",  eventsController.getAllevents);
// get event by id
router.get("/:id", eventsController.getIndividualevents);
// update event by id
router.put("/:id", eventsController.updateevents);
// delete event by id
router.delete("/:id", eventsController.deleteevents);


module.exports = router