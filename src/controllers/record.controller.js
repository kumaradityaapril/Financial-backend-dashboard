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
    const { type, category, startDate, endDate } = req.query;

    const records = await recordService.getFilteredRecords({
      type,
      category,
      startDate,
      endDate,
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const income = await recordService.getTotalIncome();
    const expense = await recordService.getTotalExpense();
    const balance = await recordService.getNetBalance();
    const category = await recordService.getCategoryTotals();

    res.json({
      total_income: income.total_income,
      total_expense: expense.total_expense,
      net_balance: balance.net_balance,
      category_breakdown: category,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};