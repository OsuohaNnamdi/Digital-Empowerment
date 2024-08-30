package com.LASU.project.Controller;

import com.LASU.project.Entity.Quizzes;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Service.QuizzesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/quizzes")
public class QuizzesController {

    private final QuizzesService quizzesService;

    public QuizzesController(QuizzesService quizzesService) {
        this.quizzesService = quizzesService;
    }

    @PostMapping
    public ResponseEntity<?> createQuiz(@RequestBody Quizzes quiz) {
        try {
            Quizzes createdQuiz = quizzesService.createQuiz(quiz);
            return new ResponseEntity<>(createdQuiz, HttpStatus.CREATED);
        } catch (GeneralException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{quizId}")
    public ResponseEntity<?> getQuizById(@PathVariable Long quizId) {
        try {
            Quizzes quiz = quizzesService.getQuizById(quizId);
            return new ResponseEntity<>(quiz, HttpStatus.OK);
        } catch (GeneralException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping
    public ResponseEntity<?> updateQuiz(@RequestBody Quizzes quiz) {
        try {
            Quizzes updatedQuiz = quizzesService.updateQuiz(quiz);
            return new ResponseEntity<>(updatedQuiz, HttpStatus.OK);
        } catch (GeneralException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{quizId}")
    public ResponseEntity<?> deleteQuiz(@PathVariable Long quizId) {
        try {
            quizzesService.deleteQuiz(quizId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (GeneralException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/lesson/{lessonId}")
    public ResponseEntity<List<?>> getQuizzesByLessonId(@PathVariable Long lessonId) {
        try {
            List<Quizzes> quizzes = quizzesService.getQuizzesByLessonId(lessonId);
            return new ResponseEntity<>(quizzes, HttpStatus.OK);
        } catch (GeneralException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
