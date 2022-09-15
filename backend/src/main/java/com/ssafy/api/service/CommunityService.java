package com.ssafy.api.service;

import com.ssafy.api.request.*;
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
    @Autowired
    PictureRepository pictureRepository;
    @Autowired
    CommentRepository commentRepository;

    @Transactional
    public Article createArticle(Long userId, ArticleCreatePostReq articleInfo) {

        User user = userRepository.findById(userId).get();

        Article article = new Article();

        article.setUser(user);
        article.setTitle(articleInfo.getTitle());
        article.setContent(articleInfo.getContent());


        article.setDate(LocalDateTime.now());

        articleRepository.save(article);

        List<Hashtag> hashtags = new ArrayList<>();
        for (Long subjectId : articleInfo.getSubjects()) {
            Subject subject = subjectRepository.findById(subjectId).get();

            Hashtag hashtag = new Hashtag();
            hashtag.setArticle(article);
            hashtag.setSubject(subject);

            hashtagRepository.save(hashtag);

            hashtags.add(hashtag);
        }
        article.setHashtags(hashtags);

        //TODO : S3 연결 후, uuid 파일명 변경 필요
        List<Picture> pictures = new ArrayList<>();
        for (String image : articleInfo.getImages()) {
            Picture picture = new Picture();
            picture.setArticle(article);
            picture.setImage(image);

            pictureRepository.save(picture);

            pictures.add(picture);
        }
        article.setPictures(pictures);

        return article;
    }

    public List<Subject> getSubjects() {
        return subjectRepository.findAll();
    }

    @Transactional
    public Article updateArticle(Long userId, Long articleId, ArticleCreatePostReq articleInfo) {

        User user = userRepository.findById(userId).get();

        Article article = articleRepository.findById(articleId).get();

        if (article.getUser() != user) {
            return null;
        }

        article.setUser(user);
        article.setTitle(articleInfo.getTitle());
        article.setContent(articleInfo.getContent());

        //이전 사진 전부 삭제
        List<Picture> pictures = article.getPictures();
        for (Picture picture : pictures) {
            pictureRepository.delete(picture);
        }

        List<Picture> newPictures = new ArrayList<>();
        for (String image : articleInfo.getImages()) {
            Picture picture = new Picture();
            picture.setArticle(article);
            picture.setImage(image);

            pictureRepository.save(picture);

            newPictures.add(picture);
        }
        article.setPictures(newPictures);

        //이전 해시태그 전부 삭제
        List<Hashtag> hashtags = article.getHashtags();
        for (Hashtag hashtag : hashtags) {
            hashtagRepository.delete(hashtag);
        }

        List<Hashtag> newHashtags = new ArrayList<>();

        for (Long subjectId : articleInfo.getSubjects()) {
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
    public boolean deleteArticle(Long userId, Long articleId) {

        User user = userRepository.findById(userId).get();
        Article article = articleRepository.findById(articleId).get();

        if (article.getUser() != user) {
            return false;
        } else {
            articleRepository.delete(article);
            return true;
        }
    }

    public List<Article> getArticles() {
        return articleRepository.findAll();
    }

    public Article getArticle(Long articleId) {
        return articleRepository.findById(articleId).get();
    }

    public boolean checkLike(Long userId, Long articleId) {

        User user = userRepository.findById(userId).get();
        Article article = articleRepository.findById(articleId).get();

        List<ArticleLike> likes = article.getLikes();
        ArticleLike like = articleLikeRepository.findArticleLikeByArticleAndUser(article, user);
        if (likes.contains(like)) {
            return true;
        } else {
            return false;
        }
    }

    @Transactional
    public Comment createComment(Long userId, Long articleId, CommentCreatePostReq commentInfo) {

        User user = userRepository.findById(userId).get();
        Article article = articleRepository.findById(articleId).get();

        Comment comment = new Comment();
        comment.setArticle(article);
        comment.setDate(LocalDateTime.now());
        comment.setUser(user);
        comment.setContent(commentInfo.getCommentContent());

        commentRepository.save(comment);

        article.getComments().add(comment);

        return comment;
    }

    @Transactional
    public Comment updateComment(Long userId, Long articleId, CommentPutReq commentInfo) {

        User user = userRepository.findById(userId).get();
        Article article = articleRepository.findById(articleId).get();

        Comment comment = commentRepository.findById(commentInfo.getCommentId()).get();

        if (comment.getUser() == user && comment.getArticle() == article) {
            comment.setDate(LocalDateTime.now());
            comment.setContent(commentInfo.getCommentContent());
        } else {
            comment = null;
        }

        return comment;
    }

    @Transactional
    public boolean deleteComment(Long userId, CommentDelReq commentInfo) {

        User user = userRepository.findById(userId).get();
        Comment comment = commentRepository.findById(commentInfo.getCommentId()).get();

        if (comment.getUser() != user) {
            return false;
        } else {
            commentRepository.delete(comment);
            return true;
        }
    }

    @Transactional
    public boolean reverseArticleLike(Long userId, Long articleId, LikePostReq likeInfo) {

        User user = userRepository.findById(userId).get();
        Article article = articleRepository.findById(articleId).get();

        if (likeInfo.isLike()) {

            if(articleLikeRepository.findArticleLikeByArticleAndUser(article, user) != null){
                return false;
            }

            ArticleLike articleLike = new ArticleLike();
            articleLike.setArticle(article);
            articleLike.setUser(user);

            articleLikeRepository.save(articleLike);

            user.getLikes().add(articleLike);
            article.getLikes().add(articleLike);

        } else {
            ArticleLike articleLike = articleLikeRepository.findArticleLikeByArticleAndUser(article, user);

            if (articleLike == null) {
                return false;
            }

            System.out.println("==============" + articleLike.getId());

            articleLikeRepository.delete(articleLike);
        }
        return true;
    }
}
