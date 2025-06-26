package com.alten.ecommerce.service;

import com.alten.ecommerce.entity.Product;
import com.alten.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> getAll() {
        log.info("Récupération de tous les produits.");
        return productRepository.findAll();
    }

    public Product getById(Long id) {
        log.info("Récupération du produit avec l'ID : {}", id);
        return productRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Produit avec l'ID {} non trouvé", id);
                    return new ResponseStatusException(HttpStatus.NOT_FOUND, "Produit non trouvé");
                });
    }

    public Product create(Product product) {
        log.info("Création d'un nouveau produit : {}", product.getName());
        product.setCreatedAt(System.currentTimeMillis());
        product.setUpdatedAt(System.currentTimeMillis());
        Product savedProduct = productRepository.save(product);
        log.info("Produit créé avec l'ID : {}", savedProduct.getId());
        return savedProduct;
    }

    public Product update(Long id, Product updatedProduct) {
        log.info("Mise à jour du produit avec l'ID : {}", id);
        Product product = getById(id);
        updatedProduct.setId(product.getId());
        updatedProduct.setCreatedAt(product.getCreatedAt());
        updatedProduct.setUpdatedAt(System.currentTimeMillis());
        Product saved = productRepository.save(updatedProduct);
        log.info("Produit mis à jour avec succès : {}", saved.getId());
        return saved;
    }

    public void delete(Long id) {
        log.info("Suppression du produit avec l'ID : {}", id);
        Product product = getById(id);
        productRepository.delete(product);
        log.info("Produit supprimé avec succès.");
    }


    private static final String UPLOAD_DIR = "uploads";

    public String saveImage(MultipartFile file) {
        try {
            if (!Files.exists(Paths.get(UPLOAD_DIR))) {
                Files.createDirectories(Paths.get(UPLOAD_DIR));
            }

            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, filename);

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return "/uploads/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de l'enregistrement de l'image", e);
        }
    }
}
