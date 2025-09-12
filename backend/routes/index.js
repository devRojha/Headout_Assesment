
const express = require("express");

const announcementsRoutes = require("./announcementsRouts.js");
const eventsRoutes = require("./eventsRoute.js");
const lostAndFoundRoutes = require("./lostAndFoundRoutes.js");
const openApiRoutes = require("./OpenAIresponse.js");

const router = express.Router();


router.use("/event", eventsRoutes);
router.use("/lostfound", lostAndFoundRoutes);
router.use("/announcement", announcementsRoutes);
router.use("/openApi", openApiRoutes);



module.exports = router