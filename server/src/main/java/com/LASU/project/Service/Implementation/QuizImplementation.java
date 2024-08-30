package com.LASU.project.Service.Implementation;

import com.LASU.project.Entity.Question;
import com.LASU.project.Entity.Quizzes;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Repository.QuizzesRepository;
import com.LASU.project.Service.QuizzesService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class QuizImplementation implements QuizzesService {

    private final QuizzesRepository quizzesRepository;

    public QuizImplementation(QuizzesRepository quizzesRepository) {
        this.quizzesRepository = quizzesRepository;
    }



    @Override
    public Quizzes createQuiz(Quizzes quiz) throws GeneralException{
        validateQuiz(quiz);
        return quizzesRepository.save(quiz);
    }

    @Override
    public Quizzes getQuizById(Long quizId) throws GeneralException{
        Optional<Quizzes> quiz = quizzesRepository.findById(quizId);
        if (quiz.isEmpty()) {
            throw new GeneralException("Quiz not found with ID: " + quizId);
        }
        return quiz.get();
    }

    @Override
    public Quizzes updateQuiz(Quizzes quiz) throws GeneralException{
        if (!quizzesRepository.existsById(quiz.getId())) {
            throw new GeneralException("Quiz not found with ID: " + quiz.getId());
        }
        validateQuiz(quiz);
        return quizzesRepository.save(quiz);
    }

    @Override
    public void deleteQuiz(Long quizId) throws GeneralException{
        if (!quizzesRepository.existsById(quizId)) {
            throw new GeneralException("Quiz not found with ID: " + quizId);
        }
        quizzesRepository.deleteById(quizId);
    }

    @Override
    public List<Quizzes> getQuizzesByLessonId(Long lessonId) throws GeneralException {
        return quizzesRepository.findByLessonId(lessonId);
    }

    @Override
    public List<Question> shuffleQuestions(List<Question> questions) throws GeneralException{
        Random rand = new Random();
        for (int i = questions.size() - 1; i > 0; i--) {
            int index = rand.nextInt(i + 1);
            Question temp = questions.get(index);
            questions.set(index, questions.get(i));
            questions.set(i, temp);
        }
        return questions;
    }

    // Validate the quiz input
    private void validateQuiz(Quizzes quiz) {
        // Add validation logic
        if (quiz.getTitle() == null || quiz.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Quiz title cannot be empty");
        }
    }
}
