package com.example.backend.service;

import com.example.backend.dto.TaskRequest;
import com.example.backend.entity.*;
import com.example.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor

public class TaskService {

    private final TaskRepository taskRepository;

    private final ProjectRepository projectRepository;

    private final UserRepository userRepository;

    // CREATE TASK
    public Task createTask(
            String projectId,
            TaskRequest request
    ) {

        User currentUser = getCurrentUser();

        Project project =
                projectRepository.findById(projectId)
                        .orElseThrow();

        // ONLY ADMIN
        validateProjectAdmin(project, currentUser);

        // VALIDATE USERS
        validateAssignedUsers(
                project,
                request.getAssignedTo()
        );

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .dueDate(request.getDueDate())
                .priority(request.getPriority())
                .status(Project.TaskStatus.TODO)
                .projectId(projectId)
                .assignedTo(request.getAssignedTo())
                .createdBy(currentUser.getId())
                .createdAt(LocalDateTime.now())
                .build();

        return taskRepository.save(task);
    }

    // GET TASKS
    public List<Task> getProjectTasks(
            String projectId
    ) {

        User currentUser = getCurrentUser();

        Project project =
                projectRepository.findById(projectId)
                        .orElseThrow();

        // USER MUST BELONG TO PROJECT
        if (!project.getMembers()
                .contains(currentUser.getId())) {

            throw new RuntimeException(
                    "Unauthorized"
            );
        }

        // ADMIN SEES ALL TASKS
        if (project.getAdminId()
                .equals(currentUser.getId())) {

            return taskRepository
                    .findByProjectId(projectId);
        }

        // MEMBER SEES ONLY OWN TASKS
        return taskRepository
                .findByProjectIdAndAssignedToContains(
                        projectId,
                        currentUser.getId()
                );
    }

    // ADD USERS TO TASK
    public Task addUsersToTask(
            String taskId,
            List<String> userIds
    ) {

        User currentUser = getCurrentUser();

        Task task =
                taskRepository.findById(taskId)
                        .orElseThrow();

        Project project =
                projectRepository.findById(
                        task.getProjectId()
                ).orElseThrow();

        validateProjectAdmin(project, currentUser);

        validateAssignedUsers(project, userIds);

        for (String userId : userIds) {

            if (!task.getAssignedTo()
                    .contains(userId)) {

                task.getAssignedTo().add(userId);
            }
        }

        return taskRepository.save(task);
    }

    // REMOVE USER FROM TASK
    public Task removeUserFromTask(
            String taskId,
            String userId
    ) {

        User currentUser = getCurrentUser();

        Task task =
                taskRepository.findById(taskId)
                        .orElseThrow();

        Project project =
                projectRepository.findById(
                        task.getProjectId()
                ).orElseThrow();

        validateProjectAdmin(project, currentUser);

        task.getAssignedTo().remove(userId);

        return taskRepository.save(task);
    }

    // UPDATE STATUS
    public Task updateStatus(
            String taskId,
            Project.TaskStatus status
    ) {

        User currentUser = getCurrentUser();

        Task task =
                taskRepository.findById(taskId)
                        .orElseThrow();

        Project project =
                projectRepository.findById(
                        task.getProjectId()
                ).orElseThrow();

        boolean isAdmin =
                project.getAdminId()
                        .equals(currentUser.getId());

        boolean isAssigned =
                task.getAssignedTo()
                        .contains(currentUser.getId());

        if (!isAdmin && !isAssigned) {

            throw new RuntimeException(
                    "Unauthorized"
            );
        }

        task.setStatus(status);

        return taskRepository.save(task);
    }

    // HELPERS

    private User getCurrentUser() {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        return userRepository
                .findByEmail(email)
                .orElseThrow();
    }

    private void validateProjectAdmin(
            Project project,
            User currentUser
    ) {

        if (!project.getAdminId()
                .equals(currentUser.getId())) {

            throw new RuntimeException(
                    "Only admin allowed"
            );
        }
    }

    private void validateAssignedUsers(
            Project project,
            List<String> userIds
    ) {

        for (String userId : userIds) {

            if (!project.getMembers()
                    .contains(userId)) {

                throw new RuntimeException(
                        "User not in project"
                );
            }
        }
    }
}