package com.herin.ecommerce.mapper;

import com.herin.ecommerce.dto.ProductDTO.ProductRequestDTO;
import com.herin.ecommerce.dto.ProductDTO.ProductResponseDTO;
import com.herin.ecommerce.model.ProductEntity;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {
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
