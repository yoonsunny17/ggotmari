package com.ssafy.api.service;

import com.ssafy.api.request.FlowerTagPostReq;
import com.ssafy.api.response.Flower.KindDetailRes;
import com.ssafy.api.response.Flower.TagRes;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class FlowerService {

    @Autowired
    DailyFlowerRespository dailyFlowerRespository;
    @Autowired
    KindRepository kindRepository;
    @Autowired
    SubjectRepository subjectRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    TagRepository tagRepository;
    @Autowired
    FlowerLikeRepository flowerLikeRepository;
    @Autowired
    HashtagRepository hashtagRepository;

    public DailyFlower getDailyFlower() {
        return dailyFlowerRespository.findDailyFlowerByFlowerDate(LocalDate.now().getMonthValue() + "월 " + LocalDate.now().getDayOfMonth() + "일");
    }

    public List<Kind> findFlowers(String searchText){
        //품종 검색
        List<Kind> kinds = kindRepository.findAllByKindNameContains(searchText);

        //품목 검색
        List<Subject> subjects = subjectRepository.findAllBySubjectNameContains(searchText);
        for(Subject subject : subjects){
            List<Kind> tmp = kindRepository.findAllBySubject(subject);
            kinds.addAll(tmp);
        }

        //중복 제거
        List<Kind> flowers = kinds.stream().distinct().collect(Collectors.toList());

        return flowers;
    }

    public Subject getFlowerDetail(Long subjectId){
        return subjectRepository.findById(subjectId).get();
    }

    public List<KindDetailRes> getFlowerKinds(String email, Long subjectId){
        Subject subject = subjectRepository.findById(subjectId).get();
        User user = userRepository.findByEmail(email);

        List<Kind> kinds = kindRepository.findAllBySubject(subject);

        List<KindDetailRes> flowers = new ArrayList<>();
        for(Kind kind : kinds){
            KindDetailRes detail = new KindDetailRes();
            detail.setKindId(kind.getId());
            detail.setKindName(kind.getKindName());
            detail.setKindImage(kind.getFlowerImage());

            List<Tag> tags = tagRepository.findAll();
            for(Tag tag : tags){
                TagRes tagRes = new TagRes();
                tagRes.setTagId(tag.getId());
                tagRes.setTagName(tag.getDear());
                if(flowerLikeRepository.findFlowerLikeByUserAndTagAndKind(user, tag, kind) != null){
                    tagRes.setTagStatus(true);
                }else{
                    tagRes.setTagStatus(false);
                }
                detail.getKinds().add(tagRes);
            }

            flowers.add(detail);
        }

        return flowers;
    }

    public List<Article> getSubjectArticles(Long subjectId){
        List<Article> articles = new ArrayList<>();

        Subject subject = subjectRepository.findById(subjectId).get();

        List<Hashtag> hashtags = hashtagRepository.findAllBySubject(subject);
        for(Hashtag hashtag : hashtags){
            articles.add(hashtag.getArticle());
        }

        return articles;
    }

    @Transactional
    public boolean reverseFlowerTag(String email, FlowerTagPostReq tagInfo){

        User user = userRepository.findByEmail(email);
        Kind kind = kindRepository.findById(tagInfo.getKindId()).get();
        Tag tag = tagRepository.findById(tagInfo.getTagId()).get();

        if(tagInfo.isTagStatus()){
            if(flowerLikeRepository.findFlowerLikeByUserAndTagAndKind(user, tag, kind) != null){
                return false;
            }

            FlowerLike flowerLike = new FlowerLike();
            flowerLike.setTag(tag);
            flowerLike.setUser(user);
            flowerLike.setKind(kind);

            flowerLikeRepository.save(flowerLike);

            user.getFlowers().add(flowerLike);
        }else{

            FlowerLike flowerLike = flowerLikeRepository.findFlowerLikeByUserAndTagAndKind(user, tag, kind);

            if(flowerLike == null){
                return false;
            }

            flowerLikeRepository.delete(flowerLike);
            user.getFlowers().remove(flowerLike);
        }

        return true;
    }
}
