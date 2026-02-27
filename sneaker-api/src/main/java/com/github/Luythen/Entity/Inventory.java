package com.github.Luythen.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "INVENTORY")
public class Inventory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inventoryId")
    private int inventoryId;
    
    @Column(name = "variantId", nullable = false)
    private int variantId;
    
    @Column(name = "reservedQty", nullable = false)
    private int reservedQty;
    
    @Column(name = "stockQty", nullable = false)
    private int stockQty;
    
    
    public int getInventoryId() {
        return inventoryId;
    }
    
    public void setInventoryId(int inventoryId) {
        this.inventoryId = inventoryId;
    }
    
    public int getVariantId() {
        return variantId;
    }
    
    public void setVariantId(int variantId) {
        this.variantId = variantId;
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
}
