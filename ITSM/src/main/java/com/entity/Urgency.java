package com.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "urgencies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Urgency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String level; // e.g. Low, High, Immediate
}
