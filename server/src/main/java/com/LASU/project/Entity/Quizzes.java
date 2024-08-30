package com.LASU.project.Entity;


import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "quizzes")
public class Quizzes {
    @Id
    @SequenceGenerator(
            name = "quizzes_sequence",
            sequenceName = "quizzes_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "quizzes_sequence")
    private Long id;
    private Long lessonId;
    private String title;
    private List<Question> question;

    public Quizzes(Long id, Long lessonId, String title, List<Question> question) {
        this.id = id;
        this.lessonId = lessonId;
        this.title = title;
        this.question = question;
    }

    public Quizzes() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getLessonId() {
        return lessonId;
    }

    public void setLessonId(Long lessonId) {
        this.lessonId = lessonId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Question> getQuestion() {
        return question;
    }

    public void setQuestion(List<Question> question) {
        this.question = question;
    }
}