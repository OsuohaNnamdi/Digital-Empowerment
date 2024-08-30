package com.LASU.project.Service;

import com.LASU.project.Entity.Course;
import com.LASU.project.Exception.GeneralException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CourseService {


    Course createCourse(Course course) throws GeneralException;

    Course getCourseById(Long courseId) throws GeneralException;

    Course updateCourse(Course course) throws GeneralException;

    void deleteCourse(Long courseId) throws GeneralException;

    List<Course> getCoursesByCategory(String category) throws GeneralException;
}
