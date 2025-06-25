package com.herin.ecommerce.service;

import com.herin.ecommerce.dto.CartDTO.CartRequestDTO;
import com.herin.ecommerce.dto.CartDTO.CartResponseDTO;
import com.herin.ecommerce.dto.CartDTO.QuantityUpdateRequest;
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

    /**
     * Adds an item to the cart for a given user.
     *
     * @param userId the ID of the user
     * @param cartRequestDTO the request containing product ID and quantity
     * @return the added cart item as a DTO
     */
    public CartResponseDTO addCartItem(long userId, CartRequestDTO cartRequestDTO) {
        Long productId = cartRequestDTO.getProductId();
        int requestedQty = Math.max(cartRequestDTO.getQuantity(), 1);

        ProductEntity product = getProductOrThrow(productId);
        UserEntity user = getUserOrThrow(userId);

        if (product.getQuantity() < requestedQty) {
            throw new BadRequestException("Not enough product in stock");
        }

        Optional<CartItemEntity> existingCartItem = cartItemRepository.findByUserIdAndProductId(userId, productId);

        CartItemEntity savedItem;
        if (existingCartItem.isPresent()) {
            CartItemEntity item = existingCartItem.get();
            item.setQuantity(cartRequestDTO.getQuantity());
            savedItem = cartItemRepository.save(item);
        }
        else {
            CartItemEntity newItem = new CartItemEntity();
            newItem.setUser(user);
            newItem.setProduct(product);
            newItem.setQuantity(cartRequestDTO.getQuantity());
            savedItem = cartItemRepository.save(newItem);
        }

        return cartMapper.mapToDTO(savedItem);
    }

    /**
     * Deletes a cart item for a given user.
     *
     * @param userId the ID of the user
     * @param cartId the ID of the cart item to delete
     */
    public void deleteCartItem(long userId, long cartId) {

        CartItemEntity item = cartItemRepository.findById(cartId)
                .orElseThrow(() -> new BadRequestException("Cart item not found"));

        if (item.getUser().getId() != userId) {
            throw new BadRequestException("Unauthorized access to cart item");
        }

        cartItemRepository.delete(item);
    }


    /**
     * Updates the quantity of a cart item.
     *
     * @param userId the ID of the user
     * @param cartItemId the ID of the cart item to update
     * @param quantityUpdateRequest the request containing the new quantity
     * @return the updated cart item as a DTO
     */
    public CartResponseDTO patchCartItemQty(long userId, Long cartItemId, QuantityUpdateRequest quantityUpdateRequest) {
        CartItemEntity cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new BadRequestException("No such Cart Item Exist"));

        int requestedQty = Math.max(quantityUpdateRequest.getQuantity(), 1);
        ProductEntity product = cartItem.getProduct();
        UserEntity user = cartItem.getUser();

        if (user.getId() != userId) {
            throw new BadRequestException("Unauthorized access to cart item");
        }

        if (product.getQuantity() < requestedQty) {
            throw new BadRequestException("Not enough product in stock");
        }

        cartItem.setQuantity(requestedQty);
        cartItemRepository.save(cartItem);
        return cartMapper.mapToDTO(cartItem);
    }



    private ProductEntity getProductOrThrow(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new BadRequestException("Product not found"));
    }

    private UserEntity getUserOrThrow(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new BadRequestException("User not found"));
    }

}
