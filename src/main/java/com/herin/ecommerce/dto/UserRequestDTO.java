package com.herin.ecommerce.dto;

import java.util.Objects;

public class UserRequestDTO {
    //username  
    private String username;
    //email
    private String email;
    //password
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

