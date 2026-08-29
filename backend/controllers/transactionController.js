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

const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const transaction = await Transaction.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );
        
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Page Not Found",
            });
        }
        
        res.status(200).json({
            success: true,
            data: transaction
        });
        
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    };
}

module.exports = {
    createTransaction,
    getTransactions,
    updateTransaction,
};