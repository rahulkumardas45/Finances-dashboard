import { useState } from "react";
import { useStore } from "../store/useStore";
import TransactionTable from "../components/TransactionTable";
import AddTransactionModal from "../components/AddTransactionModal";

export default function Transactions() {
  const { transactions, role } = useStore();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");
  const [sortBy, setSortBy] = useState("");

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // filter logic
  let filteredTransactions = transactions.filter((item) => {
    const matchSearch = item.category
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category === "all" || item.category === category;

    const matchType = type === "all" || item.type === type;

    return matchSearch && matchCategory && matchType;
  });

  // sorting logic
  if (sortBy === "amount") {
    filteredTransactions.sort((a, b) => b.amount - a.amount);
  }

  if (sortBy === "date") {
    filteredTransactions.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }

  const handleEdit = (item) => {
    setEditData(item);
    setOpen(true);
  };

  return (
    <div>

      {/* filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border mb-4 flex flex-col sm:flex-row sm:flex-wrap gap-3">

        {/* search */}
        <input
          placeholder="Search..."
          className="border p-2 rounded w-full sm:w-auto"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* category */}
        <select
          className="border p-2 rounded w-full sm:w-auto"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Shopping">Shopping</option>
          <option value="Transport">Transport</option>
        </select>

        {/* type */}
        <select
          className="border p-2 rounded w-full sm:w-auto"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* sort */}
        <select
          className="border p-2 rounded w-full sm:w-auto"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="amount">Amount</option>
          <option value="date">Date</option>
        </select>

      </div>

      {/* add button */}
      {role === "admin" && (
        <button
          onClick={() => {
            setEditData(null);
            setOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
        >
          Add Transaction
        </button>
      )}

      {/* table */}
      <div className="bg-white rounded-2xl shadow-sm border">
        <div className="overflow-x-auto">
          <TransactionTable
            data={filteredTransactions}
            onEdit={handleEdit}
            role={role}
          />
        </div>
      </div>
      {/* modal */}
      {open && (
        <AddTransactionModal
          onClose={() => setOpen(false)}
          editData={editData}
        />
      )}
    </div>
  );
}