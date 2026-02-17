import { useEffect, useState } from "react";
import { getDashboard } from "../api/expenseApi";
import { Expense } from "../types/Expense";
interface Props {
  expenses: Expense[];
}
export default function DashboardSummary({ expenses }: Props) {
  const [data, setData] = useState({
    anomalyCount: 0,
    topVendors: [],
    monthlyCategoryTotals: [],
  });
  const [selectedMonth, setSelectedMonth] = useState<string>("ALL");
const months = Array.from(
  new Set(
    data.monthlyCategoryTotals.map(
      (m: any) => `${m.year}-${String(m.month).padStart(2, "0")}`
    )
  )
);
const filteredMonthlyTotals =
  selectedMonth === "ALL"
    ? data.monthlyCategoryTotals
    : data.monthlyCategoryTotals.filter(
        (m: any) =>
          `${m.year}-${String(m.month).padStart(2, "0")}` === selectedMonth
      );

 const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  useEffect(() => {
   
   getDashboard().then(res => {
    console.log("Dashboard API response:", res);
    setData(res);
  });
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-4">

     
    <div className="bg-white p-6 rounded-2xl shadow">
        <p className="text-gray-500">Total Expenses</p>
        <h2 className="text-2xl font-bold">&#8377;{total}</h2>
      </div>
      {/* Anomalies */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <p className="text-gray-500">Anomalies</p>
        <h2 className="text-2xl font-bold">{data.anomalyCount}</h2>
      </div>

      {/* Top Vendors */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <p className="text-gray-500 mb-2">Top 5 Vendors</p>
        {data.topVendors.map((v: any, i: number) => (
          <p key={i}>
            {v[0]} - &#8377;{v[1]}
          </p>
        ))}
      </div>

      {/* Monthly Category Totals */}
     <div className="bg-white p-6 rounded-2xl shadow">
  <div className="flex justify-between items-center mb-2">
  <p className="text-gray-500">Monthly Category Totals</p>

  <select
    className="border rounded px-2 py-1 text-sm"
    value={selectedMonth}
    onChange={(e) => setSelectedMonth(e.target.value)}
  >
    <option  value="ALL">All</option>
    {months.map((m: string) => (
      <option key={m} value={m}>
        {m}
      </option>
    ))}
  </select>
</div>
 <div className="max-h-32 overflow-y-auto pr-2 space-y-1">
{filteredMonthlyTotals.map((item: any, index: number) => (

    <p key={index} className="text-sm">
      {item.year}-{String(item.month).padStart(2, "0")} :{" "}
      {item.category} - &#8377;{item.total}
    </p>
  ))}
</div>
</div>

    </div>
  );
}
