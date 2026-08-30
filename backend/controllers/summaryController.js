const Transaction = require("../models/Transaction.js");

const getSummary = async (req, res) => {
    try {
        let totalIncome = 0;
        let totalExpense = 0;
        let netBalance = 0;

        const transactions = await Transaction.find();

        transactions.forEach(transaction => {
            if (transaction.type == "income") {
                totalIncome += transaction.amount;
            } else if (transaction.type == "expense") {
                totalExpense += transaction.amount;
            }
        });

        netBalance = totalIncome - totalExpense;

        res.status(200).json({
            success: true,
            data: {
                totalIncome,
                totalExpense,
                netBalance,
            }
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    };
}

module.exports = {
    getSummary,
}