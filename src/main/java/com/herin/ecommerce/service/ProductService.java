package com.herin.ecommerce.service;

import com.herin.ecommerce.dto.ProductRequestDTO;
import com.herin.ecommerce.dto.ProductResponseDTO;
import com.herin.ecommerce.mapper.ProductMapper;
import com.herin.ecommerce.model.ProductEntity;
import com.herin.ecommerce.repository.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

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


    
}
