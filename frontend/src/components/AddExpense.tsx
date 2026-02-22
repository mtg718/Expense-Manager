import { useState } from "react";
import { addExpense } from "../api/expenseApi";
import { toast } from "react-toastify";

interface Props {
  refresh: () => void;
}

export default function AddExpense({ refresh }: Props) {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!date || !amount || !vendorName || !description) {
      toast.error("Please fill all details");
      return;
    }

    try {
      setLoading(true);

      await addExpense({
        date,
        amount: Number(amount),
        vendorName,
        description,
      });

      toast.success("Expense added successfully");

      setDate("");
      setAmount("");
      setVendorName("");
      setDescription("");

      refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Add Expense
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        />

        <input
          placeholder="Vendor Name"
          value={vendorName}
          onChange={(e) => setVendorName(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
        />

        <button
          onClick={submit}
          disabled={loading}
          className={`rounded-xl px-6 py-2 text-white font-medium transition-all duration-200 shadow-md
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:scale-95"
            }
          `}
        >
          {loading ? "Adding..." : "Add"}
        </button>

      </div>
    </div>
  );
}
