const recordService = require("../services/record.service");

exports.createRecord = async (req, res) => {
  try {
    const record = await recordService.createRecord(req.body);
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecords = async (req, res) => {
  try {
    const records = await recordService.getRecords();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
