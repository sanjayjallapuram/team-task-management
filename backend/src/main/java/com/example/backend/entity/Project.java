package com.example.backend.entity;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Project {

    @Id
    private String id;

    private String name;

    private String description;

    private String adminId;

    private List<String> members;

    private String createdBy;

    private LocalDateTime createdAt;

    public enum TaskStatus {

        TODO,

        IN_PROGRESS,

        DONE
    }
}