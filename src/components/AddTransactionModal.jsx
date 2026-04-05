import { useState, useEffect } from "react";
import { useStore } from "../store/useStore";

export default function AddTransactionModal({ onClose, editData }) {
  const { addTransaction, updateTransaction } = useStore();

  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "expense",
  });

  // if editing → preload data
  useEffect(() => {
    if (editData) {
      setForm(editData);
    }
  }, [editData]);

  const handleSubmit = () => {
    if (editData) {
      // update existing
      updateTransaction(form);
    } else {
      // add new
      const newTxn = {
        id: Date.now(),
        date: new Date().toISOString().slice(0, 10),
        amount: Number(form.amount),
        category: form.category,
        type: form.type,
      };

      addTransaction(newTxn);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl w-80">
        <h2 className="text-lg font-semibold mb-4">
          {editData ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <input
          placeholder="Amount"
          value={form.amount}
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
        />

        <input
          placeholder="Category"
          value={form.category}
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <select
          value={form.type}
          className="border p-2 w-full mb-4"
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editData ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}