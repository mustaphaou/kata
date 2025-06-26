package com.alten.ecommerce.entity.dtos;
import lombok.Data;

@Data
public class ProductDto {
    private Long id;
    private String code;
    private String name;
    private String description;
    private String image;
    private String category;
    private Double price;
    private Integer quantity;
    private String internalReference;
    private Long shellId;
    private String inventoryStatus;
    private Float rating;
    private Long createdAt;
    private Long updatedAt;
}

