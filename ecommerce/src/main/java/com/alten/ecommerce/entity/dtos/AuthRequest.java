package com.alten.ecommerce.entity.dtos;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}
