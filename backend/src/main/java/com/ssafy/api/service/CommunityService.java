package com.ssafy.api.service;

import com.ssafy.api.request.ArticleCreatePostReq;
import com.ssafy.db.entity.Article;
import com.ssafy.db.entity.Hashtag;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.ArticleRepository;
import com.ssafy.db.repository.HashtagRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class CommunityService {

    @Autowired
    ArticleRepository articleRepository;
    @Autowired
    HashtagRepository hashtagRepository;
    @Autowired
    UserRepository userRepository;

    @Transactional
    public Article createArticle(Long userId, ArticleCreatePostReq articleInfo){

        User user = userRepository.findById(userId).get();

        Article article = new Article();

        article.setUser(user);
        article.setTitle(articleInfo.getTitle());
        article.setContent(articleInfo.getContent());
        article.setImage(articleInfo.getImage());

        List<Hashtag> hashtags = new ArrayList<>();

        //TODO : 해시태그 후 주석 풀기
//        for(int subjectId : articleInfo.getSubjects()){
//            Hashtag hashtag = hashtagRepository.findById(subjectId).get();
//            hashtags.add(hashtag);
//        }
        article.setHashtags(hashtags);

        articleRepository.save(article);

        return article;
    }
}
