import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {

    fetchTransactions();

  }, []);

  const fetchTransactions = async () => {
    try {

      const response = await axios.get(
        "http://localhost:5000/api/transactions"
      );

      setTransactions(response.data.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="app">

      <h1>Income & Expense Ledger</h1>

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