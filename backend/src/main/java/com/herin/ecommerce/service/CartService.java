package com.herin.ecommerce.service;

import com.herin.ecommerce.dto.CartDTO.CartRequestDTO;
import com.herin.ecommerce.exception.BadRequestException;
import com.herin.ecommerce.model.CartItemEntity;
import com.herin.ecommerce.model.ProductEntity;
import com.herin.ecommerce.model.UserEntity;
import com.herin.ecommerce.repository.CartItemRepository;
import com.herin.ecommerce.repository.ProductRepository;
import com.herin.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    /**
     * Constructor for CartService.
     *
     * @param cartItemRepository the repository to manage cart items
     */
    @Autowired
    public CartService(CartItemRepository cartItemRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    /**
     * Retrieves all cart items for a given user ID.
     *
     * @param userId the ID of the user whose cart items are to be retrieved
     */
    public List<CartItemEntity> getCartItemsByUserId(Long userId) {
        return cartItemRepository.findByUserId(userId);
    }

    public void addCartItem(long userId, CartRequestDTO cartRequestDTO) {
        Long productId = cartRequestDTO.getProductId();
        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new BadRequestException("Product not found"));

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new BadRequestException("User not found"));

        Optional<CartItemEntity> existingCartItem = cartItemRepository.findByUserIdAndProductId(userId, productId);

        if (existingCartItem.isPresent()) {
            existingCartItem.get().setQuantity(cartRequestDTO.getQuantity());
            cartItemRepository.save(existingCartItem.get());
        }
        else {
            CartItemEntity newItem = new CartItemEntity();
            newItem.setUser(user);
            newItem.setProduct(product);
            newItem.setQuantity(cartRequestDTO.getQuantity());
            cartItemRepository.save(newItem);

        }


    }

    public void deleteCartItem(long userId, Long productId) {

        Optional<CartItemEntity> existingCartItem = cartItemRepository.findByUserIdAndProductId(userId, productId);
        if (existingCartItem.isEmpty()) {
            throw new BadRequestException("Cart item not found for user and product.");
        }

        cartItemRepository.delete(existingCartItem.get());
    }
}
