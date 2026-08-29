const express = require("express");
const cors = require("cors");

const transactionRoutes = require("./routes/transactionRoutes");
const summaryRoutes = require("./routes/summaryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Income Expense Ledger API is running"
    });
});

app.use("/api/transactions", transactionRoutes);
app.use("/api/summary", summaryRoutes);

module.exports = app;