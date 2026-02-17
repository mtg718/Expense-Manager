
package com.expense.repository;

import com.expense.entity.Expense;
import org.springframework.data.jpa.repository.*;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query("SELECT AVG(e.amount) FROM Expense e WHERE e.category = :category")
    Double findAverageByCategory(String category);

    List<Expense> findByIsAnomalyTrue();

    long countByIsAnomalyTrue();
    // monthly totals per category
    @Query("""
    SELECT 
      YEAR(e.date), 
      MONTH(e.date), 
      e.category, 
      SUM(e.amount)
    FROM Expense e
    GROUP BY YEAR(e.date), MONTH(e.date), e.category
    ORDER BY YEAR(e.date), MONTH(e.date)
""")
    List<Object[]> getMonthlyCategoryTotals();

    // top 5 vendors
    @Query(value = "SELECT vendor_name, SUM(amount) total FROM expense GROUP BY vendor_name ORDER BY total DESC LIMIT 5", nativeQuery = true)
    List<Object[]> topVendors();
}
