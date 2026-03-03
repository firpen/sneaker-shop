package com.github.Luythen.Service;

import java.util.ArrayList;
import java.util.List;

import com.github.Luythen.Entity.CartItem;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.LineItem;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class StripeService {
    
    @Inject
    CartService cartService;

    private List<LineItem> createLineItems (String userID) {
        List<LineItem> lineItems = new ArrayList<>();
        List<CartItem> cardItems = cartService.getCartItems(userID);
        
        cardItems.forEach((item) -> {
            LineItem lineItem = LineItem.builder()
                .setQuantity(Long.valueOf(item.getQuantity()))
                .setPriceData(LineItem.PriceData.builder()
                    .setCurrency("euro")
                    .setProductData(LineItem.PriceData.ProductData.builder()
                        .setName(item.getProductVariant().getProduct().getName())
                    .build()
                ).build()
            ).build();

            lineItems.add(lineItem);
        });

        return lineItems;
    }

    public SessionCreateParams createSessionCheckoutParams (String userID) {
        List<LineItem> lineItems = createLineItems(userID);
        
        SessionCreateParams params = SessionCreateParams.builder()
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setUiMode(SessionCreateParams.UiMode.CUSTOM)
            .setReturnUrl("http://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}")
            .addAllLineItem(lineItems).build();

        return params;
    }

}
