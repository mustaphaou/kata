package com.alten.ecommerce.controller;

import com.alten.ecommerce.entity.CartItem;
import com.alten.ecommerce.entity.Product;
import com.alten.ecommerce.entity.UserEntity;
import com.alten.ecommerce.service.CartItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartItemController {

    private final CartItemService cartItemService;


    @GetMapping
    public List<CartItem> getCartItems(@AuthenticationPrincipal UserEntity user) {
        return cartItemService.getCartItems(user);
    }

    @PostMapping
    public CartItem addToCart(@AuthenticationPrincipal UserEntity user, @RequestBody Product product) {
        return cartItemService.addToCart(user, product);
    }

    @PatchMapping("/{id}")
    public CartItem updateQuantity(@PathVariable Long id, @RequestParam int quantity) {
        return cartItemService.updateQuantity(id, quantity);
    }

    @DeleteMapping("/{id}")
    public void removeFromCart(@PathVariable Long id) {
        cartItemService.removeFromCart(id);
    }
}

