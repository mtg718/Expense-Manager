import { Expense } from "../types/Expense";

interface Props {
  expenses: Expense[];
}

export default function ExpenseTable({ expenses }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Recent Expenses - Anomalies Highlighted</h2>

      <table className="w-full text-left">
        <thead className="border-b">
          <tr className="text-gray-500">
            <th>Date</th>
            <th>Vendor</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>

      <tbody>
  {expenses.map((e, i) => (
    <tr
      key={i}
      className={`border-b hover:bg-gray-50 ${
        e.isAnomaly ? "bg-red-100 text-red-700 font-semibold" : ""
      }`}
    >
      <td>{e.date}</td>
      <td>{e.vendorName}</td>
      <td> &#8377;{e.amount}</td>
      <td>{e.description}</td>
      <td>{e.category}</td>

    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}
