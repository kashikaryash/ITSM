package com.controller;

import com.entity.Urgency;
import com.service.UrgencyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/urgencies")
public class UrgencyController {

    private final UrgencyService urgencyService;
    public UrgencyController(UrgencyService urgencyService) {
        this.urgencyService = urgencyService;
    }

    @PostMapping
    public Urgency create(@RequestBody Urgency urgency) {
        return urgencyService.create(urgency);
    }

    @GetMapping
    public List<Urgency> getAll() {
        return urgencyService.getAll();
    }

    @GetMapping("/{id}")
    public Urgency getById(@PathVariable Long id) {
        return urgencyService.getById(id);
    }

    @PutMapping("/{id}")
    public Urgency update(@PathVariable Long id, @RequestBody Urgency urgency) {
        return urgencyService.update(id, urgency);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        urgencyService.delete(id);
    }
}
