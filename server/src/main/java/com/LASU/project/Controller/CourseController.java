package com.LASU.project.Controller;

import com.LASU.project.Entity.Course;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping
    public ResponseEntity<Void> createCourse(@RequestBody Course course) {
        try {
            courseService.saveCourse(course);
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        try {
            return ResponseEntity.ok(courseService.findAllCourse());
        } catch (GeneralException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(courseService.findById(id));
        } catch (GeneralException e) {
            return ResponseEntity.status(404).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        try {
            courseService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (GeneralException e) {
            return ResponseEntity.status(500).build();
        }
    }
}
