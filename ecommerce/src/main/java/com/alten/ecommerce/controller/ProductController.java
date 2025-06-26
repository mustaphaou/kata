package com.alten.ecommerce.controller;

import com.alten.ecommerce.entity.Product;
import com.alten.ecommerce.entity.dtos.ProductDto;
import com.alten.ecommerce.entity.mapper.ProductMapper;
import com.alten.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ProductMapper productMapper;

    @GetMapping
    public List<ProductDto> getAll() {
        return productMapper.toDtoList(productService.getAll());
    }

    @GetMapping("/{id}")
    public ProductDto getById(@PathVariable Long id) {
        return productMapper.toDto(productService.getById(id));
    }

    @PostMapping
    @PreAuthorize("authentication.principal.email == 'admin@admin.com'")
    public ProductDto create(@RequestBody ProductDto dto) {
        Product created = productService.create(productMapper.toEntity(dto));
        return productMapper.toDto(created);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("authentication.principal.email == 'admin@admin.com'")
    public ProductDto update(@PathVariable Long id, @RequestBody ProductDto dto) {
        Product updated = productService.update(id, productMapper.toEntity(dto));
        return productMapper.toDto(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("authentication.principal.email == 'admin@admin.com'")
    public void delete(@PathVariable Long id) {
        productService.delete(id);
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("authentication.principal.email == 'admin@admin.com'")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) {
        String imagePath = productService.saveImage(file);
        return ResponseEntity.ok(imagePath);
    }
}
