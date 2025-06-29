package com.service;

import com.entity.Urgency;
import com.repository.UrgencyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UrgencyService {

    private final UrgencyRepository urgencyRepository;

    public UrgencyService(UrgencyRepository urgencyRepository) {
        this.urgencyRepository = urgencyRepository;
    }

    public Urgency create(Urgency urgency) {
        return urgencyRepository.save(urgency);
    }

    public Urgency update(Long id, Urgency updated) {
        Urgency existing = urgencyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Urgency not found"));
        updated.setId(existing.getId());
        return urgencyRepository.save(updated);
    }

    public Urgency getById(Long id) {
        return urgencyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Urgency not found"));
    }

    public List<Urgency> getAll() {
        return urgencyRepository.findAll();
    }

    public void delete(Long id) {
        urgencyRepository.deleteById(id);
    }
}
