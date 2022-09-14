package com.ssafy.db.repository;

import com.ssafy.db.entity.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HashtagRepository extends JpaRepository<Hashtag, Integer> {
}