import { useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("Income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const addTransaction = () => {
    if (!category || !amount) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      type,
      category,
      amount: Number(amount),
    };

    setTransactions([...transactions, newTransaction]);
    setCategory("");
    setAmount("");
  };

  const totalIncome = transactions
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpense;

  const categorySummary = {};

  transactions.forEach((item) => {
    categorySummary[item.category] =
      (categorySummary[item.category] || 0) + item.amount;
  });

  return (
    <div className="container">
      <h1>💰 Daily Expense Analytics Dashboard</h1>

      <div className="form-box">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <input
          type="text"
          placeholder="Enter Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={addTransaction}>
          Add Transaction
        </button>
      </div>

      <div className="cards">
        <div className="card">
          <h3>Total Income</h3>
          <p>₹{totalIncome}</p>
        </div>

        <div className="card">
          <h3>Total Expense</h3>
          <p>₹{totalExpense}</p>
        </div>

        <div className="card">
          <h3>Balance</h3>
          <p>₹{balance}</p>
        </div>
      </div>

      <div className="section">
        <h2>📋 Transactions</h2>

        {transactions.length === 0 ? (
          <p>No Transactions Added Yet</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((item, index) => (
                <tr key={index}>
                  <td>{item.type}</td>
                  <td>{item.category}</td>
                  <td>₹{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="section">
        <h2>📊 Category Summary</h2>

        {Object.keys(categorySummary).length === 0 ? (
          <p>No Data Available</p>
        ) : (
          Object.keys(categorySummary).map((category) => (
            <div
              className="summary-item"
              key={category}
            >
              <span>{category}</span>
              <span>₹{categorySummary[category]}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
