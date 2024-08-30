package com.LASU.project.Service.Implementation;

import com.LASU.project.Entity.Question;
import com.LASU.project.Exception.GeneralException;
import com.LASU.project.Repository.QuestionRepository;
import com.LASU.project.Service.QuestionService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class QuestionImplementation implements QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionImplementation(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Override
    public Question createQuestion(Question question) throws GeneralException{
        validateQuestion(question);
        return questionRepository.save(question);
    }

    @Override
    public Question getQuestionById(Long questionId) throws GeneralException{
        Optional<Question> question = questionRepository.findById(questionId);
        if (question.isEmpty()) {
            throw new GeneralException("Question not found with ID: " + questionId);
        }
        return question.get();
    }

    @Override
    public Question updateQuestion(Question question) throws GeneralException{
        if (!questionRepository.existsById(question.getId())) {
            throw new GeneralException("Question not found with ID: " + question.getId());
        }
        validateQuestion(question);
        return questionRepository.save(question);
    }

    @Override
    public void deleteQuestion(Long questionId) throws GeneralException{
        if (!questionRepository.existsById(questionId)) {
            throw new GeneralException("Question not found with ID: " + questionId);
        }
        questionRepository.deleteById(questionId);
    }

    @Override
    public List<Question> getQuestionsByQuizId(Long quizId) throws GeneralException {
        return questionRepository.findByQuizId(quizId);
    }


    private void validateQuestion(Question question) {
        // Add validation logic
        if (question.getText() == null || question.getText().isEmpty()) {
            throw new IllegalArgumentException("Question text cannot be empty");
        }
        if (question.getOptions() == null || question.getOptions().isEmpty()) {
            throw new IllegalArgumentException("Question options cannot be empty");
        }
        if (question.getAnswer() == null || question.getAnswer().isEmpty()) {
            throw new IllegalArgumentException("Question answer cannot be empty");
        }
    }
}