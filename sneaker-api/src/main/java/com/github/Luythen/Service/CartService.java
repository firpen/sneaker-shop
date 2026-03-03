package com.github.Luythen.Service;

import java.util.List;

import com.github.Luythen.Entity.Cart;
import com.github.Luythen.Entity.CartItem;
import com.github.Luythen.Entity.ProductVariant;
import com.github.Luythen.Entity.User;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.transaction.Transactional;

@Transactional
@ApplicationScoped
public class CartService {

    @Inject
    EntityManager em;

    public Cart getOrCreateCart(String userId) {
        User user = em.find(User.class, userId);
        if (user == null)
            throw new IllegalArgumentException("User not found");
        try {
            return em.createQuery("SELECT c FROM Cart c WHERE c.user.userId = :userId", Cart.class)
                    .setParameter("userId", userId)
                    .getSingleResult();
        } catch (NoResultException e) {
            Cart cart = new Cart();
            cart.setUser(user);
            em.persist(cart);
            return cart;
        }
    }

    public List<CartItem> getCartItems(String userId) {
        Cart cart = getOrCreateCart(userId);
        return em.createQuery("SELECT ci FROM CartItem ci WHERE ci.cart.cartId = :cartId", CartItem.class)
                .setParameter("cartId", cart.getCartId())
                .getResultList();
    }

    @Transactional
    public void addItem(String userId, int variantId, int quantity) {
        Cart cart = getOrCreateCart(userId);
        ProductVariant variant = em.find(ProductVariant.class, (long) variantId);
        if (variant == null)
            throw new IllegalArgumentException("Variant not found");
        List<CartItem> items = getCartItems(userId);
        for (CartItem item : items) {
            if (item.getProductVariant() != null && item.getProductVariant().getVariantId() == variantId) {
                item.setQuantity(item.getQuantity() + quantity);
                em.merge(item);
                return;
            }
        }
        CartItem newItem = new CartItem();
        newItem.setCart(cart);
        newItem.setProductVariant(variant);
        newItem.setQuantity(quantity);
        em.persist(newItem);
    }

    @Transactional
    public void updateItemQuantity(String userId, int cartItemId, int quantity) {
        CartItem item = em.find(CartItem.class, cartItemId);
        if (item == null)
            throw new IllegalArgumentException("CartItem not found");
        item.setQuantity(quantity);
        em.merge(item);
    }

    @Transactional
    public void removeItem(String userId, int cartItemId) {
        CartItem item = em.find(CartItem.class, cartItemId);
        if (item != null) {
            em.remove(item);
        }
    }

    @Transactional
    public void clearCart(String userId) {
        Cart cart = getOrCreateCart(userId);
        List<CartItem> items = getCartItems(userId);
        for (CartItem item : items) {
            em.remove(item);
        }
    }
}
