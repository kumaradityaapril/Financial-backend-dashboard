exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const role = req.headers.role;

    console.log("ROLE:", req.headers.role);

    if (!role) {
      return res.status(403).json({ error: "Role header missing" });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ error: "Access denied" });
    }

    next();
  };
};