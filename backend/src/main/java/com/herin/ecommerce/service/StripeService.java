package com.herin.ecommerce.service;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;

public class StripeService {
    @Value("${stripe.secret.key}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        // Initialize Stripe with the API key
        Stripe.apiKey = stripeApiKey;
    }
}
