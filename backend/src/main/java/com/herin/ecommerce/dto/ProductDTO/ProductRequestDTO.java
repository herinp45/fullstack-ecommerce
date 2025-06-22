package com.herin.ecommerce.dto.ProductDTO;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;

public class ProductRequestDTO {
    /**
     * Name of the product
     */
    @NotBlank(message = "Name is required")
    private String name;

    /**
     * Description of the product
     */
    @NotBlank(message = "Description is required")
    @Column(length = 1000)
    private String description;

    /**
     * Price of the product
     */
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.00", message = "Price must be greater than 0")
    private BigDecimal price;

    /**
     * Image URL of the product
     */
    @NotBlank(message = "Image URL is required")
    private String imageUrl;

    /**
     * Category of the product
     */
    @NotBlank(message = "Category is required")
    private String category;

    /**
     * Quantity of the product
     */
    @Min(value = 0, message = "Quantity must be greater than 0")
    private int quantity;

    /**
     * Empty constructor
     */
    public ProductRequestDTO() {
    }

    /**
     * Constructor with all fields
     */
    public ProductRequestDTO(String name, String description, BigDecimal price, String imageUrl, String category, int quantity) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
        this.quantity = quantity;
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
     * To String method for ProductRequestDTO
     * @return string description of ProductRequestDTO
     */
    @Override
    public String toString() {
        return "ProductRequestDTO{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", imageUrl='" + imageUrl + '\'' +
                ", category='" + category + '\'' +
                ", quantity=" + quantity +
                '}';
    }
}
