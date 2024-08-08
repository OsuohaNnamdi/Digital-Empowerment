package com.LASU.project.Service;



import com.LASU.project.Entity.Quizzes;
import com.LASU.project.Exception.GeneralException;

import java.util.List;

public interface QuizzesService {

    void saveQuizzes(Quizzes quizzes) throws GeneralException;

    void updateQuizzes(Long id, Quizzes updatedquizzes) throws GeneralException;

    List<Quizzes> findAllQuizzes()  throws GeneralException;

    Quizzes findQuizzesById(Long id) throws GeneralException;

    List<Quizzes> searchQuizzes(String keyword) throws GeneralException;

    void deleteQuizzes(Long id) throws GeneralException;
}
