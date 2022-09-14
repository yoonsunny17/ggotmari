package com.ssafy.db.repository;

import com.ssafy.db.entity.Article;
import com.ssafy.db.entity.ArticleLike;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleLikeRepository extends JpaRepository<ArticleLike, Long> {

    ArticleLike findArticleLikeByArticleAndUser(Article article, User user);
}
