package com.ssafy.api.controller;

import com.ssafy.api.request.FlowerTagPostReq;
import com.ssafy.api.response.*;
import com.ssafy.api.service.FlowerService;
import com.ssafy.db.entity.DailyFlower;
import com.ssafy.db.entity.Kind;
import com.ssafy.db.entity.Subject;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/search/{searchText}")
    @ApiOperation(value = "꽃 검색", notes = "searchText에 적합한 꽃을 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "꽃 검색 성공"),
            @ApiResponse(code = 500, message = "꽃 검색 실패")
    })
    public ResponseEntity<? extends searchFlowerGetRes> searchFlowers(@PathVariable("searchText") String searchText){

        List<Kind> flowers = flowerService.findFlowers(searchText);

        if(flowers == null){
            return ResponseEntity.status(403).body(searchFlowerGetRes.of(403, "조회실패.", null));
        }else{
            return ResponseEntity.status(201).body(searchFlowerGetRes.of(201, "정상적으로 조회되었습니다.", flowers));
        }
    }

    //TODO : 품목 상세 페이지 조회
//    @GetMapping("/{subjectId}")
//    @ApiOperation(value = "꽃 검색", notes = "searchText에 적합한 꽃을 반환한다.")
//    @ApiResponses({
//            @ApiResponse(code = 201, message = "꽃 검색 성공"),
//            @ApiResponse(code = 500, message = "꽃 검색 실패")
//    })
//    public ResponseEntity<? extends FlowerDetailGetRes> getFlowerDetail(@PathVariable("subjectId") Long subjectId){
//
//        Long userId = 1L;
//
//        Subject subject = flowerService.getFlowerDetail(subjectId);
//        List<KindDetailRes> kinds = flowerService.getFlowerKinds(Long userId, subjectId);
//
//        if(flowers == null){
//            return ResponseEntity.status(403).body(FlowerDetailGetRes.of(403, "조회실패.", null));
//        }else{
//            return ResponseEntity.status(201).body(FlowerDetailGetRes.of(201, "정상적으로 조회되었습니다.", flowers));
//        }
//    }

    //TODO : 컬렉션(태그)
    @PostMapping("/{subjectId}")
    @ApiOperation(value = "꽃 검색", notes = "searchText에 적합한 꽃을 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "꽃 검색 성공"),
            @ApiResponse(code = 500, message = "꽃 검색 실패")
    })
    public ResponseEntity<? extends TagPostRes> reverseTag(@PathVariable("subjectId") Long subjectId, @RequestBody FlowerTagPostReq tagInfo){


        Long userId = 1L;

        boolean isSuccess = flowerService.reverseFlowerTag(userId, tagInfo);

        if(!isSuccess){
            return ResponseEntity.status(403).body(TagPostRes.of(403, "전환 실패.", isSuccess));
        }else{
            return ResponseEntity.status(201).body(TagPostRes.of(201, "정상적으로 전환되었습니다.", isSuccess));
        }
    }
}