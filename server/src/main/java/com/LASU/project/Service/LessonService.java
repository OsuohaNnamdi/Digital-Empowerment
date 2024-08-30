package com.LASU.project.Service;

import com.LASU.project.Entity.Lesson;
import com.LASU.project.Exception.GeneralException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface LessonService {


    Lesson createLesson(Lesson lesson, MultipartFile file) throws GeneralException;

    Lesson getLessonById(Long lessonId) throws GeneralException;

    Lesson updateLesson(Lesson lesson) throws GeneralException;

    void deleteLesson(Long lessonId) throws GeneralException;

    List<Lesson> getLessonsByCourseId(Long courseId) throws GeneralException;
}
