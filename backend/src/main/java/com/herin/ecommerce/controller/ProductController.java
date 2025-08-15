package com.herin.ecommerce.controller;

import com.herin.ecommerce.dto.ProductDTO.ProductRequestDTO;
import com.herin.ecommerce.dto.ProductDTO.ProductResponseDTO;
import org.springframework.http.*;
import com.herin.ecommerce.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {


    /**
     * Product repository
     */
    private final ProductService productService;

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
    public Map<String, Object> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search
    ) {
        if (search == null || search.isBlank()) {
            search = "";
        }

        return productService.getAllProducts(page, size, search);
    }

    /**
     * Add a product
     */
    @PostMapping
    public ProductResponseDTO addProduct(@Valid @RequestBody ProductRequestDTO product) {
        return productService.addProduct(product);
    }

    /**
     * Get a product by id
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));

    }

    /**
     * Update a product
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> updatedProduct(@PathVariable Long id, @Valid @RequestBody ProductRequestDTO product) {
        return ResponseEntity.ok(productService.updateProduct(id, product));

    }

    /**
     * Delete a product
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    public static class ImageRequest {
        public String image;
    }

    @PostMapping("/search-by-image")
    public ResponseEntity<?> searchProductByImage(@RequestBody ImageRequest request) throws IOException {
        ProductResponseDTO product = productService.searchProductsByImage(request.image);
        if (product == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No products found with the given image");
        }
        return ResponseEntity.ok(product);
    }


}
