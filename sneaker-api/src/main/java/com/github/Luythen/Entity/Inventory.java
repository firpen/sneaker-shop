package com.github.Luythen.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "INVENTORY")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inventoryId")
    private int inventoryId;

    @Column(name = "reservedQty", nullable = false)
    private int reservedQty;

    @Column(name = "stockQty", nullable = false)
    private int stockQty;

    @OneToOne
    @JoinColumn(name = "variantId", nullable = false)
    private ProductVariant productVariant;

    public int getInventoryId() {
        return inventoryId;
    }

    public void setInventoryId(int inventoryId) {
        this.inventoryId = inventoryId;
    }

    public int getReservedQty() {
        return reservedQty;
    }

    public void setReservedQty(int reservedQty) {
        this.reservedQty = reservedQty;
    }

    public int getStockQty() {
        return stockQty;
    }

    public void setStockQty(int stockQty) {
        this.stockQty = stockQty;
    }
    
    public ProductVariant getProductVariant() {
        return productVariant;
    }
    
    public void setProductVariant(ProductVariant productVariant) {
        this.productVariant = productVariant;
    }
}
