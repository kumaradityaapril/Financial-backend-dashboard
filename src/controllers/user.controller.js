const userService = require("../services/user.service");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;


    if (!name || !email || !password || !role) {
      return res.status(400).json({
        error: "All fields (name, email, password, role) are required",
      });
    }

    const validRoles = ["admin", "analyst", "viewer"];

    if (!validRoles.includes(role)) {
      return res.status(400).json({
        error: "Invalid role. Must be admin, analyst, or viewer",
      });
    }

    const user = await userService.createUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ error: "Email already exists" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};