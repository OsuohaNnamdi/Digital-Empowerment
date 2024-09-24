package com.LASU.project.Controller;

import com.LASU.project.Entity.Lesson;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Service.LessonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/lessons")
public class LessonController {

    private final LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @PostMapping
    public ResponseEntity<?> createLesson(@RequestBody Lesson lesson) {
        try {
            lessonService.createLesson(lesson);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (GeneralException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }



    @GetMapping("/{lessonId}")
    public ResponseEntity<?> getLessonById(@PathVariable Long lessonId) {
        try {
            Lesson lesson = lessonService.getLessonById(lessonId);
            return new ResponseEntity<>(lesson, HttpStatus.OK);
        } catch (GeneralException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping
    public ResponseEntity<?> updateLesson(@RequestBody Lesson lesson) {
        try {
            Lesson updatedLesson = lessonService.updateLesson(lesson);
            return new ResponseEntity<>(updatedLesson, HttpStatus.OK);
        } catch (GeneralException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{lessonId}")
    public ResponseEntity<?> deleteLesson(@PathVariable Long lessonId) {
        try {
            lessonService.deleteLesson(lessonId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (GeneralException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/courses/{courseId}")
    public ResponseEntity<List<?>> getLessonsByCourseId(@PathVariable Long courseId) {
        try {
            List<Lesson> lessons = lessonService.getLessonsByCourseId(courseId);
            return new ResponseEntity<>(lessons, HttpStatus.OK);
        } catch (GeneralException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}


