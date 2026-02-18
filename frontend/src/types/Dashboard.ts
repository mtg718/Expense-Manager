import { Expense } from "./Expense";

export interface DashboardData {
  anomalyCount: number;
  anomalies: Expense[];
  topVendors: [string, number][];
  monthlyCategoryTotals: {
    year: number;
    month: number;
    category: string;
    total: number;
  }[];
}
