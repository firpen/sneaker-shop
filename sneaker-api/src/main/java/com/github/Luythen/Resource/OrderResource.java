package com.github.Luythen.Resource;

import java.util.List;

import com.github.Luythen.Entity.Order;
import com.github.Luythen.Service.OrderService;

import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;

@Path("/api/orders")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@RequestScoped
public class OrderResource {

    @Inject
    OrderService orderService;

    @GET
    @RolesAllowed("User")
    public Response getMyOrders(@Context SecurityContext ctx) {
        try {
            String userId = ctx.getUserPrincipal().getName();
            List<Order> orders = orderService.getOrdersByUserId(userId);
            if (orders == null) {
                return Response.status(404).entity("No orders found").build();
            }
            return Response.ok(orders).build();
        } catch (Exception e) {
            return Response.status(500).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/{id}")
    @RolesAllowed({ "User", "Admin" })
    public Response getOrderById(@PathParam("id") int id, @Context SecurityContext ctx) {
        try {
            Order order = orderService.getOrderById(id);
            if (order == null) {
                return Response.status(404).entity("Order not found").build();
            }

            boolean isAdmin = ctx.isUserInRole("Admin");
            boolean isOwner = order.getUser().getUserId().equals(ctx.getUserPrincipal().getName());

            if (!isAdmin && !isOwner) {
                return Response.status(403).entity("Access denied").build();
            }

            return Response.ok(order).build();
        } catch (Exception e) {
            return Response.status(500).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/admin/all")
    @RolesAllowed("Admin")
    public Response getAllOrders() {
        try {
            List<Order> orders = orderService.getAllOrders();
            if (orders == null) {
                return Response.status(404).entity("No orders found").build();
            }
            return Response.ok(orders).build();
        } catch (Exception e) {
            return Response.status(500).entity(e.getMessage()).build();
        }
    }

    @POST
    @RolesAllowed("User")
    public Response createOrder(@Context SecurityContext ctx) {
        try {
            String userId = ctx.getUserPrincipal().getName();
            Order order = orderService.createOrderFromCart(userId);
            return Response.status(Response.Status.CREATED).entity(order).build();
        }   catch (Exception e) {
            return Response.status(500).entity(e.getMessage()).build();
        }
    }

    @PUT
    @Path("/{id}/status")
    @RolesAllowed("Admin")
    public Response updateStatus(@PathParam("id") int id, String status) {
        try {
            Order order = orderService.updateOrderStatus(id, status);
            if (order == null) {
                return Response.status(404).entity("Order not found").build();
            }
            return Response.ok().build();
        }   catch (Exception e) {
            return Response.status(500).entity(e.getMessage()).build();
        }
    }

    @PUT
    @Path("/{id}/cancel")
    @RolesAllowed("Admin")
    public Response cancelOrder(@PathParam("id") int id) {
        try {
            boolean success = orderService.cancelOrder(id);
            if (!success) {
                return Response.status(404).entity("Order not found").build();
            }
            return Response.ok("Order cancelled").build();
        }   catch (Exception e) {
            return Response.status(500).entity(e.getMessage()).build();
        }
    }
}
