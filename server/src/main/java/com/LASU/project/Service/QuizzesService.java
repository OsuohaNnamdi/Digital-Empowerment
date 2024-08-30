package com.LASU.project.Service;



import com.LASU.project.Entity.Question;
import com.LASU.project.Entity.Quizzes;
import com.LASU.project.Exception.GeneralException;

import java.util.List;

public interface QuizzesService {

    Quizzes createQuiz(Quizzes quiz) throws GeneralException;

    Quizzes getQuizById(Long quizId) throws GeneralException;

    Quizzes updateQuiz(Quizzes quiz) throws GeneralException;

    void deleteQuiz(Long quizId) throws GeneralException;

    List<Quizzes> getQuizzesByLessonId(Long lessonId) throws GeneralException;

    List<Question> shuffleQuestions(List<Question> questions) throws GeneralException;
}
