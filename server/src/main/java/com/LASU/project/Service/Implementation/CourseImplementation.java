package com.LASU.project.Service.Implementation;

import com.LASU.project.Entity.Course;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Repository.CourseRepository;
import com.LASU.project.Service.CourseService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseImplementation implements CourseService {

    private final CourseRepository courseRepository;

    public CourseImplementation(CourseRepository applicationRepository) {
        this.courseRepository = applicationRepository;
    }



    @Override
    public Course createCourse(Course course) throws GeneralException {
        validateCourse(course);
        return courseRepository.save(course);
    }


    @Override
    public Course getCourseById(Long courseId) throws GeneralException {
        Optional<Course> course = courseRepository.findById(courseId);
        if (course.isEmpty()) {
            throw new GeneralException("Course not found with ID: " + courseId);
        }
        return course.get();
    }


    @Override
    public Course updateCourse(Course course) throws GeneralException{
        if (!courseRepository.existsById(course.getId())) {
            throw new GeneralException("Course not found with ID: " + course.getId());
        }
        validateCourse(course);
        return courseRepository.save(course);
    }

    @Override
    public void deleteCourse(Long courseId) throws GeneralException{
        if (!courseRepository.existsById(courseId)) {
            throw new GeneralException("Course not found with ID: " + courseId);
        }
        courseRepository.deleteById(courseId);
    }

    @Override
    public List<Course> getCoursesByCategory(String category) throws GeneralException {
        return courseRepository.findByCategory(category);
    }


    private void validateCourse(Course course) {

        if (course.getTitle() == null || course.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Course title cannot be empty");
        }
    }

}
