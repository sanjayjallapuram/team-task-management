package com.example.backend.dto;

import lombok.*;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class DashboardResponse {

    private long totalTasks;

    private long overdueTasks;

    private Map<String, Long> tasksByStatus;

    private Map<String, Long> tasksPerUser;
}