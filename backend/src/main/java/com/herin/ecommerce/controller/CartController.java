package com.herin.ecommerce.controller;

import com.herin.ecommerce.dto.CartDTO.CartRequestDTO;
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
    public ResponseEntity<List<CartItemEntity>> getCartItems(@AuthenticationPrincipal UserPrincipal userPrincipal) {
            return ResponseEntity.ok(cartService.getCartItemsByUserId(userPrincipal.getUser().getId()));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addCartItems(@RequestBody CartRequestDTO cartRequestDTO,
                                                             @AuthenticationPrincipal UserPrincipal userPrincipal) {
        long userID = userPrincipal.getUser().getId();
        cartService.addCartItem(userID, cartRequestDTO);

    }

}
