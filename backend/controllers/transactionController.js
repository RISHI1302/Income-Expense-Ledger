const Transaction = require("../models/Transaction.js");

const createTransaction = async (req, res) => {
    try {
        const { type, amount, category, date, description } = req.body;
        const transaction = await Transaction.create({
            type,
            amount,
            category,
            date,
            description,
        });

        res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    };
};

const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json({
            success: true,
            data: transactions
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    };
};

module.exports = {
    createTransaction,
    getTransactions,
};