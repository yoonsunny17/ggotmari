package com.ssafy.api.controller;

import com.ssafy.api.response.DailyFlowerGetRes;
import com.ssafy.api.response.SubjectGetRes;
import com.ssafy.api.service.FlowerService;
import com.ssafy.db.entity.DailyFlower;
import com.ssafy.db.entity.Subject;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "꽃 api", tags = {"Flower"})
@RestController
@RequestMapping("/api/flower")
public class FlowerController {

    @Autowired
    FlowerService flowerService;

    @GetMapping("/daily")
    @ApiOperation(value = "오늘의 꽃 조회", notes = "오늘의 꽃 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "품목리스트 조회 성공"),
            @ApiResponse(code = 500, message = "품목리스트 조회 실패")
    })
    public ResponseEntity<? extends DailyFlowerGetRes> getDailyFlower(){

        DailyFlower dailyFlower = flowerService.getDailyFlower();

        if(dailyFlower == null){
            return ResponseEntity.status(201).body(DailyFlowerGetRes.of(403, "조회실패.", null));
        }else{
            return ResponseEntity.status(201).body(DailyFlowerGetRes.of(201, "정상적으로 조회되었습니다.", dailyFlower));
        }
    }

    //TODO : 꽃 검색


    //TODO : 품목 상세 페이지 조회

    //TODO : 컬렉션(태그)
}
