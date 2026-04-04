const express = require("express");
const app = express();

app.use(express.json());

const userRoutes = require("./routes/user.routes");
const recordRoutes = require("./routes/record.routes");

app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

module.exports = app;