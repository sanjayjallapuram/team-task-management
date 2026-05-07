package com.example.backend.service;

import com.example.backend.dto.DashboardResponse;
import com.example.backend.entity.Project;
import com.example.backend.entity.Task;
import com.example.backend.entity.User;
import com.example.backend.repository.ProjectRepository;
import com.example.backend.repository.TaskRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor

public class DashboardService {

    private final TaskRepository taskRepository;

    private final UserRepository userRepository;

    private final ProjectRepository projectRepository;

    public DashboardResponse getDashboardData() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User currentUser = userRepository
                .findByEmail(email)
                .orElseThrow();

        List<Task> tasks;

        // ADMIN → ALL PROJECT TASKS
        if (currentUser.getSystemRole().name().equals("ADMIN")) {

            List<Project> projects = projectRepository
                    .findByMembersContaining(currentUser.getId());

            List<String> projectIds = projects
                    .stream()
                    .map(Project::getId)
                    .toList();

            tasks = taskRepository.findAll()
                    .stream()
                    .filter(task ->
                            projectIds.contains(task.getProjectId()))
                    .toList();

        } else {

            // MEMBER → ONLY ASSIGNED TASKS
            tasks = taskRepository.findAll()
                    .stream()
                    .filter(task ->
                            task.getAssignedTo()
                                    .contains(currentUser.getId()))
                    .toList();
        }

        long totalTasks = tasks.size();

        long overdueTasks = tasks.stream()
                .filter(task ->
                        task.getDueDate() != null
                                && task.getDueDate().isBefore(LocalDate.now())
                                && task.getStatus() != Project.TaskStatus.DONE
                )
                .count();

        Map<String, Long> tasksByStatus = new HashMap<>();

        tasksByStatus.put(
                "TODO",
                tasks.stream()
                        .filter(task ->
                                task.getStatus() == Project.TaskStatus.TODO)
                        .count()
        );

        tasksByStatus.put(
                "IN_PROGRESS",
                tasks.stream()
                        .filter(task ->
                                task.getStatus() == Project.TaskStatus.IN_PROGRESS)
                        .count()
        );

        tasksByStatus.put(
                "DONE",
                tasks.stream()
                        .filter(task ->
                                task.getStatus() == Project.TaskStatus.DONE)
                        .count()
        );

        Map<String, Long> tasksPerUser = new HashMap<>();

        for (Task task : tasks) {

            for (String userId : task.getAssignedTo()) {

                User user = userRepository
                        .findById(userId)
                        .orElse(null);

                if (user != null) {

                    tasksPerUser.put(
                            user.getName(),
                            tasksPerUser.getOrDefault(
                                    user.getName(),
                                    0L
                            ) + 1
                    );
                }
            }
        }

        return DashboardResponse.builder()
                .totalTasks(totalTasks)
                .overdueTasks(overdueTasks)
                .tasksByStatus(tasksByStatus)
                .tasksPerUser(tasksPerUser)
                .build();
    }
}

