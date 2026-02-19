
package com.expense.controller;

import com.expense.entity.Expense;
import com.expense.entity.VendorCategoryMap;
import com.expense.repository.ExpenseRepository;
import com.expense.repository.VendorCategoryRepository;
import com.expense.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {

    private final ExpenseService service;
    private final ExpenseRepository repo;
    private final VendorCategoryRepository vendorRepo;
    @GetMapping
    public List<Expense> getAllExpenses() {
        return repo.findAll();
    }
    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return service.saveExpense(expense);
    }

    @PostMapping("/upload")
    public void upload(@RequestParam MultipartFile file) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()));
        br.lines().skip(1).forEach(line -> {
            String[] d = line.split(",");
            Expense e = new Expense();
            e.setDate(LocalDate.parse(d[0]));
            e.setAmount(Double.parseDouble(d[1]));
            e.setVendorName(d[2]);
            e.setDescription(d[3]);
            service.saveExpense(e);
        });
    }

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {

        Map<String, Object> res = new HashMap<>();

        //  Monthly totals
        List<Map<String, Object>> monthlyTotals = new ArrayList<>();

        for (Object[] row : repo.getMonthlyCategoryTotals()) {
            Map<String, Object> m = new HashMap<>();
            m.put("year", row[0]);
            m.put("month", row[1]);
            m.put("category", row[2]);
            m.put("total", row[3]);
            monthlyTotals.add(m);
        }

        res.put("monthlyCategoryTotals", monthlyTotals);
        res.put("topVendors", repo.topVendors());
        res.put("anomalies", repo.findByIsAnomalyTrue());
        res.put("anomalyCount", repo.countByIsAnomalyTrue());

        return res;
    }
    @PostMapping("/vendor-category")
    public VendorCategoryMap addMapping(@RequestBody VendorCategoryMap map) {
        return vendorRepo.save(map);
    }

}
