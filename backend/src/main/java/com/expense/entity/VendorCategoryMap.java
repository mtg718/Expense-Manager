
package com.expense.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class VendorCategoryMap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String vendorName;

    private String category;
}
