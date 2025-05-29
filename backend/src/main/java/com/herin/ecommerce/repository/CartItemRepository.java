package com.herin.ecommerce.repository;

import com.herin.ecommerce.model.CartItemEntity;
import com.herin.ecommerce.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItemEntity, Long> {

    /**
     * Finds a CartItemEntity by its user ID.
     *
     * @param userId id of the user
     * @return the List of CartItemEntities if found, otherwise null
     */
    List<CartItemEntity> findByUserId(Long userId);
}
