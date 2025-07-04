package com.herin.ecommerce.service;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StripeService {
    @Value("${stripe.secret.key}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        // Initialize Stripe with the API key
        Stripe.apiKey = stripeApiKey;
    }

    public String createCheckoutSession(
            List<String> productNames,
            List<Long> pricesInCents,
            List<Long> quantities,
            String successUrl,
            String cancelUrl
    ) throws Exception {
        // Validate input parameters
        if (productNames == null || productNames.isEmpty() || pricesInCents == null || pricesInCents.isEmpty()) {
            throw new IllegalArgumentException("Product names and prices must not be empty.");
        }
        if (productNames.size() != pricesInCents.size()) {
            throw new IllegalArgumentException("Product names and prices must have the same number of items.");
        }
        // Create a Stripe checkout session
        SessionCreateParams.Builder builder = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(successUrl)
                .setCancelUrl(cancelUrl);

        // Add line items for each product
        for (int i = 0; i < productNames.size(); i++) {
            SessionCreateParams.LineItem.PriceData.ProductData productData =
                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                            .setName(productNames.get(i))
                            .build();
            SessionCreateParams.LineItem.PriceData priceData =
                    SessionCreateParams.LineItem.PriceData.builder()
                            .setCurrency("cad") // Set the currency to CAD
                            .setUnitAmount(pricesInCents.get(i)) // Price in cents
                            .setProductData(productData)
                            .build();
            SessionCreateParams.LineItem lineItem =
                    SessionCreateParams.LineItem.builder()
                            .setPriceData(priceData)
                            .setQuantity(quantities.get(i)) // Set quantity to 1 for each product
                            .build();
            builder.addLineItem(lineItem);
        }

        SessionCreateParams params = builder.build();
        Session session = Session.create(params);

        return session.getUrl();
    }


}
