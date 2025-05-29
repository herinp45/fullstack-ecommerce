package com.herin.ecommerce.dto.UserDTO;

import java.util.Objects;

public class UserResponseDTO {
    //id
    private Long id;
    //username
    private String username;
    //email
    private String email;

    //constructor
    public UserResponseDTO() {
    }

    //constructor with all fields
    public UserResponseDTO(Long id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    //getId
    public Long getId() {
        return id;
    }

    //setId
    public void setId(Long id) {
        this.id = id;
    }

    //getUsername
    public String getUsername() {
        return username;
    }

    //setUsername
    public void setUsername(String username) {
        this.username = username;
    }

    //getEmail
    public String getEmail() {
        return email;
    }

    //setEmail
    public void setEmail(String email) {
        this.email = email;
    }

    //equals
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserResponseDTO that = (UserResponseDTO) o;
        return Objects.equals(getId(), that.getId()) && Objects.equals(getUsername(), that.getUsername()) && Objects.equals(getEmail(), that.getEmail());
    }

    //hashcode
    @Override
    public int hashCode() {
        return Objects.hash(getId(), getUsername(), getEmail());
    }
}

