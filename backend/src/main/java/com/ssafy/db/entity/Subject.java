package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
@DynamicInsert
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subject_id", nullable = false, updatable = false, columnDefinition = "BIGINT")
    private Long id;

    private String subjectName;

    private String flowerLanguage;

    @JsonBackReference
    @OneToMany(mappedBy = "subject", fetch = FetchType.LAZY)
    List<Kind> kinds = new ArrayList<>();

    @JsonBackReference
    @OneToMany(mappedBy = "subject", fetch = FetchType.LAZY)
    List<Sale> sales = new ArrayList<>();

    @JsonBackReference
    @OneToMany(mappedBy = "subject", fetch = FetchType.LAZY)
    List<Hashtag> articles = new ArrayList<>();
}
