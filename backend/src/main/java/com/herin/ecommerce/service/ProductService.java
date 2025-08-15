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

    public List<ProductResponseDTO> searchProductsByImage(MultipartFile image) throws IOException {
        String pythonUrl = "http://localhost:5000/api/v1/products/search-by-image";
        // Call the Python service to get the product IDs
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("image", new MultipartInputStreamFileResource(image.getInputStream(), image.getOriginalFilename()));
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        // Use RestTemplate to send the request
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> responseEntity = restTemplate.postForEntity(pythonUrl, requestEntity, Map.class);

        if (responseEntity.getStatusCode() != HttpStatus.OK) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to search products by image");
        }
        String matchedNames = (String) responseEntity.getBody().get("result");

        return productRepository.findByImageUrlContainingIgnoreCase(matchedNames, PageRequest.of(0, 10))
                .stream()
                .map(productMapper::mapToDTO)
                .toList();
    }
}
