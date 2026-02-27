package com.github.Luythen.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name = "t_product_variant")
public class ProductVariant {

    @Id
    @GeneratedValue
    private Long variantId;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "productId", nullable = false)
    private Product product;

    @Column(name = "size", nullable = false)
    @NotEmpty
    private String size;

    @Column(name = "color", nullable = false)
    @NotEmpty
    private String color;

    @Column(name = "priceOverride")
    @DecimalMin(value = "0.0", inclusive = false)
    private double priceOverride;

    // Konstruktor
    public ProductVariant() {
    }
}