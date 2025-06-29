package com.repository;

import com.entity.PendingReason;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PendingReasonRepository extends JpaRepository<PendingReason, Long> {
}
