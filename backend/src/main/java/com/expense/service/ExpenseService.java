package com.expense.service;

import com.expense.entity.Expense;
import com.expense.entity.VendorCategoryMap;
import com.expense.repository.ExpenseRepository;
import com.expense.repository.VendorCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepo;
    private final VendorCategoryRepository vendorRepo;

    public List<Expense> getAllExpenses() {
        return expenseRepo.findAll();
    }

    // ---------- SAVE EXPENSE ----------
    public Expense saveExpense(Expense expense) {

        String vendor = expense.getVendorName().trim();

        String category = vendorRepo
                .findByVendorNameIgnoreCase(vendor)
                .map(vendorMap -> vendorMap.getCategory())
                .orElse("Others");

        expense.setCategory(category);

        Double avg = expenseRepo.findAverageByCategory(category);

        if (avg != null && expense.getAmount() > 3 * avg) {
            expense.setIsAnomaly(true);
        } else {
            expense.setIsAnomaly(false);
        }

        return expenseRepo.save(expense);
    }

    // ---------- CSV UPLOAD ----------
    public void uploadCsv(MultipartFile file) throws Exception {

        BufferedReader br =
                new BufferedReader(new InputStreamReader(file.getInputStream()));

        br.lines().skip(1).forEach(line -> {
            String[] d = line.split(",");

            Expense e = new Expense();
            e.setDate(LocalDate.parse(d[0]));
            e.setAmount(Double.parseDouble(d[1]));
            e.setVendorName(d[2]);
            e.setDescription(d[3]);

            saveExpense(e); 
        });
    }

    // ---------- DASHBOARD ----------
    public Map<String, Object> getDashboardData() {

        Map<String, Object> res = new HashMap<>();

        List<Map<String, Object>> monthlyTotals = new ArrayList<>();

        for (Object[] row : expenseRepo.getMonthlyCategoryTotals()) {
            Map<String, Object> m = new HashMap<>();
            m.put("year", row[0]);
            m.put("month", row[1]);
            m.put("category", row[2]);
            m.put("total", row[3]);
            monthlyTotals.add(m);
        }

        res.put("monthlyCategoryTotals", monthlyTotals);
        res.put("topVendors", expenseRepo.topVendors());
        res.put("anomalies", expenseRepo.findByIsAnomalyTrue());
        res.put("anomalyCount", expenseRepo.countByIsAnomalyTrue());

        return res;
    }

    // ---------- VENDOR CATEGORY ----------
    public VendorCategoryMap saveVendorCategory(VendorCategoryMap map) {
        return vendorRepo.save(map);
    }
}
