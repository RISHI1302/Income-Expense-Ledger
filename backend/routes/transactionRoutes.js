const express = require("express");
const router = express.Router();
const {
    createTransaction,
    getTransactions
} = require("../controllers/transactionController.js");

router.post("/", createTransaction);
router.get("/", getTransactions);

module.exports = router;