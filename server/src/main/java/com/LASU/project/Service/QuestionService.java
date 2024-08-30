package com.LASU.project.Service;

import com.LASU.project.Entity.Question;
import com.LASU.project.Exception.GeneralException;

import java.util.List;

public interface QuestionService {

    Question createQuestion(Question question) throws GeneralException;

    Question getQuestionById(Long questionId) throws GeneralException;

    Question updateQuestion(Question question) throws GeneralException;

    void deleteQuestion(Long questionId) throws GeneralException;

    List<Question> getQuestionsByQuizId(Long quizId) throws GeneralException;
}
