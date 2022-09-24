package com.ssafy.api.controller;

import com.ssafy.api.request.DislikePostReq;
import com.ssafy.api.request.FlowerTagPostReq;
import com.ssafy.api.response.DislikePostRes;
import com.ssafy.api.response.TagPostRes;
import com.ssafy.api.service.FlowerService;
import com.ssafy.api.service.RecommendService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.util.JwtTokenUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Api(value = "추천 api", tags = {"Recommend"})
@RestController
@RequestMapping("/api/recommend")
public class RecommendController {

    @Autowired
    RecommendService recommendService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    UserService userService;

    @PostMapping("/dislike")
    @ApiOperation(value = "컬랙션(태그) 추가/삭제", notes = "컬렉션 전환 성공 여부를 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "태그 전환 성공"),
            @ApiResponse(code = 500, message = "태그 전환 실패")
    })
    public ResponseEntity<? extends DislikePostRes> addDislike(@RequestBody DislikePostReq dislikeInfo,
                                                           HttpServletRequest request){


        String jwtToken = request.getHeader("Authorization");
        String email = jwtTokenUtil.getUserEmailFromToken(jwtToken);

        boolean isSuccess = recommendService.addDislike(email, dislikeInfo);

        if(!isSuccess){
            return ResponseEntity.status(403).body(DislikePostRes.of(403, "전환 실패.", isSuccess));
        }else{
            return ResponseEntity.status(201).body(DislikePostRes.of(201, "정상적으로 전환되었습니다.", isSuccess));
        }
    }
}
