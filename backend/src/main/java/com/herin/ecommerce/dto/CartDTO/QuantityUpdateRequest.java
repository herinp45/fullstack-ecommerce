package com.herin.ecommerce.dto.CartDTO;

import jakarta.validation.constraints.Min;

public class QuantityUpdateRequest {
    @Min(1)
    private int quantity;

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
