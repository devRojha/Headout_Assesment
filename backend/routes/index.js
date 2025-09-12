
const express = require("express");

const router = express.Router();


router.use("/event", require("./eventsRoutes.js"));
router.use("/lostfound", require("./lostAndFoundRoutes.js"));
router.use("/announcement", require("./announcementsRoutes.js"));



module.exports = router