package com.alten.ecommerce.service;

import com.alten.ecommerce.entity.CartItem;
import com.alten.ecommerce.entity.Product;
import com.alten.ecommerce.entity.UserEntity;
import com.alten.ecommerce.repository.CartItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartItemService {

    private final CartItemRepository cartItemRepository;

    public List<CartItem> getCartItems(UserEntity user) {
        log.info("Récupération des articles du panier pour l'utilisateur : {}", user.getEmail());
        return cartItemRepository.findByUser(user);
    }

    public CartItem addToCart(UserEntity user, Product product) {
        log.info("Ajout du produit '{}' au panier de l'utilisateur {}", product.getName(), user.getEmail());

        Optional<CartItem> existing = cartItemRepository.findByUser(user).stream()
                .filter(ci -> ci.getProduct().getId().equals(product.getId()))
                .findFirst();

        if (existing.isPresent()) {
            CartItem item = existing.get();
            item.setQuantity(item.getQuantity() + 1);
            log.info("Produit déjà dans le panier. Nouvelle quantité : {}", item.getQuantity());
            return cartItemRepository.save(item);
        }

        CartItem newItem = new CartItem(null, user, product, 1);
        log.info("Produit ajouté pour la première fois avec une quantité de 1");
        return cartItemRepository.save(newItem);
    }

    public CartItem updateQuantity(Long id, int quantity) {
        log.info("Mise à jour de la quantité de l'article avec l'id {} à {}", id, quantity);
        CartItem item = cartItemRepository.findById(id).orElseThrow();
        item.setQuantity(quantity);
        return cartItemRepository.save(item);
    }

    public void removeFromCart(Long id) {
        log.info("Suppression de l'article du panier avec l'id {}", id);
        cartItemRepository.deleteById(id);
    }
}