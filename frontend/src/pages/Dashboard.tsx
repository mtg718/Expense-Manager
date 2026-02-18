import { useEffect, useState } from "react";
import { getExpenses } from "../api/expenseApi";
import AddExpense from "../components/AddExpense";
import ExpenseTable from "../components/ExpenseTable";
import { Expense } from "../types/Expense";
import CSVUpload from "../components/CSVUpload";
import DashboardSummary from "../components/DashboardSummary";

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const load = async () => {
    const data = await getExpenses();
    setExpenses(data);
  };
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshAll = async () => {
    await load(); // reload expenses
    setRefreshKey((prev) => prev + 1); // trigger dashboard refresh
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <DashboardSummary expenses={expenses} refreshKey={refreshKey} />

        <CSVUpload refresh={refreshAll} />
        <AddExpense refresh={refreshAll} />

        <ExpenseTable expenses={expenses} />
      </div>
    </div>
  );
}
