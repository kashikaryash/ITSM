package com.service;

import com.entity.Priority;
import com.repository.PriorityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PriorityService {

    private final PriorityRepository priorityRepository;

    public PriorityService(PriorityRepository priorityRepository) {
        this.priorityRepository = priorityRepository;
    }

    public Priority create(Priority priority) {
        return priorityRepository.save(priority);
    }

    public Priority update(Long id, Priority updated) {
        Priority existing = priorityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Priority not found"));
        updated.setId(existing.getId());
        return priorityRepository.save(updated);
    }

    public Priority getById(Long id) {
        return priorityRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Priority not found"));
    }

    public List<Priority> getAll() {
        return priorityRepository.findAll();
    }

    public void delete(Long id) {
        priorityRepository.deleteById(id);
    }
}
