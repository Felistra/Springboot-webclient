package com.assignment2.book;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name="Book")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column
    private String title;
    @Column
    private String description;
    @Column
    private int yearPublished;
    @Column
    private String author;
    @Column
    private String category;
}