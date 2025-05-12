package com.herin.ecommerce.model;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "users")
public class UserEntity {

    //id
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //username
    @Column(unique = true, nullable = false)
    private String username;
    //password
    @Column(nullable = false)
    private String password;
    //email
    @Column(unique = true, nullable = false)
    private String email;

    //constructor
    public UserEntity() {
    }

    //constructor with all fields
    public UserEntity(Long id, String username, String password, String email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }

    //constructor with username, password and email
    public UserEntity(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    //getters and setters
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

    //getPassword
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

    //equals
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserEntity that = (UserEntity) o;
        return Objects.equals(getId(), that.getId()) && Objects.equals(getUsername(), that.getUsername()) && Objects.equals(getPassword(), that.getPassword()) && Objects.equals(getEmail(), that.getEmail());
    }

    //hashCode
    @Override
    public int hashCode() {
        return Objects.hash(getId(), getUsername(), getPassword(), getEmail());
    }
}
