package com.herin.ecommerce.dto.CartDTO;

public class CartRequestDTO {
    private Long productId;
    private int quantity = 1;

    public CartRequestDTO() {}

    public CartRequestDTO(Long productId, int quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
