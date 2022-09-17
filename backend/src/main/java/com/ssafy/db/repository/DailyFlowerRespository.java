package com.ssafy.db.repository;

import com.ssafy.db.entity.DailyFlower;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface DailyFlowerRespository extends JpaRepository<DailyFlower, Long> {

    DailyFlower findDailyFlowerByFlowerDate(String date);
}
