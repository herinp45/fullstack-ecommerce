package com.herin.ecommerce.controller;

import com.herin.ecommerce.dto.ProductRequestDTO;
import com.herin.ecommerce.dto.ProductResponseDTO;
import com.herin.ecommerce.model.ProductEntity;
import com.herin.ecommerce.repository.ProductRepository;
import com.herin.ecommerce.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/products")
public class ProductController {


    /**
     * Product repository
     */
    private ProductService productService;

    /**
     * Constructor
     */
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * Get all products
     */
    @GetMapping
    public List<ProductResponseDTO> getAllProducts() {
        return productService.getAllProducts();
    }

    /**
     * Add a product
     */
    @PostMapping
    public ResponseEntity<ProductResponseDTO> addProduct(@Valid @RequestBody ProductRequestDTO product) {
        ProductResponseDTO response = productService.addProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


}
