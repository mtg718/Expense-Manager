
package com.expense.service;

import com.expense.entity.*;
import com.expense.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepo;
    private final VendorCategoryRepository vendorRepo;

    public Expense saveExpense(Expense expense) {

        String vendor = expense.getVendorName().trim();

        String category = vendorRepo
                .findByVendorNameIgnoreCase(vendor)
                .map(VendorCategoryMap::getCategory)
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

}
