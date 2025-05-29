package com.herin.ecommerce.model;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "cart_items")
public class CartItemEntity {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private UserEntity user;

    @ManyToOne
    private ProductEntity product;

    private int quantity = 1;


    /*
       Empty constructor
    */
    public CartItemEntity() {
    }

    /*
    Constructor with all fields
    */
    public CartItemEntity(Long id, UserEntity user, ProductEntity product, int quantity) {
        this.id = id;
        this.user = user;
        this.product = product;
        this.quantity = quantity;
    }

    /*
    Constructor with all fields except id
    */
    public CartItemEntity(UserEntity user, ProductEntity product, int quantity) {
        this.user = user;
        this.product = product;
        this.quantity = quantity;
    }

    /*
    Getter for id
    */
    public Long getId() {
        return id;
    }

    /*
    Setter for id
    */
    public void setId(Long id) {
        this.id = id;
    }

    /*
    Getter for user
    */
    public UserEntity getUser() {
        return user;
    }

    /*
    Setter for user
    */
    public void setUser(UserEntity user) {
        this.user = user;
    }

    /*
    Getter for product
    */
    public ProductEntity getProduct() {
        return product;
    }

    /*
    Setter for product
    */
    public void setProduct(ProductEntity product) {
        this.product = product;
    }

    /*
    Getter for quantity
    */
    public int getQuantity() {
        return quantity;
    }

    /*
    Setter for quantity
    */
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    /*
    Equals method
    */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartItemEntity that = (CartItemEntity) o;
        return getQuantity() == that.getQuantity() && Objects.equals(getId(), that.getId()) && Objects.equals(getUser(), that.getUser()) && Objects.equals(getProduct(), that.getProduct());
    }

    /*
    HashCode method
    */
    @Override
    public int hashCode() {
        return Objects.hash(getId(), getUser(), getProduct(), getQuantity());
    }
}
