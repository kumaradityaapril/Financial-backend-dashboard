const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const { authorizeRoles } = require("../middleware/role.middleware");


router.post("/", authorizeRoles("admin"), userController.createUser);


router.get("/", authorizeRoles("admin"), userController.getUsers);

module.exports = router;