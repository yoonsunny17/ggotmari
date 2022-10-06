package com.ssafy.db.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
@DynamicInsert
public class DailyFlower {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "daily_flower_id", nullable = false, updatable = false, columnDefinition = "BIGINT")
    private Long id;

    @Column(nullable = false)
    private String flowerDate;

    @Column(nullable = false)
    private String flowerName;

    @Column(nullable = false)
    private String flowerLanguage;

    @Column(nullable = false)
    private String flowerContent;

    @Column(nullable = false)
    private String flowerImage;
}
