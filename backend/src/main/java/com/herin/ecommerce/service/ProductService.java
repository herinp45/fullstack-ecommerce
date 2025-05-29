package com.herin.ecommerce.service;

import com.herin.ecommerce.dto.ProductDTO.ProductRequestDTO;
import com.herin.ecommerce.dto.ProductDTO.ProductResponseDTO;
import com.herin.ecommerce.mapper.ProductMapper;
import com.herin.ecommerce.model.ProductEntity;
import com.herin.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    /**
     * Product repository
     */
    private final ProductRepository productRepository;

    /**
     * Product Mapper
     */
    private final ProductMapper productMapper;

    /**
     * Constructor
     */
    @Autowired
    public ProductService(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    /**
     * Get all products
     */
    public List<ProductResponseDTO> getAllProducts() {
        // Convert ProductEntity to ProductResponseDTO
        return productRepository.findAll().stream().map(entity -> productMapper.mapToDTO(entity)).collect(Collectors.toList());
    }

    /**
     * Add a product
     */
    public ProductResponseDTO addProduct(ProductRequestDTO product) {
        // Convert ProductRequestDTO to ProductEntity
        return productMapper.mapToDTO(productRepository.save(productMapper.mapToEntity(product)));
    }

    /**
     * Update a product
     */
    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO product) {
        // Check if the product exists
        ProductEntity existing = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

        // Update fields manually
        existing.setName(product.getName());
        existing.setDescription(product.getDescription());
        existing.setPrice(product.getPrice());
        existing.setQuantity(product.getQuantity());
        existing.setCategory(product.getCategory());
        existing.setImageUrl(product.getImageUrl());
        return productMapper.mapToDTO(productRepository.save(existing));
    }

    /**
     * Delete a product
     */
    public void deleteProduct(Long id) {
        // Check if the product exists
        ProductEntity existing = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

        productRepository.delete(existing);

    }

    /**
     * Get a product by id
     */
    public ProductResponseDTO getProductById(Long id) {
        // Check if the product exists
        ProductEntity existing = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
        return productMapper.mapToDTO(existing);
    }

}
