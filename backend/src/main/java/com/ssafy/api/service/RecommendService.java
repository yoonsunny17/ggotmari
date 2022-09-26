package com.ssafy.api.service;

import com.ssafy.api.request.DislikePostReq;
import com.ssafy.api.request.LetterPostReq;
import com.ssafy.api.response.KindRes;
import com.ssafy.api.response.RecommendTagRes;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public boolean addDislike(String email, DislikePostReq dislikeInfo){

        User user = userRepository.findByEmail(email);

        FlowerDislike dislike = new FlowerDislike();

        dislike.setKind(kindRepository.findById(dislikeInfo.getKindId()).get());
        dislike.setUser(user);

        flowerDislikeRepository.save(dislike);

        return true;
    }

    public List<RecommendTagRes> recommendBySituation(String email){

        User user = userRepository.findByEmail(email);

        int tagSize = (int)tagRepository.count();

        List<RecommendTagRes> tags = new ArrayList<>();
        for(int i=1; i<= tagSize; i++){
            long kindId = Long.valueOf(i);

            //TODO : 장고에게 userId, i 전달 - kindId list 받아오기
            List<Long> kinds = new ArrayList<>();

            RecommendTagRes tagRes = new RecommendTagRes();
            Tag tag = tagRepository.findById(kindId).get();
            tagRes.setTagId(tag.getId());
            tagRes.setTagName(tag.getDear());

            List<KindRes> flowers = new ArrayList<>();
            for(Long id : kinds){
                KindRes kindRes = new KindRes();
                Kind kind = kindRepository.findById(id).get();
                kindRes.setKindId(id);
                kindRes.setKindImage(kind.getFlowerImage());
                kindRes.setSubjectId(kind.getSubject().getId());

                flowers.add(kindRes);
            }

            tagRes.setFlowers(flowers);
        }

        return tags;
    }

    @Transactional
    public Subject recommendByLetter(LetterPostReq letterInfo){
        //TODO : 장고에게 letterInfo 전달, subjectId 받아오기
        Long subjectId = 1L;

        Letter letter = new Letter();
        letter.setContent(letterInfo.getContent());

        Subject subject = subjectRepository.findById(subjectId).get();
        letter.setSubject(subject);

        letterRepository.save(letter);

        return subject;

    }
}
