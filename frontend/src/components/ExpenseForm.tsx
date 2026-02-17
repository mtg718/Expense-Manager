import { useState } from "react";

export default function ExpenseForm() {
  const [form, setForm] = useState({
    date: "",
    amount: "",
    vendor: "",
    description: "",
  });

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(form); // later call backend API
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow p-6 grid gap-4 md:grid-cols-4"
    >
      <input
        type="date"
        name="date"
        onChange={handleChange}
        className="border p-2 rounded-lg"
      />

      <input
        type="number"
        placeholder="Amount"
        name="amount"
        onChange={handleChange}
        className="border p-2 rounded-lg"
      />

      <input
        type="text"
        placeholder="Vendor"
        name="vendor"
        onChange={handleChange}
        className="border p-2 rounded-lg"
      />

      <input
        type="text"
        placeholder="Description"
        name="description"
        onChange={handleChange}
        className="border p-2 rounded-lg"
      />

      <button className="md:col-span-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
        Add Expense
      </button>
    </form>
  );
}
