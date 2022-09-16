package com.ssafy.api.service;

import com.ssafy.db.entity.DailyFlower;
import com.ssafy.db.entity.Subject;
import com.ssafy.db.repository.DailyFlowerRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class FlowerService {

    @Autowired
    DailyFlowerRespository dailyFlowerRespository;

    public DailyFlower getDailyFlower() {

        String date = LocalDate.now().getMonthValue() + "-" + LocalDate.now().getDayOfMonth();

        System.out.println("------------ " + date);

        DailyFlower dailyFlower = dailyFlowerRespository.findDailyFlowerByFlowerDate(LocalDate.now().getMonthValue() + "-" + LocalDate.now().getDayOfMonth());

        return dailyFlower;
    }
}
