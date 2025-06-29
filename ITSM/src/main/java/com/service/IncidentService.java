package com.service;

import com.entity.Incident;
import com.repository.IncidentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncidentService {

    private final IncidentRepository incidentRepository;

    public IncidentService(IncidentRepository incidentRepository) {
        this.incidentRepository = incidentRepository;
    }

    public Incident createIncident(Incident incident) {
        return incidentRepository.save(incident);
    }

    public Incident updateIncident(Long id, Incident updatedIncident) {
        Incident existing = incidentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Incident not found"));
        updatedIncident.setId(existing.getId());
        return incidentRepository.save(updatedIncident);
    }

    public Incident getIncidentById(Long id) {
        return incidentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Incident not found"));
    }

    public List<Incident> getAllIncidents() {
        return incidentRepository.findAll();
    }

    public void deleteIncident(Long id) {
        incidentRepository.deleteById(id);
    }
}
