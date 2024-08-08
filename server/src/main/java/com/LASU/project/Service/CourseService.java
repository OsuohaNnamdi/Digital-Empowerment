package com.LASU.project.Service;

import com.LASU.project.Entity.Course;
import com.LASU.project.Exception.GeneralException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CourseService {

    Course findById(Long id) throws GeneralException;

    void saveCourse(Course course) throws IOException;

    void deleteById (Long id) throws GeneralException;

    List<Course> findAllCourse() throws GeneralException;
}
