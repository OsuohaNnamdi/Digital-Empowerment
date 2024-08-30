package com.LASU.project.Service.Implementation;

import com.LASU.project.Entity.Lesson;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Repository.LessonRepository;
import com.LASU.project.Service.LessonService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class LessonImplementation implements LessonService {

    private final LessonRepository lessonRepository;
    private final CloudinaryService cloudinaryService;

    public LessonImplementation(LessonRepository lessonRepository, CloudinaryService cloudinaryService) {
        this.lessonRepository = lessonRepository;
        this.cloudinaryService = cloudinaryService;
    }

    @Override
    public Lesson createLesson(Lesson lesson, MultipartFile file) throws GeneralException {
        validateLesson(lesson);

        String response = cloudinaryService.uploadImage(file);
        lesson.setContent(response);
        return lessonRepository.save(lesson);
    }

    @Override
    public Lesson getLessonById(Long lessonId) throws GeneralException {
        Optional<Lesson> lesson = lessonRepository.findById(lessonId);
        if (lesson.isEmpty()) {
            throw new GeneralException("Lesson not found with ID: " + lessonId);
        }
        return lesson.get();
    }

    @Override
    public Lesson updateLesson(Lesson lesson) throws GeneralException {
        if (!lessonRepository.existsById(lesson.getId())) {
            throw new GeneralException("Lesson not found with ID: " + lesson.getId());
        }
        validateLesson(lesson);

        return lessonRepository.save(lesson);
    }

    @Override
    public void deleteLesson(Long lessonId) throws GeneralException {
        Optional<Lesson> id = lessonRepository.findById(lessonId);
        if (!lessonRepository.existsById(lessonId)) {
            throw new GeneralException("Lesson not found with ID: " + lessonId);
        }
        cloudinaryService.deleteImage(id.get().getContent());
        lessonRepository.deleteById(lessonId);
    }

    @Override
    public List<Lesson> getLessonsByCourseId(Long courseId) throws GeneralException{
        return lessonRepository.findByCourseId(courseId);
    }


    private void validateLesson(Lesson lesson) {

        if (lesson.getTitle() == null || lesson.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Lesson title cannot be empty");
        }

    }
}

