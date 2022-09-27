package com.ssafy.api.controller;

import com.ssafy.api.request.KakaoLoginCodeReq;
import com.ssafy.api.response.Auth.KakaoLoginRes;
import com.ssafy.api.service.KakaoService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "사용자 인증 API", tags = {"Auth"})
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private KakaoService kakaoService;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "카카오로 로그인한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "로그인 성공"),
            @ApiResponse(code = 202, message = "유저 생성 실패"),
            @ApiResponse(code = 403, message = "탈퇴한 회원입니다."),
            @ApiResponse(code = 409, message = "이메일 수신을 동의해주세요."),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends KakaoLoginRes> kakaoLogin(@RequestBody KakaoLoginCodeReq kakaoLoginCodeReq){

        String kakaoEmail = null;
        try{
            kakaoEmail = kakaoService.getKakaoEmail(kakaoLoginCodeReq.getCode());
        }catch (Exception e){
            System.out.println(e.getMessage());
            return  ResponseEntity.status(409).body(KakaoLoginRes.of(409, "로그인에 실패했습니다.", kakaoEmail));
        }

        if(userService.checkEmail(kakaoEmail)){ //가입된 유저가 있을때
            userService.updateLoginCount(kakaoEmail); //로그인 되니까 로그인 횟수 증가
        }else{ // 이메일로 가입된 유저가 없을때 새로 가입시켜줌
            userService.createUser(kakaoEmail);
            userService.updateLoginCount(kakaoEmail); //첫 가입 후 바로 로그인 하니까 횟수 증가
        }

        // JWT token 발급 위해 유저 정보 가져오기
        User user = userService.getUserByEmail(kakaoEmail);

        String jwtToken = jwtTokenUtil.createToken(user.getEmail());

        System.out.println(jwtTokenUtil.getUserEmailFromToken(jwtToken));

        return  ResponseEntity.status(201).body(KakaoLoginRes.of(201, "정상적으로 로그인되었습니다.", jwtToken));
    }
}
