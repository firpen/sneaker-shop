package com.github.Luythen.Resource;

import org.eclipse.microprofile.jwt.JsonWebToken;

import com.github.Luythen.Dto.UserDto;
import com.github.Luythen.Dto.UserInfoDto;
import com.github.Luythen.Entity.User;
import com.github.Luythen.Enum.Role;
import com.github.Luythen.Service.UserService;

import io.smallrye.jwt.auth.principal.JWTParser;
import io.smallrye.jwt.build.Jwt;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.NewCookie;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;

@Path("/api/auth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@RequestScoped
public class AuthResource {

    @Inject
    UserService userService;

    @Inject
    JsonWebToken jwt;

    @Inject
    JWTParser parser;

    @POST
    @Path("/login")
    @PermitAll
    public Response login (@Valid UserDto userDto) {
        try {
            User user = userService.authenticate(userDto);
            String token = Jwt.issuer("http://localhost:5050/issuer")
                .upn(user.getUserId()).groups(user.getRole().getDesc()).expiresIn(7200).sign();

            NewCookie cookie = new NewCookie.Builder("token")
                    .value(token)
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .domain("localhost")
                    .maxAge(7200)
                    .build();

            return Response.ok("Logged In").cookie(cookie).build();
        } catch (Exception e) {
            return Response.status(401).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/me")
    @RolesAllowed({ "User", "Admin" })
    public Response me (@Context SecurityContext ctx) {
        if (ctx.getUserPrincipal().getName().equals(jwt.getName())) {
            try {
                User user = userService.getUserByID(jwt.getName());

                UserInfoDto userInfoDto = new UserInfoDto();

                userInfoDto.setEmail(user.getEmail());
                userInfoDto.setFirstName(user.getFirstName());
                userInfoDto.setLastName(user.getLastName());
                userInfoDto.setUserID(user.getUserId());
                userInfoDto.setRole(user.getRole());

                return Response.ok().entity(userInfoDto).build();
            } catch (Exception e) {
                return Response.status(404).entity("Problem").build();
            }
        }

        return Response.status(401).entity(!ctx.getUserPrincipal().getName().equals(jwt.getName())).build();
    }

    @POST
    @Path("/register")
    @PermitAll
    public Response register (@Valid User user) {
        try {
            user.setRole(Role.User);
            userService.createNewUser(user);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(401).entity(e.getMessage()).build();
        }
    }

    @POST
    @Path("/logout")
    @PermitAll
    public Response logout() {
        NewCookie cookie = new NewCookie.Builder("token")
                .value("")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .domain("localhost")
                .maxAge(0)
                .build();

        return Response.ok("Logged Out").cookie(cookie).build();
    }

}
