package com.herin.ecommerce.controller;

import com.herin.ecommerce.dto.CartDTO.CartRequestDTO;
import com.herin.ecommerce.dto.CartDTO.CartResponseDTO;
import com.herin.ecommerce.dto.CartDTO.QuantityUpdateRequest;
import com.herin.ecommerce.model.CartItemEntity;
import com.herin.ecommerce.model.UserEntity;
import com.herin.ecommerce.model.UserPrincipal;
import com.herin.ecommerce.service.AuthService;
import com.herin.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/cart")
public class CartController {

    private final CartService cartService;

    /**
     * Constructor for CartController
     * 
     * @param cartService CartService instance
     */
    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    /**
     * Get all cart items for a user
     * 
     * @param userPrincipal UserPrincipal instance of the authenticated user
     * @return ResponseEntity<List<CartItemEntity>> list of cart items
     */
    @GetMapping
    public ResponseEntity<List<CartResponseDTO>> getCartItems(@AuthenticationPrincipal UserPrincipal userPrincipal) {
            return ResponseEntity.ok(cartService.getCartItemsByUserId(userPrincipal.getUser().getId()));
    }

    /**
     * Add items to the cart
     *
     * @param cartRequestDTO CartRequestDTO containing product ID and quantity
     * @param userPrincipal UserPrincipal instance of the authenticated user
     * @return ResponseEntity<CartResponseDTO> added cart item
     */
    @PostMapping("/add")
    public ResponseEntity<CartResponseDTO> addCartItems(@RequestBody CartRequestDTO cartRequestDTO,
                                                        @AuthenticationPrincipal UserPrincipal userPrincipal) {
        long userID = userPrincipal.getUser().getId();
        CartResponseDTO dto = cartService.addCartItem(userID, cartRequestDTO);
        return ResponseEntity.ok(dto);
    }

    /**
     * Update the quantity of a cart item
     *
     * @param cartItemId ID of the cart item to update
     * @param quantityUpdateRequest QuantityUpdateRequest containing new quantity
     * @param userPrincipal UserPrincipal instance of the authenticated user
     * @return ResponseEntity<CartResponseDTO> updated cart item
     */
    @PatchMapping("/{cartItemId}")
    public ResponseEntity<CartResponseDTO> patchCartItemsQty(@PathVariable Long cartItemId,
                                                             @RequestBody QuantityUpdateRequest quantityUpdateRequest,
                                                             @AuthenticationPrincipal UserPrincipal userPrincipal) {
        long userId = userPrincipal.getUser().getId();
        CartResponseDTO dto = cartService.patchCartItemQty(userId, cartItemId, quantityUpdateRequest);
        return ResponseEntity.ok(dto);
    }

    /**
     * Delete a cart item
     *
     * @param cartItemId ID of the cart item to delete
     * @param userPrincipal UserPrincipal instance of the authenticated user
     * @return ResponseEntity<?> response indicating success
     */
    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<?> deleteCartItems(@PathVariable Long cartItemId,
                                                            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        long userId = userPrincipal.getUser().getId();
        cartService.deleteCartItem(userId, cartItemId);
        return ResponseEntity.ok("Item deleted from cart");
    }


}
