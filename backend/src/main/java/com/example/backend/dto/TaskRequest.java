package com.example.backend.dto;

import com.example.backend.entity.Priority;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter

public class TaskRequest {

    private String title;

    private String description;

    private LocalDate dueDate;

    private Priority priority;

    private List<String> assignedTo;
}