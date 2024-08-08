package com.LASU.project.Service.Implementation;

import com.LASU.project.Entity.Quizzes;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Repository.QuizzesRepository;
import com.LASU.project.Service.QuizzesService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizImplementation implements QuizzesService {

    private final QuizzesRepository quizzesRepository;

    public QuizImplementation(QuizzesRepository quizzesRepository) {
        this.quizzesRepository = quizzesRepository;
    }

    @Override
    public void saveQuizzes(Quizzes request) throws GeneralException {
        Quizzes quizzes = new Quizzes();
        quizzes.setQuestionText(request.getQuestionText());
        quizzes.setOptions(request.getOptions());
        quizzes.setModule(request.getModule());
        quizzes.setCorrectAnswer(request.getCorrectAnswer());
        quizzesRepository.save(quizzes);
    }

    @Override
    public void updateQuizzes(Long id, Quizzes request) throws GeneralException {
        Quizzes quizzes = quizzesRepository.findById(id).orElseThrow(
                () -> new GeneralException("Quiz with id " + id + " is not present"));
        quizzes.setQuestionText(request.getQuestionText());
        quizzes.setOptions(request.getOptions());
        quizzes.setModule(request.getModule());
        quizzes.setCorrectAnswer(request.getCorrectAnswer());
        quizzesRepository.save(quizzes);
    }

    @Override
    public List<Quizzes> findAllQuizzes() throws GeneralException {
        try {
            return quizzesRepository.findAll();
        } catch (Exception e) {
            throw new GeneralException("Error in fetching file" + e);
        }
    }

    @Override
    public Quizzes findQuizzesById(Long id) throws GeneralException {
        return quizzesRepository.findById(id).orElseThrow(() ->
                new GeneralException("Quiz with id " + id + " is not present"));
    }

    @Override
    public void deleteQuizzes(Long id) throws GeneralException {
        quizzesRepository.deleteById(id);
    }

    @Override
    public List<Quizzes> searchQuizzes(String keyword) throws GeneralException {
        try {
            return null; //quizzesRepository.findByQuestionTextContaining(keyword);
        } catch (Exception e) {
            throw new GeneralException("Error in searching quizzes: " + e);
        }
    }
}
