package com.ssafy.api.controller;

import com.ssafy.api.request.*;
import com.ssafy.api.response.User.*;
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
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Api(value = "유저 api", tags = {"User"})
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    KakaoService kakaoService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @GetMapping("")
    @ApiOperation(value = "회원 이메일 조회", notes = "회원 이메일 조회")
    @ApiResponses({
            @ApiResponse(code = 201, message = "회원 이메일 조회 성공"),
            @ApiResponse(code = 500, message = "회원 이메일 조회 실패")
    })
    public ResponseEntity<? extends UserEmailRes> getUserEmail(HttpServletRequest request){
        // user email 가져오기
        String jwtToken = request.getHeader("Authorization");
        String email = jwtTokenUtil.getUserEmailFromToken(jwtToken);

        User user = userService.getUserByEmail(email);

        if(user == null){
            return ResponseEntity.status(404).body(UserEmailRes.of(404, "존재하지 않는 사용자입니다.", null));
        }

        return ResponseEntity.status(200).body(UserEmailRes.of(200,"회원 정보 조회 성공", user.getName()));
    }

    @GetMapping("/{username}")
    @ApiOperation(value = "회원 정보 조회", notes = "회원 정보와 작성글, 좋아하는 꽃, 글 등을 반환")
    @ApiResponses({
            @ApiResponse(code = 201, message = "회원 정보 조회 성공"),
            @ApiResponse(code = 500, message = "회원 정보 조회 실패")
    })
    public ResponseEntity<? extends UserGetRes> getUserDetail(@PathVariable String username, HttpServletRequest request){
        // user email 가져오기
        String jwtToken = request.getHeader("Authorization");
        String email = jwtTokenUtil.getUserEmailFromToken(jwtToken);

        User loginUser = userService.getUserByEmail(email);

        User user = userService.getUserByName(username);

        if(user == null){
            return ResponseEntity.status(404).body(UserGetRes.of(404, "존재하지 않는 사용자입니다.", user, loginUser));
        }

        return ResponseEntity.status(200).body(UserGetRes.of(200,"회원 정보 조회 성공", user, loginUser));
    }

    @GetMapping("/{username}/follow")
    @ApiOperation(value = "팔로우 리스트 조회", notes = "팔로워, 팔로잉 리스트를 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "팔로우 리스트 조회 성공"),
            @ApiResponse(code = 500, message = "팔로우 리스트 조회 실패")
    })
    public ResponseEntity<? extends FollowGetRes> getUserFollow(@PathVariable String username, HttpServletRequest request){
        // user email 가져오기
        String jwtToken = request.getHeader("Authorization");
        String email = jwtTokenUtil.getUserEmailFromToken(jwtToken);

//        User loginUser = userService.getUserByEmail(email);     //로그인한 사람
//        User user = userService.getUserByName(username);        //대상

        List<FollowGetFollowerRes> followers = userService.getFollowers(email, username);
        List<FollowGetFollowerRes> followings = userService.getFollowings(email, username);

        return ResponseEntity.status(200).body(FollowGetRes.of(200, "팔로우 조회 성공", followers, followings));
    }

    @PostMapping("/follow")
    @ApiOperation(value = "팔로우 추가 / 삭제", notes = "팔로우 추가 / 삭제 성공 여부를 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "팔로우 추가/삭제 성공"),
            @ApiResponse(code = 500, message = "팔로우 추가/삭제 실패")
    })
    public ResponseEntity<? extends FollowPostRes> reverseFollow(@RequestBody FollowPostReq followPostReq, HttpServletRequest request){
        // user email 가져오기
        String jwtToken = request.getHeader("Authorization");
        String email = jwtTokenUtil.getUserEmailFromToken(jwtToken);
        User loginUser = userService.getUserByEmail(email);

        boolean isSuccess = userService.reverseFollow(followPostReq, loginUser);


        if(isSuccess){
            return ResponseEntity.status(201).body(FollowPostRes.of(201, "팔로우 추가/삭제 성공", isSuccess));
        }else{
            return ResponseEntity.status(500).body(FollowPostRes.of(500, "팔로우 추가/삭제 실패", isSuccess));
        }
    }

    @PutMapping("")
    @ApiOperation(value = "회원 정보 수정", notes = "회원 정보 수정 여부 반환")
    @ApiResponses({
            @ApiResponse(code = 201, message = "회원 정보 수정 성공"),
            @ApiResponse(code = 500, message = "회원 정보 수정 실패")
    })
    public ResponseEntity<? extends UserPutRes> updateUser(@RequestPart(value = "userPutReq") UserPutReq userPutReq, HttpServletRequest request, @RequestPart(value = "multipart", required = false) MultipartFile multipartFile){
        // user email 가져오기
        String jwtToken = request.getHeader("Authorization");
        String email = null;
        try{
            email = jwtTokenUtil.getUserEmailFromToken(jwtToken);
        }catch (Exception e){
            return ResponseEntity.status(403).body(UserPutRes.of(403,"올바르지 않은 접근입니다.", false));
        }

        boolean isSuccess = userService.updateUser(userPutReq, email, multipartFile);

        if(isSuccess){
            return ResponseEntity.status(201).body(UserPutRes.of(201, "회원 정보 수정 성공", isSuccess));
        }else{
            return ResponseEntity.status(201).body(UserPutRes.of(201, "회원 정보 수정 실패", isSuccess));
        }
    }

    @DeleteMapping("")
    @ApiOperation(value = "회원 탈퇴", notes = "회원 탈퇴 성공 여부를 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "회원 탈퇴 성공"),
            @ApiResponse(code = 500, message = "회원 탈퇴 실패")
    })
    public ResponseEntity<? extends UserDeleteRes> deleteUser(HttpServletRequest request){
        // user email 가져오기
        String jwtToken = request.getHeader("Authorization");
        String email = null;
        try{
            email = jwtTokenUtil.getUserEmailFromToken(jwtToken);
        }catch (Exception e){
            return ResponseEntity.status(403).body(UserDeleteRes.of(403,"올바르지 않은 접근입니다.", false));
        }


        boolean isSuccess = userService.deleteUser(email);
        if(!isSuccess){
            return ResponseEntity.status(404).body(UserDeleteRes.of(404, "존재하지 않는 사용자입니다.", isSuccess));
        }
        isSuccess = kakaoService.deleteUser(email);

        if(isSuccess){
            return ResponseEntity.status(201).body(UserDeleteRes.of(201, "정상적으로 탈퇴되었습니다", isSuccess));
        }else{
            return ResponseEntity.status(404).body(UserDeleteRes.of(404, "존재하지 않는 사용자입니다.", isSuccess));
        }
    }

}
