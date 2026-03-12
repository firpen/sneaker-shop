package com.github.Luythen.Resource;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.eclipse.microprofile.config.inject.ConfigProperty;

import com.github.Luythen.Dto.CreateCheckoutSessionDto;
import com.github.Luythen.Dto.StripeSessionDto;
import com.github.Luythen.Service.StripeService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import jakarta.annotation.security.PermitAll;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;

@Path("/api/stripe")
@ApplicationScoped
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class StripeResource {

    @Inject
    StripeService stripeService;

    @ConfigProperty(name = "sneaker.stripe.secret-key")
    Optional<String> stripeSecretKey;

    private boolean stripeConfigured() {
        return stripeSecretKey.isPresent() && !stripeSecretKey.get().isBlank();
    }

    @POST
    @Path("/create-checkout-session")
    @PermitAll
    public Response createCheckoutSession (@Valid CreateCheckoutSessionDto request, @Context SecurityContext ctx) {
        if (!stripeConfigured()) {
            return Response.status(Response.Status.SERVICE_UNAVAILABLE).entity("Stripe is not configured").build();
        }

        try {
            Stripe.apiKey = stripeSecretKey.orElseThrow();
            SessionCreateParams params = stripeService.createSessionCheckoutParams(request.getItems());

            Session session = Session.create(params);
            Map<String, String> map = new HashMap<>();
            map.put("clientSecret", session.getClientSecret());
            return Response.ok(map).build();
        } catch (StripeException e) {
            return Response.status(404).entity(e.getMessage()).build();
        }
    }
    
    @POST
    @Path("/session-status")
    @PermitAll
    public Response sessionStatus (@Valid StripeSessionDto sessionDto) {
        if (!stripeConfigured()) {
            return Response.status(Response.Status.SERVICE_UNAVAILABLE).entity("Stripe is not configured").build();
        }

        try {
            Stripe.apiKey = stripeSecretKey.orElseThrow();
            Session session = Session.retrieve(sessionDto.getSessionID());

            Map<String, String> map = new HashMap<>();
            map.put("status", session.getStatus());
            map.put("customer_email", session.getCustomerEmail());

            return Response.ok(map).build();
        } catch (Exception e) {
           return Response.status(403).entity(e.getMessage()).build();
        }
    }
}
