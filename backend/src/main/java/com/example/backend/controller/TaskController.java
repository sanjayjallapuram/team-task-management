package com.example.backend.controller;

import com.example.backend.dto.TaskRequest;
import com.example.backend.entity.Project;
import com.example.backend.entity.Task;
import com.example.backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin("*")

public class TaskController {

    private final TaskService taskService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/{projectId}")
    public Task createTask(@PathVariable String projectId, @RequestBody TaskRequest request) {
        return taskService.createTask(projectId, request);
    }

    @GetMapping("/{projectId}")
    public List<Task> getTasks(@PathVariable String projectId) {
        return taskService.getProjectTasks(projectId);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{taskId}/add-users")
    public Task addUsers(@PathVariable String taskId, @RequestBody List<String> userIds) {
        return taskService.addUsersToTask(taskId,userIds);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{taskId}/remove-user/{userId}")
    public Task removeUser(@PathVariable String taskId, @PathVariable String userId) {
        return taskService.removeUserFromTask(taskId,userId);
    }

    @PutMapping("/{taskId}/status")
    public Task updateStatus(@PathVariable String taskId, @RequestParam Project.TaskStatus status) {
        return taskService.updateStatus(taskId, status);
    }
}