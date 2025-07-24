package com.herin.ecommerce.controller;

import com.herin.ecommerce.dto.StripeRequestDTO;
import com.herin.ecommerce.service.StripeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/stripe")
public class StripeController {
    private final StripeService stripeService;

    @Autowired
    public StripeController(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(@RequestBody StripeRequestDTO stripeRequestDTO)  {
        try {
            // Extract data from the request DTO
            List<String> productNames = stripeRequestDTO.getProductNames();
            List<Long> pricesInCents = stripeRequestDTO.getPricesInCents();
            List<Long> quantities = stripeRequestDTO.getQuantities();
            String successUrl = stripeRequestDTO.getSuccessUrl();
            String cancelUrl = stripeRequestDTO.getCancelUrl();

            String checkoutUrl = stripeService.createCheckoutSession(
                    productNames,
                    pricesInCents,
                    quantities,
                    successUrl,
                    cancelUrl
            );
            // Call the service to create a checkout session
            return ResponseEntity.ok(Collections.singletonMap("url", checkoutUrl));

        }
        catch (Exception e) {
            // Handle exceptions and return an error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", e.getMessage()));
        }
    }
}
