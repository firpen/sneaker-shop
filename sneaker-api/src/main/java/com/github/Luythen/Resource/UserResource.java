package com.github.Luythen.Resource;

import java.util.List;

import com.github.Luythen.Entity.User;
import com.github.Luythen.Service.UserService;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;

@Path("/api/users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {

    @Inject
    UserService userService;

    @GET
    @RolesAllowed("Admin")
    public Response getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            return Response.ok(users).build();
        } catch (Exception e) {
            return Response.status(500).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/{id}")
    @RolesAllowed("Admin")
    public Response getUserById(@PathParam("id") String id) {
        try {
            User user = userService.getUserByID(id);
            if (user == null) {
                return Response.status(404).entity("User not found").build();
            }
            return Response.ok(user).build();
        } catch (Exception e) {
            return Response.status(500).entity(e.getMessage()).build();
        }
    }

    @DELETE
    @Path("{/id}")
    @RolesAllowed({ "User", "Admin" })
    public Response deleteUser(@PathParam("id") String id, @Context SecurityContext ctx) {
        try {
            boolean isAdmin = ctx.isUserInRole("Admin");
            boolean isOwner = ctx.getUserPrincipal().getName().equals(id);

            if (!isAdmin && !isOwner) {
                return Response.status(403).entity("Access denied").build();
            }

            userService.deleteUser(id);
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.status(500).entity(e.getMessage()).build();
        }
    }
}
