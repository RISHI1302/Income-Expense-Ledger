import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0
  });

  useEffect(() => {

    fetchTransactions();
    fetchSummary();

  }, []);

  const fetchTransactions = async () => {
    try {

      const response = await axios.get("http://localhost:5000/api/transactions");
      console.log(response.data);
      setTransactions(response.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/summary"
      );

      setSummary(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="app">

      <h1>Income & Expense Ledger</h1>

      <div className="summary">

        <div>
          <h3>Total Income</h3>
          <p>₹{summary.totalIncome}</p>
        </div>

        <div>
          <h3>Total Expense</h3>
          <p>₹{summary.totalExpense}</p>
        </div>

        <div>
          <h3>Net Balance</h3>
          <p className={summary.netBalance >= 0 ? "positive" : "negative"}>
            ₹{summary.balance}
          </p>
        </div>

      </div>

      <table>

        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {transactions.map((transaction) => (

            <tr key={transaction._id}>

              <td>
                {new Date(transaction.date).toLocaleDateString()}
              </td>

              <td>{transaction.type}</td>

              <td>{transaction.category}</td>

              <td>₹{transaction.amount}</td>

              <td>{transaction.description}</td>

              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default App;