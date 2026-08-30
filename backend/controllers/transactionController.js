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

        if (err.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }

        res.status(500).json({
            success: false,
            message: err.message
        });
    };
};

const getTransactions = async (req, res) => {
    try {
        const { type, category, startDate, endDate } = req.query;
        const filter = {};
        if (type) {
            filter.type = type;
        }

        if (category) {
            filter.category = category;
        }

        if (startDate || endDate) {
            filter.date = {};

            if (startDate) {
                filter.date.$gte = new Date(startDate);
            }

            if (endDate) {
                filter.date.$lte = new Date(endDate);
            }
        }

        const transactions = await Transaction.find(filter).sort({ date: -1 });
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
            {
                new: true,
                runValidators: true
            }
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
        if (err.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }

        if (err.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid transaction ID",
            });
        }

        res.status(500).json({
            success: false,
            message: err.message
        });
    };
};

const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByIdAndDelete(
            id,
        );
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Transaction deleted successfully"
        });

    } catch (err) {
        if (err.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid transaction ID",
            });
        }

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findById(
            id,
        );

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction doesn't exists",
            });
        }

        res.status(200).json({
            success: true,
            data: transaction,
        });


    } catch (err) {
        if (err.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid transaction ID",
            });
        }

        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

module.exports = {
    createTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
    getTransactionById,
};