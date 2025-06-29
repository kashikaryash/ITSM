package com.controller;

import com.entity.Impact;
import com.service.ImpactService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/impacts")
public class ImpactController {

    private final ImpactService impactService;
    public ImpactController(ImpactService impactService) {
        this.impactService = impactService;
    }

    @PostMapping
    public Impact create(@RequestBody Impact impact) {
        return impactService.create(impact);
    }

    @GetMapping
    public List<Impact> getAll() {
        return impactService.getAll();
    }

    @GetMapping("/{id}")
    public Impact getById(@PathVariable Long id) {
        return impactService.getById(id);
    }

    @PutMapping("/{id}")
    public Impact update(@PathVariable Long id, @RequestBody Impact impact) {
        return impactService.update(id, impact);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        impactService.delete(id);
    }
}
