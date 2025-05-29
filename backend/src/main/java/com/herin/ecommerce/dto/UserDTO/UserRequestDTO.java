package com.herin.ecommerce.dto.UserDTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.Objects;

public class UserRequestDTO {
    //username
    @NotNull(message = "Username cannot be null")
    @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
    private String username;
    //email
    @NotNull(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    //password
    @NotNull(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$", message = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
    private String password;

    //constructor
    public UserRequestDTO() {
    }

    //constructor with all fields
    public UserRequestDTO(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    //getters and setters
    public String getPassword() {
        return password;
    }

    //setPassword
    public void setPassword(String password) {
        this.password = password;
    }

    //getEmail
    public String getEmail() {
        return email;
    }

    //setEmail
    public void setEmail(String email) {
        this.email = email;
    }

    //getUsername
    public String getUsername() {
        return username;
    }

    //setUsername
    public void setUsername(String username) {
        this.username = username;
    }
    
    //equals
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserRequestDTO that = (UserRequestDTO) o;
        return Objects.equals(getUsername(), that.getUsername()) && Objects.equals(getEmail(), that.getEmail()) && Objects.equals(getPassword(), that.getPassword());
    }

    //hashcode
    @Override
    public int hashCode() {
        return Objects.hash(getUsername(), getEmail(), getPassword());
    }
}

