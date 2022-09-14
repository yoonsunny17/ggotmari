package com.ssafy.db.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
@DynamicInsert
public class Kind {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "kind_id", nullable = false, updatable = false, columnDefinition = "BIGINT")
    private Long id;
}
