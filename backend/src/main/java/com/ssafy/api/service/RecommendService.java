package com.ssafy.api.service;

import com.ssafy.api.request.DislikePostReq;
import com.ssafy.api.request.LetterPostReq;
import com.ssafy.api.request.RecommendLikeReq;
import com.ssafy.api.request.RecommendTagReq;
import com.ssafy.api.response.Recommend.KindRes;
import com.ssafy.api.response.Recommend.RecommendResultRes;
import com.ssafy.api.response.Recommend.RecommendResultsRes;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class RecommendService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    KindRepository kindRepository;
    @Autowired
    TagRepository tagRepository;
    @Autowired
    FlowerDislikeRepository flowerDislikeRepository;
    @Autowired
    SubjectRepository subjectRepository;
    @Autowired
    LetterRepository letterRepository;
    @Autowired
    ArticleRepository articleRepository;

    @Value("${django.redirect.uri}")
    private String DJANGO_REDIRECT_URI;

    @Transactional
    public boolean addDislike(String email, DislikePostReq dislikeInfo){

        User user = userRepository.findByEmail(email);

        FlowerDislike dislike = new FlowerDislike();

        dislike.setKind(kindRepository.findById(dislikeInfo.getKindId()).get());
        dislike.setUser(user);

        flowerDislikeRepository.save(dislike);

        return true;
    }

    public List<KindRes> recommendBySituation(String email, Long tagId){

        User user = userRepository.findByEmail(email);

        List<FlowerLike> flowerLikes = user.getFlowers();
        int cnt = 0;
        for(FlowerLike flowerLike : flowerLikes){
            if(flowerLike.getTag().getId() == tagId){
                cnt++;
            }
        }

        if(cnt < 10){
            return null;
        }

        List<Long> kindIds = connectSituation(user.getId(), tagId).getResult();

        List<KindRes> flowers = new ArrayList<>();
        for(Long id : kindIds){
            KindRes kindRes = new KindRes();
            Kind kind = kindRepository.findById(id).get();
            kindRes.setKindId(id);
            kindRes.setKindImage("https://ggotmari.s3.ap-northeast-2.amazonaws.com/" + kind.getFlowerImage());
            kindRes.setSubjectId(kind.getSubject().getId());

            flowers.add(kindRes);
        }

        if(flowers.size()%9 != 0){
            int left = 9 - flowers.size()%9;
            for(int j=0; j<left; j++){
                KindRes kindRes = new KindRes();
                kindRes.setKindId(0L);
                kindRes.setKindImage("https://ggotmari.s3.ap-northeast-2.amazonaws.com/kind/default.jpg");
                kindRes.setSubjectId(0L);

                flowers.add(kindRes);
            }
        }

        return flowers;
    }

    public List<Article> recommendByLike(String email){

        User user = userRepository.findByEmail(email);

        if(user.getLikes().size() < 5){
            return null;
        }

        List<Long> articleIds = connectArticle(user.getId()).getResult();

        List<Article> articles = new ArrayList<>();
        for(Long articleId : articleIds){
            articles.add(articleRepository.findById(articleId).get());
        }

        return articles;
    }

    @Transactional
    public Subject recommendByLetter(LetterPostReq letterInfo){
        Long subjectId = connectLetter(letterInfo).getResult();

        if(subjectId < 0){
            return null;
        }

        Letter letter = new Letter();
        letter.setContent(letterInfo.getContent());

        Subject subject = subjectRepository.findById(subjectId).get();
        letter.setSubject(subject);

        letterRepository.save(letter);

        return subject;

    }

    public RecommendResultsRes connectSituation(Long userId, Long tagId){
        RestTemplate restTemplate = new RestTemplate();

        /*GET*/
//        URI uri = UriComponentsBuilder.fromUriString(DJANGO_REDIRECT_URI)
//                .path("/api/data/tag/{userId}/{tagId}")
//                .encode()
//                .build()
//                .expand(userId, tagId)
//                .toUri();

//        ResponseEntity<RecommendResultRes> kindIds = restTemplate.getForEntity(uri, RecommendResultRes.class);

        /*POST*/
        URI uri = UriComponentsBuilder.fromUriString(DJANGO_REDIRECT_URI)
                .path("/situation")
                .encode()
                .build()
                .toUri();

        RecommendTagReq recommendTagReq = new RecommendTagReq();
        recommendTagReq.setTagId(tagId);
        recommendTagReq.setUserId(userId);

        ResponseEntity<RecommendResultsRes> kindIds = restTemplate.postForEntity(uri, recommendTagReq, RecommendResultsRes.class);

        return kindIds.getBody();
    }

    public RecommendResultsRes connectArticle(Long userId){
        RestTemplate restTemplate = new RestTemplate();

        URI uri = UriComponentsBuilder.fromUriString(DJANGO_REDIRECT_URI)
                .path("/article")
                .encode()
                .build()
                .toUri();

        RecommendLikeReq recommendLikeReq = new RecommendLikeReq();
        recommendLikeReq.setUserId(userId);

        ResponseEntity<RecommendResultsRes> kindIds = restTemplate.postForEntity(uri, recommendLikeReq, RecommendResultsRes.class);

        return kindIds.getBody();
    }

    public RecommendResultRes connectLetter(LetterPostReq letterInfo){
        RestTemplate restTemplate = new RestTemplate();

        URI uri = UriComponentsBuilder.fromUriString(DJANGO_REDIRECT_URI)
                .path("/letter")
                .encode()
                .build()
                .toUri();

        ResponseEntity<RecommendResultRes> kindIds = restTemplate.postForEntity(uri, letterInfo, RecommendResultRes.class);

        return kindIds.getBody();
    }

}
