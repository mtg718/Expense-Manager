export interface Expense {
  id?: number;
  date: string;
  amount: number;
  vendorName: string;
  description: string;
  category?: string;
  isAnomaly?: boolean;
}
