package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;
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
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false, updatable = false, columnDefinition = "BIGINT")
    private Long id;

    private Long loginCount;

    private int age;

    private boolean sex;

    private LocalDate birthday;

    private String name;

    private String email;

    private String profileImage;

    private boolean isActive;


    @JsonBackReference
    @OneToMany(mappedBy = "followUser", fetch = FetchType.LAZY)
    private List<Follow> followings = new ArrayList<>();

    @JsonBackReference
    @OneToMany(mappedBy = "followingUser", fetch = FetchType.LAZY)
    private List<Follow> followers = new ArrayList<>();

    @JsonBackReference
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Article> articles = new ArrayList<>();

    @JsonBackReference
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<FlowerLike> flowers = new ArrayList<>();

}
