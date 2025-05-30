package com.herin.ecommerce.dto.CartDTO;

import com.herin.ecommerce.dto.ProductDTO.ProductResponseDTO;

public class CartResponseDTO {
    private Long id;
    private ProductResponseDTO product;
    private int quantity;

    public CartResponseDTO(Long id, ProductResponseDTO product, int quantity) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
    }

    public CartResponseDTO() {
    }

    public CartResponseDTO(ProductResponseDTO product, int quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public ProductResponseDTO getProduct() {
        return product;
    }

    public void setProduct(ProductResponseDTO product) {
        this.product = product;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
