package com.ssafy.api.service;

import com.ssafy.api.request.*;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Service
@Transactional(readOnly = true)
public class CommunityService {

    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private HashtagRepository hashtagRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private ArticleLikeRepository articleLikeRepository;
    @Autowired
    private PictureRepository pictureRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private FileService fileService;
    @Autowired
    private PopularRepository popularRepository;
    private final String ZSET_KEY = "popular";

    private final RedisTemplate<String, Object> redisTemplate;

    public CommunityService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Transactional
    public Article createArticle(String email, ArticleCreatePostReq articleInfo, List<MultipartFile> multipartFiles) {

        User user = userRepository.findByEmail(email);

        Article article = new Article();

        article.setUser(user);
        article.setTitle(articleInfo.getTitle());
        article.setContent(articleInfo.getContent());

        article.setDate(LocalDateTime.now());

        articleRepository.save(article);

        List<Hashtag> hashtags = new ArrayList<>();
        if(articleInfo.getSubjects().size() != 0){
            for (Long subjectId : articleInfo.getSubjects()) {
                Subject subject = subjectRepository.findById(subjectId).get();

                Hashtag hashtag = new Hashtag();
                hashtag.setArticle(article);
                hashtag.setSubject(subject);

                hashtagRepository.save(hashtag);

                hashtags.add(hashtag);
            }
            article.setHashtags(hashtags);
        }

        List<Picture> pictures = new ArrayList<>();
        for (MultipartFile image : multipartFiles) {
            Picture picture = new Picture();
            picture.setArticle(article);
            String imageUrl = fileService.uploadFile(image, "community/");
            picture.setImage(imageUrl);

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
    public Article updateArticle(String email, Long articleId, ArticleCreatePostReq articleInfo, List<MultipartFile> multipartFiles) {

        User user = userRepository.findByEmail(email);

        Article article = articleRepository.findById(articleId).get();

        if (article.getUser() != user) {
            return null;
        }

        article.setUser(user);
        article.setTitle(articleInfo.getTitle());
        article.setContent(articleInfo.getContent());

        if(multipartFiles != null){
            //이전 사진 전부 삭제
            List<Picture> pictures = article.getPictures();
            for (Picture picture : pictures) {
                pictureRepository.delete(picture);
            }

            List<Picture> newPictures = new ArrayList<>();
            for (MultipartFile image : multipartFiles) {
                Picture picture = new Picture();
                picture.setArticle(article);
                String imageUrl = fileService.uploadFile(image, "community/");
                picture.setImage(imageUrl);

                pictureRepository.save(picture);

                newPictures.add(picture);
            }
            article.setPictures(newPictures);
        }

        //이전 해시태그 전부 삭제
        List<Hashtag> hashtags = article.getHashtags();
        if(hashtags.size() != 0){
            for (Hashtag hashtag : hashtags) {
                hashtagRepository.delete(hashtag);
            }
        }

        List<Hashtag> newHashtags = new ArrayList<>();
        if(articleInfo.getSubjects().size() != 0){
            for (Long subjectId : articleInfo.getSubjects()) {
                Subject subject = subjectRepository.findById(subjectId).get();

                Hashtag hashtag = new Hashtag();
                hashtag.setArticle(article);
                hashtag.setSubject(subject);

                hashtagRepository.save(hashtag);

                newHashtags.add(hashtag);
            }
            article.setHashtags(newHashtags);
        }

        return article;
    }

    @Transactional
    public boolean deleteArticle(String email, Long articleId) {

        User user = userRepository.findByEmail(email);
        Article article = articleRepository.findById(articleId).get();

        if (article.getUser() != user) {
            return false;
        } else {

            List<Popular> populars = popularRepository.findAll();

            for(Popular popular : populars){
                if(popular.getArticle() != null && popular.getArticle().getId() == articleId){
//                    popular.setArticle(null);

                    if(popular.getPopularDate().equals(LocalDate.now())){
                        redisTemplate.opsForZSet().remove("popular", Long.toString(articleId));
                    }

                    popularRepository.delete(popular);
                }
            }



            articleRepository.delete(article);
            return true;
        }
    }

    public List<Article> getArticles() {
        return articleRepository.findAllByOrderByDateDesc();
    }

    public Article getArticle(Long articleId) {
        return articleRepository.findById(articleId).get();
    }

    public boolean checkLike(String email, Long articleId) {

        User user = userRepository.findByEmail(email);
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
    public Comment createComment(String email, Long articleId, CommentCreatePostReq commentInfo) {

        User user = userRepository.findByEmail(email);
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
    public Comment updateComment(String email, Long articleId, CommentPutReq commentInfo) {

        User user = userRepository.findByEmail(email);
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
    public boolean deleteComment(String email, CommentDelReq commentInfo) {

        User user = userRepository.findByEmail(email);
        Comment comment = commentRepository.findById(commentInfo.getCommentId()).get();

        if (comment.getUser() != user) {
            return false;
        } else {
            commentRepository.delete(comment);
            return true;
        }
    }

    @Transactional
    public boolean reverseArticleLike(String email, Long articleId, LikePostReq likeInfo) {

        User user = userRepository.findByEmail(email);
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

            articleLikeRepository.delete(articleLike);

            user.getLikes().remove(articleLike);
        }
        return true;
    }
}
