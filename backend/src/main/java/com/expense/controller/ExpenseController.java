package com.expense.controller;

import com.expense.entity.Expense;
import com.expense.entity.VendorCategoryMap;
import com.expense.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {

    private final ExpenseService service;

    @GetMapping
    public List<Expense> getAllExpenses() {
        return service.getAllExpenses();
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return service.saveExpense(expense);
    }

    @PostMapping("/upload")
    public void upload(@RequestParam MultipartFile file) throws Exception {
        service.uploadCsv(file);
    }

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {
        return service.getDashboardData();
    }

    @PostMapping("/vendor-category")
    public VendorCategoryMap addMapping(@RequestBody VendorCategoryMap map) {
        return service.saveVendorCategory(map);
    }
}
