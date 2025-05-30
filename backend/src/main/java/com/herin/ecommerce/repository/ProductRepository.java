package com.herin.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.herin.ecommerce.model.ProductEntity;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    Optional<ProductEntity> findById(Long productId);
}
