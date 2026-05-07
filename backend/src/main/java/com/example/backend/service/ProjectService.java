package com.example.backend.service;

import com.example.backend.dto.ProjectRequest;
import com.example.backend.entity.Project;
import com.example.backend.entity.User;
import com.example.backend.repository.ProjectRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor

public class ProjectService {

    private final ProjectRepository projectRepository;

    private final UserRepository userRepository;

    public Project createProject(ProjectRequest request) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User currentUser = userRepository.findByEmail(email)
                .orElseThrow();

        if (!currentUser.getSystemRole().name().equals("ADMIN")) {
            throw new RuntimeException(
                    "Only admins can create projects"
            );
        }

        Project project = Project.builder()
                .name(request.getName())
                .description(request.getDescription())
                .adminId(currentUser.getId())
                .createdBy(currentUser.getId())
                .members(List.of(currentUser.getId()))
                .createdAt(LocalDateTime.now())
                .build();

        return projectRepository.save(project);
    }

    public List<Project> getMyProjects() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User currentUser = userRepository.findByEmail(email)
                .orElseThrow();

        return projectRepository
                .findByMembersContaining(currentUser.getId());
    }

    public Project addMember(String projectId, String userId) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User currentUser = userRepository
                .findByEmail(email)
                .orElseThrow();

        Project project = projectRepository
                .findById(projectId)
                .orElseThrow(() ->
                        new RuntimeException("Project not found"));

        // ONLY PROJECT ADMIN CAN ADD MEMBERS
        if (!project.getAdminId().equals(currentUser.getId())) {

            throw new RuntimeException(
                    "Only project admin can add members"
            );
        }

        User member = userRepository
                .findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // AVOID DUPLICATES
        if (!project.getMembers().contains(member.getId())) {

            project.getMembers().add(member.getId());
        }

        return projectRepository.save(project);
    }

    public Project removeMember(String projectId,String userId) {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User currentUser = userRepository
                .findByEmail(email)
                .orElseThrow();

        Project project = projectRepository
                .findById(projectId)
                .orElseThrow(() ->
                        new RuntimeException("Project not found"));

        // ONLY PROJECT ADMIN
        if (!project.getAdminId().equals(currentUser.getId())) {

            throw new RuntimeException(
                    "Only project admin can remove members"
            );
        }

        // ADMIN CANNOT REMOVE SELF
        if (project.getAdminId().equals(userId)) {

            throw new RuntimeException(
                    "Admin cannot remove themselves"
            );
        }

        project.getMembers().remove(userId);

        return projectRepository.save(project);
    }
}