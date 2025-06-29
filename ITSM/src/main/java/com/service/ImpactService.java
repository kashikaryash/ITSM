package com.service;

import com.entity.Impact;
import com.repository.ImpactRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImpactService {

    private final ImpactRepository impactRepository;

    public ImpactService(ImpactRepository impactRepository) {
        this.impactRepository = impactRepository;
    }

    public Impact create(Impact impact) {
        return impactRepository.save(impact);
    }

    public Impact update(Long id, Impact updated) {
        Impact existing = impactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Impact not found"));
        updated.setId(existing.getId());
        return impactRepository.save(updated);
    }

    public Impact getById(Long id) {
        return impactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Impact not found"));
    }

    public List<Impact> getAll() {
        return impactRepository.findAll();
    }

    public void delete(Long id) {
        impactRepository.deleteById(id);
    }
}
