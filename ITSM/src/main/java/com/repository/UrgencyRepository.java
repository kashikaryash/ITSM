package com.repository;

import com.entity.Urgency;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UrgencyRepository extends JpaRepository<Urgency, Long> {
}