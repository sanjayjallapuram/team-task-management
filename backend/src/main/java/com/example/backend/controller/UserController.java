package com.example.backend.controller;

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin("*")

public class UserController {

    private final UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }
}