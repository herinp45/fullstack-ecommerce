package com.herin.ecommerce.controller;

import com.herin.ecommerce.model.ProductEntity;
import com.herin.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    /**
     * Product repository
     */
    private final ProductRepository productRepository;
    
    /**
     * Constructor
     */
    @Autowired
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * Get all products
     */
    @GetMapping
    public List<ProductEntity> getAllProducts() {
        return productRepository.findAll();
    }

    /**
     * Add a product
     */
    @PostMapping
    public ProductEntity addProduct(@RequestBody ProductEntity product) {
        return productRepository.save(product);
    }
    
}
