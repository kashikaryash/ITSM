package com.repository;

import com.entity.Incident;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
    List<Incident> findByCreatedBy_Id(Long userId);
    List<Incident> findByAssignedTo_Id(Long userId);
}
