package com.example.backend.controller;

import com.example.backend.dto.ProjectRequest;
import com.example.backend.entity.Project;
import com.example.backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@CrossOrigin("*")

public class ProjectController {

    private final ProjectService projectService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Project createProject(@RequestBody ProjectRequest request) {
        return projectService.createProject(request);
    }

    @GetMapping("/my")
    public List<Project> getMyProjects() {
        return projectService.getMyProjects();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{projectId}/members/{userId}")
    public Project addMember(@PathVariable String projectId, @PathVariable String userId) {
        return projectService.addMember(projectId, userId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{projectId}/members/{userId}")
    public Project removeMember(@PathVariable String projectId, @PathVariable String userId) {
        return projectService.removeMember(projectId, userId);
    }
}