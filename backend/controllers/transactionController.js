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
}