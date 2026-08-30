const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0.01,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    description: {
        type: String,
    },
},
    {
        timestamps: true,
    },
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;