package com.github.Luythen.Service;

import java.math.BigDecimal;

import com.github.Luythen.Entity.Cart;
import com.github.Luythen.Entity.CartItem;
import com.github.Luythen.Entity.Order;
import com.github.Luythen.Entity.OrderItem;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Transactional(Transactional.TxType.SUPPORTS)
@ApplicationScoped
public class OrderService {

    @Inject
    EntityManager em;

    private Cart getCartByUserId(int userId) {
        try {
            return em.createQuery("Select c FROM Cart c WHERE c.user.userId = :userId", Cart.class)
                    .setParameter("userId", userId)
                    .getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    @Transactional(Transactional.TxType.REQUIRED)
    public Order createOrderFromCart(int userId) throws Exception {

        Cart cart = getCartByUserId(userId);

        if (cart == null) {
            throw new Exception("No cart found for user");
        }

        if (cart.getCartItems().isEmpty()) {
            throw new Exception("Cart is empty");
        }

        Order order = new Order();
        order.setUser(cart.getUser());
        order.setStatus("PENDING");
        em.persist(order);

        BigDecimal total = BigDecimal.ZERO;

        for (CartItem cartItem : cart.getCartItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProductVariant(cartItem.getProductVariant());
            orderItem.setQuantity(cartItem.getQuantity());

            BigDecimal price = cartItem.getProductVariant().getPriceOverride() != null
                    ? cartItem.getProductVariant().getPriceOverride()
                    : cartItem.getProductVariant().getProduct().getPrice();

            orderItem.setPrice(price);
            total = total.add(price.multiply(BigDecimal.valueOf(cartItem.getQuantity())));

            em.persist(orderItem);
        }

        order.setTotalAmount(total);
        cart.getCartItems().clear();

        return order;

    }
}
