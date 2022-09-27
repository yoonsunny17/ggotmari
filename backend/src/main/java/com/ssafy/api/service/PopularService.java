package com.ssafy.api.service;

import com.ssafy.db.entity.Article;
import com.ssafy.db.entity.Popular;
import com.ssafy.db.repository.ArticleRepository;
import com.ssafy.db.repository.PopularRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Service
@Transactional(readOnly = true)
public class PopularService {

    @Autowired
    private PopularRepository popularRepository;
    @Autowired
    private ArticleRepository articleRepository;

    private final String ZSET_KEY = "popular";

    private final RedisTemplate<String, Object> redisTemplate;

    public PopularService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public List<Article> getPopularArticles() {

        List<Article> articles = new ArrayList<>();

        //레디스에서 데이터 가져오기
        Set<ZSetOperations.TypedTuple<Object>> redisArticles = redisTemplate.opsForZSet().reverseRangeWithScores(ZSET_KEY, 0 ,-1);

        for(ZSetOperations.TypedTuple<Object> redisArticle : redisArticles){
            String value = (String) redisArticle.getValue();
            Article article = articleRepository.findById(Long.parseLong(value)).get();

            articles.add(article);
        }

        return articles;
    }

    //초 분 시 월 일 요일 -> 매일 0시 0분 0초에 실행
    @Scheduled(cron = "0 0 0 * * *")
    @Transactional
    public void updatePopularArticles(){

        //이전 레디스에 있는 데이터 삭제
        if(redisTemplate.hasKey("popular")) {
            Set<ZSetOperations.TypedTuple<Object>> redisArticles = redisTemplate.opsForZSet().reverseRangeWithScores(ZSET_KEY, 0 ,-1);

            for(ZSetOperations.TypedTuple<Object> redisArticle : redisArticles){
                String value = (String) redisArticle.getValue();

                redisTemplate.opsForZSet().remove("popular", value);
            }
        }

        LocalDateTime start = LocalDateTime.now().minusDays(7);
        LocalDateTime end = LocalDateTime.now();
        List<Article> articles = articleRepository.findTop10AllByDateBetweenOrderByLikesDesc(start, end);

//        Collections.sort(articles, (o1, o2) -> o2.getLikes().size() - o1.getLikes().size());

        //인기글 선정된 데이터 로그 찍기기 + 레디스에 데이터 넣기
        for(Article article : articles){
            Popular popular = new Popular();
            popular.setPopularDate(LocalDate.now());
            popular.setArticle(article);

            popularRepository.save(popular);

            redisTemplate.opsForZSet().add(ZSET_KEY, Long.toString(article.getId()), article.getLikes().size());
        }

    }

}
