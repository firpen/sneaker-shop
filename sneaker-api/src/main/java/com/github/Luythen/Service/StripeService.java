package com.github.Luythen.Service;

import java.util.ArrayList;
import java.util.List;
import java.math.BigDecimal;
import java.math.RoundingMode;

import com.github.Luythen.Dto.CheckoutItemDto;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.LineItem;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class StripeService {

    private List<LineItem> createLineItems (List<CheckoutItemDto> items) {
        List<LineItem> lineItems = new ArrayList<>();

        items.forEach((item) -> {
            long unitAmount = item.getPrice()
                    .multiply(BigDecimal.valueOf(100))
                    .setScale(0, RoundingMode.HALF_UP)
                    .longValueExact();

            LineItem lineItem = LineItem.builder()
                .setQuantity(Long.valueOf(item.getQuantity()))
                .setPriceData(LineItem.PriceData.builder()
                    .setCurrency("usd")
                    .setUnitAmount(unitAmount)
                    .setProductData(LineItem.PriceData.ProductData.builder()
                        .setName(item.getName())
                    .build()
                ).build()
            ).build();

            lineItems.add(lineItem);
        });

        return lineItems;
    }

    public SessionCreateParams createSessionCheckoutParams (List<CheckoutItemDto> items) {
        List<LineItem> lineItems = createLineItems(items);
        
        SessionCreateParams params = SessionCreateParams.builder()
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setUiMode(SessionCreateParams.UiMode.EMBEDDED)
            .setReturnUrl("http://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}")
            .addAllLineItem(lineItems).build();

        return params;
    }

}
