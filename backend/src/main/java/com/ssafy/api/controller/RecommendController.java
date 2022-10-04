package com.ssafy.api.controller;

import com.ssafy.api.request.DislikePostReq;
import com.ssafy.api.request.LetterPostReq;
import com.ssafy.api.request.RecommendOcrReq;
import com.ssafy.api.response.Flower.TagPostRes;
import com.ssafy.api.response.Recommend.*;
import com.ssafy.api.service.NaverClovaService;
import com.ssafy.api.service.RecommendService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.Article;
import com.ssafy.db.entity.Subject;
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
    @Autowired
    NaverClovaService naverClovaService;

    @PostMapping("/dislike")
    @ApiOperation(value = "컬랙션(태그) 추가/삭제", notes = "컬렉션 전환 성공 여부를 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "태그 전환 성공"),
            @ApiResponse(code = 400, message = "태그 전환 실패"),
            @ApiResponse(code = 401, message = "로그인 필요")
    })
    public ResponseEntity<? extends DislikePostRes> addDislike(@RequestBody DislikePostReq dislikeInfo,
                                                               HttpServletRequest request){


        String jwtToken = request.getHeader("Authorization");

        if(jwtToken == null){
            return ResponseEntity.status(401).body(DislikePostRes.of(401, "로그인이 필요합니다.", false));
        }

        String email = jwtTokenUtil.getUserEmailFromToken(jwtToken);

        boolean isSuccess = recommendService.addDislike(email, dislikeInfo);

        if(!isSuccess){
            return ResponseEntity.status(400).body(DislikePostRes.of(400, "전환 실패.", isSuccess));
        }else{
            return ResponseEntity.status(201).body(DislikePostRes.of(201, "정상적으로 전환되었습니다.", isSuccess));
        }
    }

    @GetMapping("/situation/{tagId}")
    @ApiOperation(value = "상황 추천", notes = "상황별 꽃 추천")
    @ApiResponses({
            @ApiResponse(code = 201, message = "꽃 추천 성공"),
            @ApiResponse(code = 404, message = "꽃 추천 실패"),
            @ApiResponse(code = 401, message = "로그인 필요")
    })
    public ResponseEntity<? extends RecommendSituationRes> recommendFlowerBySituation(@PathVariable Long tagId, HttpServletRequest request){


        String jwtToken = request.getHeader("Authorization");

        if(jwtToken == null){
            return ResponseEntity.status(401).body(RecommendSituationRes.of(401, "로그인이 필요합니다.", null));
        }

        String email = jwtTokenUtil.getUserEmailFromToken(jwtToken);

        List<KindRes> kinds = recommendService.recommendBySituation(email, tagId);

        if(kinds == null){
            return ResponseEntity.status(404).body(RecommendSituationRes.of(404, "꽃을 더 추가해주세요(10개 이상)", null));
        }else{
            return ResponseEntity.status(201).body(RecommendSituationRes.of(201, "정상적으로 추천되었습니다.", kinds));
        }
    }

    @GetMapping("/article")
    @ApiOperation(value = "게시글 추천", notes = "좋아요 기반 게시글 추천")
    @ApiResponses({
            @ApiResponse(code = 201, message = "게시글 추천 성공"),
            @ApiResponse(code = 404, message = "게시글 추천 실패"),
            @ApiResponse(code = 401, message = "로그인 필요")
    })
    public ResponseEntity<? extends RecommendArticleRes> recommendArticleByLike(HttpServletRequest request){


        String jwtToken = request.getHeader("Authorization");

        if(jwtToken == null){
            return ResponseEntity.status(401).body(RecommendArticleRes.of(401, "로그인이 필요합니다.", null, null));
        }

        String email = jwtTokenUtil.getUserEmailFromToken(jwtToken);

        List<Article> articles = recommendService.recommendByLike(email);

        String userName = userService.getUserByEmail(email).getName();

        if(articles == null){
            return ResponseEntity.status(404).body(RecommendArticleRes.of(404, "게시글 좋아요를 더 추가해주세요(5개 이상)", articles, userName));
        }else{
            return ResponseEntity.status(201).body(RecommendArticleRes.of(201, "정상적으로 추천되었습니다.", articles, userName));
        }
    }

    @PostMapping("/letter")
    @ApiOperation(value = "편지 추천", notes = "편지 내용 기반 꽃 추천")
    @ApiResponses({
            @ApiResponse(code = 201, message = "꽃 추천 성공"),
            @ApiResponse(code = 404, message = "꽃 추천 실패")
    })
    public ResponseEntity<? extends RecommendLetterRes> recommendFlowerByLetter(@RequestBody LetterPostReq letterInfo){

        Subject subject= recommendService.recommendByLetter(letterInfo);

        if(subject == null){
            return ResponseEntity.status(404).body(RecommendLetterRes.of(404, "편지 추천에 실패했습니다.", null));
        }else{
            return ResponseEntity.status(201).body(RecommendLetterRes.of(201, "정상적으로 추천되었습니다.", subject));
        }
    }

    @PostMapping("/ocr")
    @ApiOperation(value = "손편지 추천", notes = "손편지 내용 기반 꽃 추천")
    @ApiResponses({
            @ApiResponse(code = 201, message = "꽃 추천 성공"),
            @ApiResponse(code = 404, message = "꽃 추천 실패")
    })
    public ResponseEntity<? extends RecommendLetterRes> getTextByOCR(@RequestPart(value = "recommendOcrInfo")RecommendOcrReq recommendOcrInfo,
                                                                     @RequestPart(value = "image") MultipartFile multipartFile){

        LetterPostReq letterInfo = new LetterPostReq();
        String content = naverClovaService.getOcrText(multipartFile,recommendOcrInfo);
        letterInfo.setContent(content);

        Subject subject= recommendService.recommendByLetter(letterInfo);

        if(subject == null){
            return ResponseEntity.status(404).body(RecommendLetterRes.of(404, "편지 추천에 실패했습니다.", null));
        }else{
            return ResponseEntity.status(201).body(RecommendLetterRes.of(201, "정상적으로 추천되었습니다.", subject));
        }
    }
}
