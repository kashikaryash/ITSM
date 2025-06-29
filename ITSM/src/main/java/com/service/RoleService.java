package com.service;

import com.entity.Role;
import com.entity.RoleType;
import com.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role create(Role role) {
        return roleRepository.save(role);
    }

    public Optional<Role> getByName(RoleType name) {
        return roleRepository.findByName(name);
    }

    public List<Role> getAll() {
        return roleRepository.findAll();
    }

    public Role getById(Long id) {
        return roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Role not found"));
    }

    public void delete(Long id) {
        roleRepository.deleteById(id);
    }
}
