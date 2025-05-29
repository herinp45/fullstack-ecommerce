package com.herin.ecommerce.service;

import com.herin.ecommerce.model.CartItemEntity;
import com.herin.ecommerce.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    private final CartItemRepository cartItemRepository;

    /**
     * Constructor for CartService.
     *
     * @param cartItemRepository the repository to manage cart items
     */
    @Autowired
    public CartService(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    /**
     * Retrieves all cart items for a given user ID.
     *
     * @param userId the ID of the user whose cart items are to be retrieved
     */
    public List<CartItemEntity> getCartItemsByUserId(Long userId) {
        return cartItemRepository.findByUserId(userId);
    }
}
