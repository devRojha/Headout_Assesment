
const express = require("express");

const announcementsRoutes = require("./announcementsRouts.js");
const eventsRoutes = require("./eventsRoute.js");
const lostAndFoundRoutes = require("./lostAndFoundRoutes.js");

const router = express.Router();


router.use("/event", eventsRoutes);
router.use("/lostfound", lostAndFoundRoutes);
router.use("/announcement", announcementsRoutes);



module.exports = router