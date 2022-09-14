package com.ssafy.db.repository;

import com.ssafy.db.entity.Article;
import com.ssafy.db.entity.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HashtagRepository extends JpaRepository<Hashtag, Long> {

//    List<Hashtag> findHashtagByArticle(Article article);
}