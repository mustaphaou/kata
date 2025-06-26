package com.alten.ecommerce.entity.mapper;

import com.alten.ecommerce.entity.Product;
import com.alten.ecommerce.entity.dtos.ProductDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    ProductDto toDto(Product product);

    Product toEntity(ProductDto dto);

    List<ProductDto> toDtoList(List<Product> products);
}

