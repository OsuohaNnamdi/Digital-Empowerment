package com.LASU.project.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "lessons")
public class Lesson {

    @Id
    @SequenceGenerator(
            name = "lessons_sequence",
            sequenceName = "lessons_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "lessons_sequence")
    private Long id;
    private Long courseId;
    private String title;
    private String content;
    private String videoUrl;

    public Lesson(Long id, Long courseId, String title, String content, String videoUrl) {
        this.id = id;
        this.courseId = courseId;
        this.title = title;
        this.content = content;
        this.videoUrl = videoUrl;
    }

    public Lesson() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
}
