package com.example.ecommerce.user;

import javax.persistence.*;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String username;
    private String password;
    private String email;
    private String avatarPath;
    
    @Enumerated(EnumType.STRING)
    private UserRole role;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<Address> addresses;

    // Getters and setters
}