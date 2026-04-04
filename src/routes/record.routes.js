const express = require("express");
const router = express.Router();

const recordController = require("../controllers/record.controller");
const { authorizeRoles } = require("../middleware/role.middleware");

// ✅ APPLY MIDDLEWARE CORRECTLY
router.post("/", authorizeRoles("admin"), recordController.createRecord);

router.get("/", authorizeRoles("admin", "analyst", "viewer"), recordController.getRecords);

router.get("/dashboard", authorizeRoles("admin", "analyst"), recordController.getDashboard);

module.exports = router;