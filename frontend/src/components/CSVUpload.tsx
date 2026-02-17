import { uploadCSV } from "../api/expenseApi";
import { toast } from "react-toastify";

interface Props {
  refresh: () => void;
}

export default function CSVUpload({ refresh }: Props) {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      toast.error("Please upload a CSV file");
      return;
    }

    try {
      await uploadCSV(file);
      toast.success("CSV uploaded successfully ✅");
      refresh();
    } catch {
      toast.error("CSV upload failed ❌");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <label className="block font-medium mb-2">Upload Expenses (CSV)</label>
      <input
        type="file"
        accept=".csv"
        onChange={handleUpload}
        className="border p-2 rounded-lg w-full"
      />
    </div>
  );
}
