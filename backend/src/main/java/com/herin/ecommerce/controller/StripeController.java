package com.herin.ecommerce.controller;

import com.herin.ecommerce.service.StripeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stripe")
public class StripeController {
    private final StripeService stripeService;

    @Autowired
    public StripeController(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    @PostMapping("/create-checkout-session")
    public String createCheckoutSession(
            List<String> productNames,
            List<Long> pricesInCents,
            List<Long> quantities,
            String successUrl,
            String cancelUrl
    ) throws Exception {
        // Call the service to create a checkout session
        if (productNames == null || productNames.isEmpty() || pricesInCents == null || pricesInCents.isEmpty()) {
            throw new IllegalArgumentException("Product names and prices must not be empty.");
        }
        return stripeService.createCheckoutSession(productNames, pricesInCents, quantities, successUrl, cancelUrl);
    }
}
