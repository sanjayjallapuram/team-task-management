package com.example.backend.repository;
import com.example.backend.entity.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TaskRepository extends MongoRepository<Task, String> {

    List<Task> findByProjectId(String projectId);

    List<Task> findByProjectIdAndAssignedToContains(
            String projectId,
            String userId
    );
}