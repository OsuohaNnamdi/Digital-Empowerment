package com.LASU.project.Entity;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "module")
public class Module {

    @Id
    @SequenceGenerator(
            name = "module_sequence",
            sequenceName = "module_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "module_sequence")
    private Long id;

    private String title;
    private String description;
    private String content;

    private String link;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Quizzes> quiz;

    public Module()     {
    }

    public Module(String title, String description, String content, String link, Course course, Set<Quizzes> quiz) {
        this.title = title;
        this.description = description;
        this.content = content;
        this.link = link;
        this.course = course;
        this.quiz = quiz;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Set<Quizzes> getQuiz() {
        return quiz;
    }

    public void setQuiz(Set<Quizzes> quiz) {
        this.quiz = quiz;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
