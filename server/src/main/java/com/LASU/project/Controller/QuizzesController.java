package com.LASU.project.Controller;

import com.LASU.project.Entity.Quizzes;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Service.QuizzesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
public class QuizzesController {

    private final QuizzesService quizzesService;

    @Autowired
    public QuizzesController(QuizzesService quizzesService) {
        this.quizzesService = quizzesService;
    }

    @PostMapping
    public ResponseEntity<Void> createQuiz(@RequestBody Quizzes quiz) {
        try {
            quizzesService.saveQuizzes(quiz);
            return ResponseEntity.ok().build();
        } catch (GeneralException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateQuiz(@PathVariable Long id, @RequestBody Quizzes quiz) {
        try {
            quizzesService.updateQuizzes(id, quiz);
            return ResponseEntity.ok().build();
        } catch (GeneralException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Quizzes>> getAllQuizzes() {
        try {
            return ResponseEntity.ok(quizzesService.findAllQuizzes());
        } catch (GeneralException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quizzes> getQuizById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(quizzesService.findQuizzesById(id));
        } catch (GeneralException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long id) {
        try {
            quizzesService.deleteQuizzes(id);
            return ResponseEntity.ok().build();
        } catch (GeneralException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Quizzes>> searchQuizzes(@RequestParam String keyword) {
        // Assuming you have a search method in your quizzes service
        try {
            List<Quizzes> quizzes = quizzesService.searchQuizzes(keyword);
            return ResponseEntity.ok(quizzes);
        } catch (GeneralException e) {
            return ResponseEntity.status(500).build();
        }
    }
}
