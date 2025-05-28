package com.herin.ecommerce.service;

import com.herin.ecommerce.dto.LoginRequestDTO;
import com.herin.ecommerce.dto.UserRequestDTO;
import com.herin.ecommerce.dto.UserResponseDTO;
import com.herin.ecommerce.exception.BadRequestException;
import com.herin.ecommerce.model.UserEntity;
import com.herin.ecommerce.model.UserPrincipal;
import com.herin.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class AuthService {

    /**
     * Repository for user data.
     */
    private final UserRepository userRepository;
    /**
     * Password encoder for hashing passwords.
     */
    private final PasswordEncoder passwordEncoder;
    /**
     * Authentication manager for handling authentication.
     */
    private final AuthenticationManager authenticationManager;
    /**
     * JWT service for generating and validating tokens.
     */
    private final JWTService jwtService;

    /**
     * Constructor for AuthService.
     *
     * @param userRepository         the repository for user data
     * @param passwordEncoder        the password encoder for hashing passwords
     * @param authenticationManager  the authentication manager for handling authentication
     * @param jwtService             the JWT service for generating and validating tokens
     */
    @Autowired
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JWTService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    /**
     * Registers a new user.
     *
     * @param userRequestDTO contains the user details
     * @return UserResponseDTO containing the registered user's details
     * @throws BadRequestException if the username or email already exists
     */
    public UserResponseDTO register(UserRequestDTO userRequestDTO) {
        if (userRepository.existsByUsername(userRequestDTO.getUsername())) {
            throw new BadRequestException("Username already exists");
        }

        if (userRepository.existsByEmail(userRequestDTO.getEmail())) {
            throw new BadRequestException("Email already exists");
        }

        UserEntity user = new UserEntity(
                userRequestDTO.getUsername(),
                passwordEncoder.encode(userRequestDTO.getPassword()),
                userRequestDTO.getEmail()
        );

        userRepository.save(user);
        return new UserResponseDTO(user.getId(), user.getUsername(), user.getEmail());
    }

    /**
     * Authenticates the user and generates a JWT token.
     *
     * @param loginRequestDTO contains the username and password
     * @return JWT token if authentication is successful
     * @throws BadRequestException if authentication fails
     */
    public String login(LoginRequestDTO loginRequestDTO) {
        try {
            // Authenticate the user using the authentication manager
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequestDTO.getIdentifier(),
                            loginRequestDTO.getPassword()
                    )
            );

            // Check if the authentication was successful
            UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
            UserEntity user = principal.getUser();

            return jwtService.generateToken(user.getUsername());

        }
        catch (Exception e) {
            throw new BadRequestException("Invalid username or password");
        }
    }



}
