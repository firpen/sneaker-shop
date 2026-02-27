package com.github.Luythen.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "CART_ITEM")
public class CartItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cartItemId")
	private int cartItemId;

	@ManyToOne
	@JoinColumn(name = "cartId", nullable = false)
	private Cart cart;

	@Column(name = "variantId", nullable = false)
	private int variantId;

	@Column(name = "quantity", nullable = false)
	private int quantity;

	public int getCartItemId() {
		return cartItemId;
	}

	public void setCartItemId(int cartItemId) {
		this.cartItemId = cartItemId;
	}

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}

	public int getVariantId() {
		return variantId;
	}

	public void setVariantId(int variantId) {
		this.variantId = variantId;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}
