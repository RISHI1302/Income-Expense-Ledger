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
  const [formData, setFormData] = useState({
    type: "income",
    amount: "",
    category: "",
    date: "",
    description: ""
  });
  const [editingId, setEditingId] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/transactions/${editingId}`,
          formData
        );

        setEditingId(null);
      } else {
        await axios.post(
          "http://localhost:5000/api/transactions",
          formData
        );
      }

      setFormData({
        type: "income",
        amount: "",
        category: "",
        date: "",
        description: ""
      });

      fetchTransactions();
      fetchSummary();

    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {

      await axios.delete(
        `http://localhost:5000/api/transactions/${id}`
      );

      fetchTransactions();
      fetchSummary();

    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (transaction) => {
    setEditingId(transaction._id);

    setFormData({
      type: transaction.type,
      amount: transaction.amount,
      category: transaction.category,
      date: transaction.date.split("T")[0],
      description: transaction.description || ""
    });
  };

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
          <p className={summary.balance >= 0 ? "positive" : "negative"}>
            ₹{summary.balance}
          </p>
        </div>

      </div>

      <form onSubmit={handleSubmit}>

        <select
          value={formData.type}
          onChange={(e) =>
            setFormData({
              ...formData,
              type: e.target.value
            })
          }
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) =>
            setFormData({
              ...formData,
              amount: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) =>
            setFormData({
              ...formData,
              category: e.target.value
            })
          }
        />

        <input
          type="date"
          value={formData.date}
          onChange={(e) =>
            setFormData({
              ...formData,
              date: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value
            })
          }
        />

        <button type="submit">
          {editingId ? "Update Transaction" : "Add Transaction"}
        </button>

      </form>

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
                <button onClick={() => handleEdit(transaction)}>
                  Edit
                </button>

                <button onClick={() => handleDelete(transaction._id)}>
                  Delete
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default App;