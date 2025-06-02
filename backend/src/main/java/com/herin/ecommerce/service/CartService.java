package com.herin.ecommerce.service;

import com.herin.ecommerce.dto.CartDTO.CartRequestDTO;
import com.herin.ecommerce.dto.CartDTO.CartResponseDTO;
import com.herin.ecommerce.exception.BadRequestException;
import com.herin.ecommerce.mapper.CartMapper;
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
import java.util.stream.Collectors;

@Service
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CartMapper cartMapper;

    /**
     * Constructor for CartService.
     *
     * @param cartItemRepository the repository to manage cart items
     */
    @Autowired
    public CartService(CartItemRepository cartItemRepository, UserRepository userRepository, ProductRepository productRepository, CartMapper cartMapper) {
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.cartMapper = cartMapper;
    }

    /**
     * Retrieves all cart items for a given user ID.
     *
     * @param userId the ID of the user whose cart items are to be retrieved
     */
    public List<CartResponseDTO> getCartItemsByUserId(Long userId) {
        return cartItemRepository.findByUserId(userId).stream()
                .map(cartMapper::mapToDTO).collect(Collectors.toList());
    }

    public void addCartItem(long userId, CartRequestDTO cartRequestDTO) {
        Long productId = cartRequestDTO.getProductId();
        int requestedQty = cartRequestDTO.getQuantity() <= 0 ? 1 : cartRequestDTO.getQuantity();

        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new BadRequestException("Product not found"));

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new BadRequestException("User not found"));

        if (product.getQuantity() < requestedQty) {
            throw new BadRequestException("Not enough product in stock");
        }

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

    public void deleteCartItem(long userId, Long cartId) {

        CartItemEntity item = cartItemRepository.findById(cartId)
                .orElseThrow(() -> new BadRequestException("Cart item not found"));

        if (item.getUser().getId() != userId) {
            throw new BadRequestException("Unauthorized access to cart item");
        }

        cartItemRepository.delete(item);
    }
}
