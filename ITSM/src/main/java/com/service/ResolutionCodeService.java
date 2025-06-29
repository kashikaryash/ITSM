package com.service;

import com.entity.ResolutionCode;
import com.repository.ResolutionCodeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResolutionCodeService {

    private final ResolutionCodeRepository resolutionCodeRepository;

    public ResolutionCodeService(ResolutionCodeRepository resolutionCodeRepository) {
        this.resolutionCodeRepository = resolutionCodeRepository;
    }

    public ResolutionCode create(ResolutionCode resolutionCode) {
        return resolutionCodeRepository.save(resolutionCode);
    }

    public ResolutionCode update(Long id, ResolutionCode updated) {
        ResolutionCode existing = resolutionCodeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resolution code not found"));
        updated.setId(existing.getId());
        return resolutionCodeRepository.save(updated);
    }

    public ResolutionCode getById(Long id) {
        return resolutionCodeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resolution code not found"));
    }

    public List<ResolutionCode> getAll() {
        return resolutionCodeRepository.findAll();
    }

    public void delete(Long id) {
        resolutionCodeRepository.deleteById(id);
    }
}
