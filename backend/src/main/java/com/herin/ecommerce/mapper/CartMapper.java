package com.herin.ecommerce.mapper;

import com.herin.ecommerce.dto.CartDTO.CartResponseDTO;
import com.herin.ecommerce.model.CartItemEntity;
import org.springframework.stereotype.Component;

@Component
public class CartMapper {

    private final ProductMapper productMapper;

    public CartMapper(ProductMapper productMapper) {
        this.productMapper = productMapper;
    }

    public CartResponseDTO mapToDTO(CartItemEntity entity) {
        return new CartResponseDTO(
                entity.getId(),
                productMapper.mapToDTO(entity.getProduct()),
                entity.getQuantity()
        );
    }
}
