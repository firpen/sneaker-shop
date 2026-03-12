package com.github.Luythen.Dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

public class CreateCheckoutSessionDto {

    @Valid
    @NotEmpty
    private List<CheckoutItemDto> items;

    public List<CheckoutItemDto> getItems() {
        return items;
    }

    public void setItems(List<CheckoutItemDto> items) {
        this.items = items;
    }
}