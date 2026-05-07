package com.example.backend.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "tasks")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Task {

    @Id
    private String id;

    private String title;

    private String description;

    private LocalDate dueDate;

    private Priority priority;

    private Project.TaskStatus status;

    private String projectId;

    private List<String> assignedTo;

    private String createdBy;

    private LocalDateTime createdAt;
}