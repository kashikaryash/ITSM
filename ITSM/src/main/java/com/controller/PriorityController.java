package com.controller;

import com.entity.Priority;
import com.service.PriorityService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/priorities")
public class PriorityController {

    private final PriorityService priorityService;
    public PriorityController(PriorityService priorityService) {
        this.priorityService = priorityService;
    }

    @PostMapping
    public Priority create(@RequestBody Priority priority) {
        return priorityService.create(priority);
    }

    @GetMapping
    public List<Priority> getAll() {
        return priorityService.getAll();
    }

    @GetMapping("/{id}")
    public Priority getById(@PathVariable Long id) {
        return priorityService.getById(id);
    }

    @PutMapping("/{id}")
    public Priority update(@PathVariable Long id, @RequestBody Priority priority) {
        return priorityService.update(id, priority);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        priorityService.delete(id);
    }
}
