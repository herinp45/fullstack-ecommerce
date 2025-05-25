package com.herin.ecommerce.service;

import com.herin.ecommerce.exception.BadRequestException;
import com.herin.ecommerce.model.UserEntity;
import com.herin.ecommerce.model.UserPrincipal;
import com.herin.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public AuthUserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        UserEntity user = (UserEntity) userRepository.findByUsernameOrEmail(identifier,identifier)
                .orElseThrow(() -> new BadRequestException("User not found"));
        return new UserPrincipal(user);
    }
}
