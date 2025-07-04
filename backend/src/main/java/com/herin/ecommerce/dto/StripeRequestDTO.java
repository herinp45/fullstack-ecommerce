package com.herin.ecommerce.dto;

import java.util.List;

public class StripeRequestDTO {
    private List<String> productNames;
    private List<Long> pricesInCents;
    private List<Long> quantities;
    private String successUrl;
    private String cancelUrl;

    public StripeRequestDTO() {}

    public StripeRequestDTO(List<String> productNames, List<Long> pricesInCents, List<Long> quantities, String successUrl, String cancelUrl) {
        this.productNames = productNames;
        this.pricesInCents = pricesInCents;
        this.quantities = quantities;
        this.successUrl = successUrl;
        this.cancelUrl = cancelUrl;
    }
    public List<String> getProductNames() {
        return productNames;
    }
    public void setProductNames(List<String> productNames) {
        this.productNames = productNames;
    }
    public List<Long> getPricesInCents() {
        return pricesInCents;
    }
    public void setPricesInCents(List<Long> pricesInCents) {
        this.pricesInCents = pricesInCents;
    }
    public List<Long> getQuantities() {
        return quantities;
    }
    public void setQuantities(List<Long> quantities) {
        this.quantities = quantities;
    }
    public String getSuccessUrl() {
        return successUrl;
    }
    public void setSuccessUrl(String successUrl) {
        this.successUrl = successUrl;
    }
    public String getCancelUrl() {
        return cancelUrl;
    }
    public void setCancelUrl(String cancelUrl) {
        this.cancelUrl = cancelUrl;
    }

}
