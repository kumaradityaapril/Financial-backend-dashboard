const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const { authorizeRoles } = require("../middleware/role.middleware");

// Create user → Admin only
router.post("/", authorizeRoles("admin"), userController.createUser);

// Get users → Admin only
router.get("/", authorizeRoles("admin"), userController.getUsers);

module.exports = router;