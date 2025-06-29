package com.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "impacts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Impact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String description; // e.g. Low, Moderate, Severe
}
