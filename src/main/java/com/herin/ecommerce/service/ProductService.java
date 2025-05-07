package com.herin.ecommerce.service;

import com.herin.ecommerce.dto.ProductRequestDTO;
import com.herin.ecommerce.dto.ProductResponseDTO;
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
    @Autowired
    private ProductRepository productRepository;

    /**
     * Constructor
     */
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * Get all products
     */
    public List<ProductResponseDTO> getAllProducts() {
        // Convert ProductEntity to ProductResponseDTO
        return productRepository.findAll().stream().map(entity -> mapToDTO(entity)).collect(Collectors.toList());
    }

    /**
     * Add a product
     */
    public ProductResponseDTO addProduct(ProductRequestDTO product) {
        // Convert ProductRequestDTO to ProductEntity
        return mapToDTO(productRepository.save(mapToEntity(product)));
    }

    /**
     * Map a ProductRequestDTO to a ProductEntity
     */
    public ProductEntity mapToEntity(ProductRequestDTO dto) {
        return new ProductEntity(
                dto.getName(),
                dto.getDescription(),
                dto.getPrice(),
                dto.getImageUrl(),
                dto.getCategory(),
                dto.getQuantity()
        );
    }

    /**
     * Map a ProductEntity to a ProductResponseDTO
     */
    public ProductResponseDTO mapToDTO(ProductEntity dto) {
        return new ProductResponseDTO(
            dto.getId(),
            dto.getName(),
            dto.getDescription(),
            dto.getPrice(),
            dto.getImageUrl(),
            dto.getCategory(),
            dto.getQuantity()
        );
    }
    

    
}
