package com.LASU.project.Entity;


import jakarta.persistence.*;

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

    private String questionText;
    private String options;  // JSON formatted options
    private String correctAnswer;

    @ManyToOne
    @JoinColumn(name = "module_id")
    private Module module;



    public Quizzes() {
    }

    public Quizzes(Long id, String questionText, String options, String correctAnswer, Module module) {
        this.id = id;
        this.questionText = questionText;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.module = module;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getOptions() {
        return options;
    }

    public void setOptions(String options) {
        this.options = options;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }
}