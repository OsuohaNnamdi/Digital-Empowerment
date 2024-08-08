package com.LASU.project.Repository;

import com.LASU.project.Entity.Quizzes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizzesRepository extends JpaRepository<Quizzes, Long>
 {

 // List<Quizzes> findByQuestionTextContaining(String questionText);
}
