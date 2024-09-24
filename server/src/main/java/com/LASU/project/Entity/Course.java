package com.LASU.project.Entity;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @SequenceGenerator(
            name = "courses_sequence",
            sequenceName = "courses_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "courses_sequence")
    private Long id;

    private String title;
    private String category;
    private String description;
    private String imageUrl;


    public Course(Long id, String title, String category, String description, String imageUrl) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public Course() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}