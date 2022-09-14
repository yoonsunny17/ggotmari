package com.ssafy.api.controller;

import com.ssafy.api.request.ArticleCreatePostReq;
import com.ssafy.api.response.ArticlePostRes;
import com.ssafy.api.service.CommunityService;
import com.ssafy.db.entity.Article;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "커뮤니티 api", tags = {"Community"})
@RestController
@RequestMapping("/api/community")
public class CommunityController {

    @Autowired
    CommunityService communityService;

    @PostMapping("/article")
    @ApiOperation(value = "게시글 생성", notes = "생성된 게시글 id 값을 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "게시글 생성 성공"),
            @ApiResponse(code = 500, message = "게시글 생성 실패")
    })
    public ResponseEntity<? extends ArticlePostRes> createArticle(@RequestBody ArticleCreatePostReq articleInfo){
        //TODO : userId 받아오기
        Long userId = 1L;

        Article article  = communityService.createArticle(userId, articleInfo);

        return ResponseEntity.status(201).body(ArticlePostRes.of(201, "정상적으로 작성되었습니다", article.getId()));
    }
}
