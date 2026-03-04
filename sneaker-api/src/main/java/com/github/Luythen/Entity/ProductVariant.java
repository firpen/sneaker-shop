package com.github.Luythen.Entity;

import java.math.BigDecimal;
import java.util.List;

import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name = "t_product_variant")
public class ProductVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonbTransient
    private Long variantId;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "productId", nullable = false)
    @JsonbTransient
    private Product product;

    @OneToOne(mappedBy = "productVariant")
    private Inventory inventory;

    @OneToMany(mappedBy = "productVariant")
    @JsonbTransient
    private List<CartItem> cartItems;

    @OneToMany(mappedBy = "productVariant")
    @JsonbTransient
    private List<OrderItem> orderItems;

    @Column(name = "size", nullable = false)
    @NotEmpty
    private String size;

    @Column(name = "color", nullable = false)
    @NotEmpty
    private String color;

    @Column(name = "priceOverride")
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal priceOverride;

    // Konstruktor
    public ProductVariant() {
    }

    // Getters & Setters
    @JsonbTransient
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

    public BigDecimal getPriceOverride() {
        return priceOverride;
    }

    public void setPriceOverride(BigDecimal priceOverride) {
        this.priceOverride = priceOverride;
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }
}