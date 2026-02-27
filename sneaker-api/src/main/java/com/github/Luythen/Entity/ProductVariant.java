package com.github.Luythen.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    // Getters & Setters
    public Long getVariantId() {
        return variantId;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public double getPriceOverride() {
        return priceOverride;
    }

    public void setPriceOverride(double priceOverride) {
        this.priceOverride = priceOverride;
    }
}