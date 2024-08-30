package com.LASU.project.Repository;

import com.LASU.project.Entity.Quizzes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quizzes , Long> {
}
