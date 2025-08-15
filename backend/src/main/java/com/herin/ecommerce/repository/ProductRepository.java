package com.herin.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.herin.ecommerce.model.ProductEntity;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

    Optional<ProductEntity> findById(Long productId);

    /**
     * Find all products with pagination
     * @param pageable Pageable instance
     * @return Page<ProductEntity> list of products
     */
    Page<ProductEntity> findAll(Pageable pageable);

    /**
     * Find products by name, description or category
     * @param name String name of the product
     * @param description String description of the product
     * @param category String category of the product
     * @param pageable Pageable instance
     * @return Page<ProductEntity> list of products
     */
    Page<ProductEntity> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrCategoryContainingIgnoreCase
    (String name, String description, String category, Pageable pageable);

    /**
     * Find products by image URL
     * @param imageUrl String image URL of the product
     * @param pageable Pageable instance
     * @return Page<ProductEntity> list of products
     */
    Page<ProductEntity> findByImageUrlContainingIgnoreCase(String imageUrl, Pageable pageable);
}
