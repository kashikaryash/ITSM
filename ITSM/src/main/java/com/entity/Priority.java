package com.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "priorities")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Priority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String level; // e.g. Low, Medium, High, Critical
}
