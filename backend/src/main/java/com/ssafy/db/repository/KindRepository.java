package com.ssafy.db.repository;

import com.ssafy.db.entity.Kind;
import com.ssafy.db.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KindRepository extends JpaRepository<Kind, Long> {

    List<Kind> findAllByKindNameContains(String searchText);

    List<Kind> findAllBySubject(Subject subject);
}
