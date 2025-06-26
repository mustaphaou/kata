package com.alten.ecommerce.controller;

import com.alten.ecommerce.config.JwtService;
import com.alten.ecommerce.entity.UserEntity;
import com.alten.ecommerce.entity.dtos.AuthRequest;
import com.alten.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @PostMapping("/account")
    public ResponseEntity<?> register(@RequestBody UserEntity user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return ResponseEntity.ok(userRepository.save(user));
    }

    @PostMapping("/token")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                request.getEmail(), request.getPassword());

        Authentication authResult = authenticationManager.authenticate(authentication);

        UserDetails user = (UserDetails) authResult.getPrincipal();
        String token = jwtService.generateToken(user);

        return ResponseEntity.ok(Collections.singletonMap("token", token));
    }
}


