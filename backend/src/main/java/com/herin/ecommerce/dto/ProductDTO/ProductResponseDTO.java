package com.herin.ecommerce.dto.ProductDTO;

import java.math.BigDecimal;
import java.util.Objects;

public class ProductResponseDTO {
    private Long id;

    /**
     * Name of the product
     */
    private String name;

    /**
     * Description of the product
     */
    private String description;

    /**
     * Price of the product
     */
    private BigDecimal price;

    /**
     * Image URL of the product
     */
    private String imageUrl;

    /**
     * Category of the product
     */
    private String category;

    /**
     * Quantity of the product
     */
    private int quantity;

    /**
     * Empty constructor
     */
    public ProductResponseDTO() {
    }

    /**
     * Constructor with all fields
     */
    public ProductResponseDTO(Long id, String name, String description, BigDecimal price, String imageUrl, String category, int quantity) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
        this.quantity = quantity;
    }

    /**
     * Constructor with all fields except id
     */
    public ProductResponseDTO(String name, String description, BigDecimal price, String imageUrl, String category, int quantity) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
        this.quantity = quantity;
    }

    /**
     * Getter for id
     */
    public Long getId() {
        return id;
    }

    /**
     * Setter for id
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Getter for name
     */
    public String getName() {
        return name;
    }

    /**
     * Setter for name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Getter for description
     */
    public String getDescription() {
        return description;
    }

    /**
     * Setter for description
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Getter for price
     */
    public BigDecimal getPrice() {
        return price;
    }

    /**
     * Setter for price
     */
    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    /**
     * Getter for imageUrl
     */
    public String getImageUrl() {
        return imageUrl;
    }

    /**
     * Setter for imageUrl
     */
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    /**
     * Getter for category
     */
    public String getCategory() {
        return category;
    }

    /**
     * Setter for category
     */
    public void setCategory(String category) {
        this.category = category;
    }

    /**
     * Getter for quantity
     */
    public int getQuantity() {
        return quantity;
    }

    /**
     * Setter for quantity
     */
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    /**
     * Equals method
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductResponseDTO that = (ProductResponseDTO) o;
        return getQuantity() == that.getQuantity() && Objects.equals(getId(), that.getId()) && Objects.equals(getName(), that.getName()) && Objects.equals(getDescription(), that.getDescription()) && Objects.equals(getPrice(), that.getPrice()) && Objects.equals(getImageUrl(), that.getImageUrl()) && Objects.equals(getCategory(), that.getCategory());
    }

    /**
     * HashCode method
     */
    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getDescription(), getPrice(), getImageUrl(), getCategory(), getQuantity());
    }
}
