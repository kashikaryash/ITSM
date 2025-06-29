package com.controller;

import com.entity.PendingReason;
import com.service.PendingReasonService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pending-reasons")
public class PendingReasonController {

    private final PendingReasonService pendingReasonService;
    public PendingReasonController(PendingReasonService pendingReasonService) {
        this.pendingReasonService = pendingReasonService;
    }

    @PostMapping
    public PendingReason create(@RequestBody PendingReason pendingReason) {
        return pendingReasonService.create(pendingReason);
    }

    @GetMapping
    public List<PendingReason> getAll() {
        return pendingReasonService.getAll();
    }

    @GetMapping("/{id}")
    public PendingReason getById(@PathVariable Long id) {
        return pendingReasonService.getById(id);
    }

    @PutMapping("/{id}")
    public PendingReason update(@PathVariable Long id, @RequestBody PendingReason pendingReason) {
        return pendingReasonService.update(id, pendingReason);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        pendingReasonService.delete(id);
    }
}
