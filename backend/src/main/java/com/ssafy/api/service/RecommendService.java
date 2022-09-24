package com.ssafy.api.service;

import com.ssafy.api.request.DislikePostReq;
import com.ssafy.db.entity.FlowerDislike;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.FlowerDislikeRepository;
import com.ssafy.db.repository.KindRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class RecommendService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    KindRepository kindRepository;
    @Autowired
    FlowerDislikeRepository flowerDislikeRepository;

    @Transactional
    public boolean addDislike(String email, DislikePostReq dislikeInfo){

        User user = userRepository.findByEmail(email);

        FlowerDislike dislike = new FlowerDislike();

        dislike.setKind(kindRepository.findById(dislikeInfo.getKindId()).get());
        dislike.setUser(user);

        flowerDislikeRepository.save(dislike);

        return true;
    }

}
