package com.herin.ecommerce.service;

import com.herin.ecommerce.dto.LoginRequestDTO;
import com.herin.ecommerce.dto.UserRequestDTO;
import com.herin.ecommerce.dto.UserResponseDTO;
import com.herin.ecommerce.model.UserEntity;
import com.herin.ecommerce.model.UserPrincipal;
import com.herin.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

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
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.existsByEmail(userRequestDTO.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        UserEntity user = new UserEntity(
                userRequestDTO.getUsername(),
                passwordEncoder.encode(userRequestDTO.getPassword()),
                userRequestDTO.getEmail()
        );

        userRepository.save(user);
        return new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail());
    }

    public UserResponseDTO login(LoginRequestDTO loginRequestDTO) {
        UserEntity user = userRepository.findByUsernameOrEmail(
                        loginRequestDTO.getIdentifier(),
                        loginRequestDTO.getIdentifier())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!passwordEncoder.matches(loginRequestDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail());
    }


}
