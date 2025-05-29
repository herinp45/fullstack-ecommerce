package com.herin.ecommerce.repository;

import com.herin.ecommerce.model.CartItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItemEntity, Long> {

    /**
     * Finds a CartItemEntity by its user ID.
     *
     * @param userId the ID of the user
     * @return the List of CartItemEntities if found, otherwise null
     */
    List<CartItemEntity> findByUser(Long userId);
}
