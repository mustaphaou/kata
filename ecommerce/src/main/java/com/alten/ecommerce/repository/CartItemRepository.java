package com.alten.ecommerce.repository;

import com.alten.ecommerce.entity.CartItem;
import com.alten.ecommerce.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(UserEntity user);
}
