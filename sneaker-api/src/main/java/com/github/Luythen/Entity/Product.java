package com.github.Luythen.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
/* import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne; */
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name = "t_product")
public class Product {

    @Id
    @GeneratedValue
    private Long productId;

    // Ta bort kommentar när "Category" entitet finns
    /*
     * @ManyToOne
     * 
     * @JoinColumn(name = "categoryId", referencedColumnName = "categoryId")
     * private Category category;
     */

    @Column(length = 200, name = "product_name")
    @NotEmpty
    private String name;

    @Column(length = 500, name = "description")
    @NotEmpty
    private String description;

    @Column(name = "price")
    @DecimalMin(value = "0.0", inclusive = false)
    private double price;

    @Column(name = "isActive")
    private boolean isActive;

    public Product() {
    }
}