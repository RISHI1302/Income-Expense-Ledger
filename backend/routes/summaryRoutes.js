const express = require("express");
const router=express.Router();
const {getSummary}=require("../controllers/summaryController.js");

router.get("/", getSummary);

module.exports = router;