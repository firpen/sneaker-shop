package com.github.Luythen.Dto;

import java.math.BigDecimal;

public class NewProductDto {

    private String category;
    private String name;
    private String description;
    private boolean isActive;
    private BigDecimal price;
    private String img;

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    private ProductVariantDto[] productVariant;

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }

    public ProductVariantDto[] getProductVariant() {
        return productVariant;
    }

    public void setProductVariant(ProductVariantDto[] productVariant) {
        this.productVariant = productVariant;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}