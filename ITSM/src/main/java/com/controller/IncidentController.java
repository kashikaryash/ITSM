package com.controller;

import com.entity.Incident;
import com.service.IncidentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incidents")
public class IncidentController {

    private final IncidentService incidentService;
    public IncidentController(IncidentService incidentService) {
        this.incidentService = incidentService;
    }

    @PostMapping
    public Incident create(@RequestBody Incident incident) {
        return incidentService.createIncident(incident);
    }

    @GetMapping
    public List<Incident> getAll() {
        return incidentService.getAllIncidents();
    }

    @GetMapping("/{id}")
    public Incident getById(@PathVariable Long id) {
        return incidentService.getIncidentById(id);
    }

    @PutMapping("/{id}")
    public Incident update(@PathVariable Long id, @RequestBody Incident incident) {
        return incidentService.updateIncident(id, incident);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        incidentService.deleteIncident(id);
    }
}
