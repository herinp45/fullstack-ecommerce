package com.herin.ecommerce.repository;

import com.herin.ecommerce.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
    boolean existsByEmail(String email);

    Optional<Object> findByUsername(String username);
    boolean existsByUsername(String username);

    Optional<UserEntity> findByUsernameOrEmail(String username, String email);

    Optional<UserEntity> findById(long userId);
}
