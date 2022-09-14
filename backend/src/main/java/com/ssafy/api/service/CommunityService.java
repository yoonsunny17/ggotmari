package com.ssafy.api.service;

import com.ssafy.api.request.ArticleCreatePostReq;
import com.ssafy.api.response.SubjectRes;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
    @Autowired
    SubjectRepository subjectRepository;
    @Autowired
    ArticleLikeRepository articleLikeRepository;

    @Transactional
    public Article createArticle(Long userId, ArticleCreatePostReq articleInfo){

        User user = userRepository.findById(userId).get();

        Article article = new Article();

        article.setUser(user);
        article.setTitle(articleInfo.getTitle());
        article.setContent(articleInfo.getContent());
        article.setImage(articleInfo.getImage());
        article.setDate(LocalDateTime.now());

        articleRepository.save(article);

        List<Hashtag> hashtags = new ArrayList<>();
        for(Long subjectId : articleInfo.getSubjects()){
            Subject subject = subjectRepository.findById(subjectId).get();

            Hashtag hashtag = new Hashtag();
            hashtag.setArticle(article);
            hashtag.setSubject(subject);

            hashtagRepository.save(hashtag);

            hashtags.add(hashtag);
        }
        article.setHashtags(hashtags);

        return article;
    }

    public List<Subject> getSubjects(){
        return subjectRepository.findAll();
    }

    @Transactional
    public Article updateArticle(Long userId, Long articleId, ArticleCreatePostReq articleInfo){

        User user = userRepository.findById(userId).get();

        Article article = articleRepository.findById(articleId).get();

        if(article.getUser() != user){
            return null;
        }

        article.setUser(user);
        article.setTitle(articleInfo.getTitle());
        article.setContent(articleInfo.getContent());
        article.setImage(articleInfo.getImage());

        //이전 해시태그 전부 삭제
        List<Hashtag> hashtags = article.getHashtags();
        for(Hashtag hashtag : hashtags){
            hashtagRepository.delete(hashtag);
        }

        List<Hashtag> newHashtags = new ArrayList<>();

        for(Long subjectId : articleInfo.getSubjects()){
            Subject subject = subjectRepository.findById(subjectId).get();

            Hashtag hashtag = new Hashtag();
            hashtag.setArticle(article);
            hashtag.setSubject(subject);

            hashtagRepository.save(hashtag);

            newHashtags.add(hashtag);
        }
        article.setHashtags(newHashtags);

        return article;
    }

    @Transactional
    public boolean deleteArticle(Long userId, Long articleId){

        User user = userRepository.findById(userId).get();
        Article article = articleRepository.findById(articleId).get();

        if(article.getUser() != user){
            return false;
        }else{
            articleRepository.delete(article);
            return true;
        }
    }

    public List<Article> getArticles(){
        return articleRepository.findAll();
    }

    public Article getArticle(Long articleId){
        return articleRepository.findById(articleId).get();
    }

    public boolean checkLike(Long userId, Long articleId){

        User user = userRepository.findById(userId).get();
        Article article = articleRepository.findById(articleId).get();

        List<ArticleLike> likes = article.getLikes();
        ArticleLike like = articleLikeRepository.findArticleLikeByArticleAndUser(article, user);
        if(likes.contains(like)){
            return true;
        }else{
            return false;
        }
    }
}
