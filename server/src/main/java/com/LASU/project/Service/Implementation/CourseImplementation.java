package com.LASU.project.Service.Implementation;

import com.LASU.project.Entity.Course;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Repository.CourseRepository;
import com.LASU.project.Service.CourseService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class CourseImplementation implements CourseService {

    private final CourseRepository applicationRepository;

    public CourseImplementation(CourseRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }



    @Override
    public void saveCourse(Course course) throws GeneralException {

        applicationRepository.save(course);

    }

    @Override
    public Course findById(Long id) throws GeneralException {

       return applicationRepository.findById(id)
               .orElseThrow(()-> new GeneralException("Course Not Found"));
    }
    @Override
    public void deleteById(Long id) throws GeneralException {

        applicationRepository.deleteById(id);
    }

    @Override
    public List<Course> findAllCourse() throws GeneralException {
        return applicationRepository.findAll();

    }

}
