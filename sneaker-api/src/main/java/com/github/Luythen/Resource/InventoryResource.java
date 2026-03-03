package com.github.Luythen.Resource;

import com.github.Luythen.Entity.Inventory;
import com.github.Luythen.Service.InventoryService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/inventory")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class InventoryResource {

    @Inject
    InventoryService inventoryService;

    @GET
    public List<Inventory> getAllInventories() {
        return inventoryService.getAllInventories();
    }

    @GET
    @Path("/{id}")
    public Response getInventoryById(@PathParam("id") int id) {
        Inventory inventory = inventoryService.getInventoryById(id);
        if (inventory == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(inventory).build();
    }

    @POST
    public Response createInventory(Inventory inventory) {
        if (inventory.getProductVariant() == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("ProductVariant is required").build();
        }
        inventoryService.createInventory(
                inventory.getProductVariant(),
                inventory.getStockQty(),
                inventory.getReservedQty()
        );
        return Response.status(Response.Status.CREATED).build();
    }

    @PUT
    @Path("/{id}")
    public Response updateInventory(@PathParam("id") int id, Inventory inventory) {
        inventoryService.updateInventory(id, inventory.getStockQty(), inventory.getReservedQty());
        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    public Response deleteInventory(@PathParam("id") int id) {
        inventoryService.deleteInventory(id);
        return Response.noContent().build();
    }
}