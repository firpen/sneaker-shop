package com.github.Luythen.Resource;

import java.util.List;

import com.github.Luythen.Entity.Order;
import com.github.Luythen.Service.OrderService;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
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
}
