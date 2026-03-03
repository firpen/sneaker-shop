package com.github.Luythen.Service;

import com.github.Luythen.Entity.Inventory;
import com.github.Luythen.Entity.ProductVariant;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.util.List;

@ApplicationScoped
@Transactional
public class InventoryService {

    @Inject
    EntityManager em;

    public Inventory getInventoryById(int inventoryId) {
        return em.find(Inventory.class, inventoryId);
    }

    public Inventory getInventoryByVariantId(int variantId) {
        return em.createQuery("SELECT i FROM Inventory i WHERE i.productVariant.variantId = :variantId", Inventory.class)
                .setParameter("variantId", variantId)
                .getSingleResult();
    }

    public List<Inventory> getAllInventories() {
        return em.createQuery("SELECT i FROM Inventory i", Inventory.class).getResultList();
    }

    @Transactional
    public void createInventory(ProductVariant variant, int stockQty, int reservedQty) {
        Inventory inventory = new Inventory();
        inventory.setProductVariant(variant);
        inventory.setStockQty(stockQty);
        inventory.setReservedQty(reservedQty);
        em.persist(inventory);
    }

    @Transactional
    public void updateInventory(int inventoryId, int stockQty, int reservedQty) {
        Inventory inventory = em.find(Inventory.class, inventoryId);
        if (inventory != null) {
            inventory.setStockQty(stockQty);
            inventory.setReservedQty(reservedQty);
            em.merge(inventory);
        }
    }

    @Transactional
    public void deleteInventory(int inventoryId) {
        Inventory inventory = em.find(Inventory.class, inventoryId);
        if (inventory != null) {
            em.remove(inventory);
        }
    }
}
