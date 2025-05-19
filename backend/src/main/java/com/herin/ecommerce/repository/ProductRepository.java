package com.herin.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.herin.ecommerce.model.ProductEntity;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
}
