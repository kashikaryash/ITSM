package com.controller;

import com.entity.ResolutionCode;
import com.service.ResolutionCodeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resolution-codes")
public class ResolutionCodeController {

    private final ResolutionCodeService resolutionCodeService;
    public ResolutionCodeController(ResolutionCodeService resolutionCodeService) {
        this.resolutionCodeService = resolutionCodeService;
    }

    @PostMapping
    public ResolutionCode create(@RequestBody ResolutionCode resolutionCode) {
        return resolutionCodeService.create(resolutionCode);
    }

    @GetMapping
    public List<ResolutionCode> getAll() {
        return resolutionCodeService.getAll();
    }

    @GetMapping("/{id}")
    public ResolutionCode getById(@PathVariable Long id) {
        return resolutionCodeService.getById(id);
    }

    @PutMapping("/{id}")
    public ResolutionCode update(@PathVariable Long id, @RequestBody ResolutionCode resolutionCode) {
        return resolutionCodeService.update(id, resolutionCode);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        resolutionCodeService.delete(id);
    }
}
