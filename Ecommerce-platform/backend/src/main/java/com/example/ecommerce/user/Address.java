package com.example.ecommerce.user;

import javax.persistence.*;

@Entity
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String recipientName;
    private String phone;
    private String province;
    private String city;
    private String district;
    private String detailAddress;
    private Boolean isDefault;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Getters and setters
}