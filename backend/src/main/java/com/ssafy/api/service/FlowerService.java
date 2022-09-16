package com.ssafy.api.service;

import com.ssafy.db.entity.DailyFlower;
import com.ssafy.db.entity.Kind;
import com.ssafy.db.entity.Subject;
import com.ssafy.db.repository.DailyFlowerRespository;
import com.ssafy.db.repository.KindRepository;
import com.ssafy.db.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
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

    public DailyFlower getDailyFlower() {
        return dailyFlowerRespository.findDailyFlowerByFlowerDate(LocalDate.now().getMonthValue() + "-" + LocalDate.now().getDayOfMonth());
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
}
