package com.herin.ecommerce.service;

import com.herin.ecommerce.dto.ProductDTO.ProductRequestDTO;
import com.herin.ecommerce.dto.ProductDTO.ProductResponseDTO;
import com.herin.ecommerce.mapper.ProductMapper;
import com.herin.ecommerce.model.ProductEntity;
import com.herin.ecommerce.repository.CartItemRepository;
import com.herin.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Objects;

@Service
public class ProductService {
    /**
     * Product repository
     */
    private final ProductRepository productRepository;

    /**
     *
     */
    private final CartItemRepository cartItemRepository;

    /**
     * Product Mapper
     */
    private final ProductMapper productMapper;

    /**
     * Constructor
     */
    @Autowired
    public ProductService(ProductRepository productRepository, CartItemRepository cartItemRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.cartItemRepository = cartItemRepository;
        this.productMapper = productMapper;
    }

    /**
     * Get all products
     */
    public Map<String, Object> getAllProducts(int page, int size, String search) {
        // Convert ProductEntity to ProductResponseDTO
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductEntity> products;
        if (search.isEmpty()) {
            products = productRepository.findAll(pageable);
        }
        else {
            products = productRepository.
                    findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrCategoryContainingIgnoreCase(
                            search, search, search, pageable);
        }


        List<ProductResponseDTO> productResponseDTO =  products.getContent().stream().map(productMapper::mapToDTO).toList();
        Map<String, Object> response = new HashMap<>();
        response.put("products", productResponseDTO);
        response.put("currentPage", products.getNumber());
        response.put("totalItems", products.getTotalElements());
        response.put("totalPages", products.getTotalPages());

        return response;
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
    @Transactional
    public void deleteProduct(Long id) {
        // Check if the product exists
        ProductEntity existing = productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
        // Check if the product is in any cart
        cartItemRepository.deleteByProductId(id);

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

    public ProductResponseDTO searchProductsByImage(String image) throws IOException {
        return productRepository.findByImageUrlContainingIgnoreCase(image, PageRequest.of(0, 1))
                .stream()
                .findFirst()
                .map(productMapper::mapToDTO)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No products found with the given image"));
    }
}
