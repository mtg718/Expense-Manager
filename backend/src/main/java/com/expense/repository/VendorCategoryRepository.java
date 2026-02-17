
package com.expense.repository;

import com.expense.entity.VendorCategoryMap;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface VendorCategoryRepository extends JpaRepository<VendorCategoryMap, Long> {
    Optional<VendorCategoryMap> findByVendorNameIgnoreCase(String vendorName);

}
