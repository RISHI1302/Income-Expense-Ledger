const express = require("express");
const router = express.Router();
const {
    createTransaction,
    getTransactions,
    updateTransaction,
} = require("../controllers/transactionController.js");

router.post("/", createTransaction);
router.get("/", getTransactions);
router.put("/:id", updateTransaction);

module.exports = router;