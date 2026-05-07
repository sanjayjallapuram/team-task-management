package com.example.backend.repository;

import com.example.backend.entity.Project;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProjectRepository extends MongoRepository<Project, String> {

    List<Project> findByMembersContaining(String userId);
}