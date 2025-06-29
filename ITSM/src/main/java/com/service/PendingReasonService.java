package com.service;

import com.entity.PendingReason;
import com.repository.PendingReasonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PendingReasonService {

    private final PendingReasonRepository pendingReasonRepository;

    public PendingReasonService(PendingReasonRepository pendingReasonRepository) {
        this.pendingReasonRepository = pendingReasonRepository;
    }

    public PendingReason create(PendingReason pendingReason) {
        return pendingReasonRepository.save(pendingReason);
    }

    public PendingReason update(Long id, PendingReason updated) {
        PendingReason existing = pendingReasonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pending reason not found"));
        updated.setId(existing.getId());
        return pendingReasonRepository.save(updated);
    }

    public PendingReason getById(Long id) {
        return pendingReasonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pending reason not found"));
    }

    public List<PendingReason> getAll() {
        return pendingReasonRepository.findAll();
    }

    public void delete(Long id) {
        pendingReasonRepository.deleteById(id);
    }
}
