package com.ssafy.api.controller;

import com.ssafy.api.request.FlowerTagPostReq;
import com.ssafy.api.response.Community.CommentDelRes;
import com.ssafy.api.response.Flower.*;
import com.ssafy.api.service.FlowerService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.Article;
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

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Api(value = "꽃 api", tags = {"Flower"})
@RestController
@RequestMapping("/api/flower")
public class FlowerController {

    @Autowired
    FlowerService flowerService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    UserService userService;

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

    @GetMapping("/{kindId}")
    @ApiOperation(value = "품목 상세 페이지 조회", notes = "품목 상세 내역을 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "품목 조회 성공"),
            @ApiResponse(code = 404, message = "품목 조회 실패"),
            @ApiResponse(code = 401, message = "로그인 필요")
    })
    public ResponseEntity<? extends FlowerDetailGetRes> getFlowerDetail(@PathVariable("kindId") Long kindId,
                                                                        HttpServletRequest request){

        String jwtToken = request.getHeader("Authorization");

        if(jwtToken == null){
            return ResponseEntity.status(401).body(FlowerDetailGetRes.of(401, "로그인이 필요합니다.", null, null, null, null));
        }

        String email = jwtTokenUtil.getUserEmailFromToken(jwtToken);

        Long subjectId = flowerService.getSubjectByKindId(kindId);

        Subject subject = flowerService.getFlowerDetail(subjectId);

        if(subject == null){
            return ResponseEntity.status(404).body(FlowerDetailGetRes.of(404, "조회실패.", null,  null, null, null));
        }else{
            List<KindDetailRes> kinds = flowerService.getFlowerKinds(email, subjectId, kindId);
            List<Article> articles = flowerService.getSubjectArticles(subjectId);
            Kind kind = flowerService.getKindDetail(kindId);

            return ResponseEntity.status(201).body(FlowerDetailGetRes.of(201, "정상적으로 조회되었습니다.", subject, kind, kinds, articles));
        }
    }

    @PostMapping("/{kindId}")
    @ApiOperation(value = "컬랙션(태그) 추가/삭제", notes = "컬렉션 전환 성공 여부를 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "태그 전환 성공"),
            @ApiResponse(code = 400, message = "태그 전환 실패"),
            @ApiResponse(code = 401, message = "로그인 필요")
    })
    public ResponseEntity<? extends TagPostRes> reverseTag(@PathVariable("kindId") Long kindId,
                                                           @RequestBody FlowerTagPostReq tagInfo,
                                                           HttpServletRequest request){


        String jwtToken = request.getHeader("Authorization");

        if(jwtToken == null){
            return ResponseEntity.status(401).body(TagPostRes.of(401, "로그인이 필요합니다.", false));
        }

        String email = jwtTokenUtil.getUserEmailFromToken(jwtToken);

        boolean isSuccess = flowerService.reverseFlowerTag(email, tagInfo);

        if(!isSuccess){
            return ResponseEntity.status(400).body(TagPostRes.of(400, "전환 실패.", isSuccess));
        }else{
            return ResponseEntity.status(201).body(TagPostRes.of(201, "정상적으로 전환되었습니다.", isSuccess));
        }
    }
}
