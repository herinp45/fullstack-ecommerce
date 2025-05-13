package com.herin.ecommerce.service;

import com.herin.ecommerce.dto.LoginRequestDTO;
import com.herin.ecommerce.dto.UserRequestDTO;
import com.herin.ecommerce.dto.UserResponseDTO;
import com.herin.ecommerce.model.UserEntity;
import com.herin.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponseDTO register(UserRequestDTO userRequestDTO) {
        if (userRepository.existsByUsername(userRequestDTO.getUsername())) {
            throw new RuntimeException("User already exists");
        }
        if (userRepository.existsByEmail(userRequestDTO.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        UserEntity user = new UserEntity(userRequestDTO.getUsername(),
                passwordEncoder.encode(userRequestDTO.getPassword()),
                userRequestDTO.getEmail());
        userRepository.save(user);
        return new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail());
    }

    public UserResponseDTO login(LoginRequestDTO loginRequestDTO) {
        UserEntity user = userRepository.findByUsernameOrEmail(loginRequestDTO.getIdentifier(), loginRequestDTO.getIdentifier())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(loginRequestDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("Wrong password");
        }
        return new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail());
    }
}
