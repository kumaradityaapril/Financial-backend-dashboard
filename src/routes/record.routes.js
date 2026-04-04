const express = require("express");
const router = express.Router();

const recordController = require("../controllers/record.controller");

router.post("/", recordController.createRecord);
router.get("/", recordController.getRecords);
router.get("/dashboard", recordController.getDashboard);

module.exports = router;