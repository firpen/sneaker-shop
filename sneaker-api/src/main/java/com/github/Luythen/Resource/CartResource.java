package com.github.Luythen.Resource;

import com.github.Luythen.Entity.Cart;
import com.github.Luythen.Entity.CartItem;
import com.github.Luythen.Service.CartService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/cart")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CartResource {

	@Inject
	CartService cartService;

	@GET
	@Path("/{userId}")
	public Response getCart(@PathParam("userId") String userId) {
		try {
			Cart cart = cartService.getOrCreateCart(userId);
			List<CartItem> items = cartService.getCartItems(userId);
			return Response.ok(items).build();
		} catch (Exception e) {
			return Response.status(Response.Status.NOT_FOUND).entity(e.getMessage()).build();
		}
	}

	@POST
	@Path("/{userId}/add")
	public Response addItem(@PathParam("userId") String userId, @QueryParam("variantId") int variantId, @QueryParam("quantity") int quantity) {
		try {
			cartService.addItem(userId, variantId, quantity);
			return Response.ok().build();
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
		}
	}

	@PUT
	@Path("/{userId}/update/{cartItemId}")
	public Response updateItem(@PathParam("userId") String userId, @PathParam("cartItemId") int cartItemId, @QueryParam("quantity") int quantity) {
		try {
			cartService.updateItemQuantity(userId, cartItemId, quantity);
			return Response.ok().build();
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
		}
	}

	@DELETE
	@Path("/{userId}/remove/{cartItemId}")
	public Response removeItem(@PathParam("userId") String userId, @PathParam("cartItemId") int cartItemId) {
		try {
			cartService.removeItem(userId, cartItemId);
			return Response.noContent().build();
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
		}
	}

	@DELETE
	@Path("/{userId}/clear")
	public Response clearCart(@PathParam("userId") String userId) {
		try {
			cartService.clearCart(userId);
			return Response.noContent().build();
		} catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
		}
	}
}
