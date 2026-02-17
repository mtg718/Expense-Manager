import { Expense } from "../types/Expense";

const BASE_URL = "http://localhost:8080/api/expenses";

export const getExpenses = async (): Promise<Expense[]> => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const addExpense = async (expense: Expense) => {
  await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });
};

export const uploadCSV = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  await fetch("http://localhost:8080/api/expenses/upload", {
    method: "POST",
    body: formData,
  });
};
export const getDashboard = async () => {
  const res = await fetch(`${BASE_URL}/dashboard`);
  return res.json();
};
