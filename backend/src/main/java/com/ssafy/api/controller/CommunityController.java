package com.ssafy.api.controller;

import com.ssafy.api.request.ArticleCreatePostReq;
import com.ssafy.api.response.*;
import com.ssafy.api.service.CommunityService;
import com.ssafy.db.entity.Article;
import com.ssafy.db.entity.Subject;
import com.ssafy.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

        Article article = communityService.createArticle(userId, articleInfo);

        return ResponseEntity.status(201).body(ArticlePostRes.of(201, "정상적으로 작성되었습니다", article.getId()));
    }

    @GetMapping("/article")
    @ApiOperation(value = "품목 리스트 조회", notes = "꽃 품목 리스트를 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "품목리스트 조회 성공"),
            @ApiResponse(code = 500, message = "품목리스트 조회 실패")
    })
    public ResponseEntity<? extends SubjectGetRes> getSubjectList(){

        List<Subject> subjects = communityService.getSubjects();

        return ResponseEntity.status(201).body(SubjectGetRes.of(201, "정상적으로 작성되었습니다", subjects));
    }

    @PutMapping("/article/{articleId}")
    @ApiOperation(value = "게시글 수정", notes = "수정된 게시글 id 값을 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "게시글 수정 성공"),
            @ApiResponse(code = 500, message = "게시글 수정 실패")
    })
    public ResponseEntity<? extends ArticlePostRes> updateArticle(@PathVariable("articleId") Long articleId, @RequestBody ArticleCreatePostReq articleInfo){

        Long userId = 1L;

        Article article = communityService.updateArticle(userId, articleId, articleInfo);

        return ResponseEntity.status(201).body(ArticlePostRes.of(201, "정상적으로 수정되었습니다", article.getId()));
    }

    @DeleteMapping("/article/{articleId}")
    @ApiOperation(value = "게시글 삭제", notes = "삭제된 게시글 id 값을 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "게시글 삭제 성공"),
            @ApiResponse(code = 500, message = "게시글 삭제 실패")
    })
    public ResponseEntity<? extends ArticleDelRes> deleteArticle(@PathVariable("articleId") Long articleId){

        Long userId = 1L;

        boolean isSuccess = communityService.deleteArticle(userId, articleId);

        return ResponseEntity.status(201).body(ArticleDelRes.of(201, "정상적으로 삭제되었습니다", isSuccess));
    }

    @GetMapping("/article/{articleId}")
    @ApiOperation(value = "게시글 상세 조회", notes = "게시글 상세 내용을 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "게시글 상세 조회 성공"),
            @ApiResponse(code = 500, message = "게시글 상세 조회 실패")
    })
    public ResponseEntity<? extends ArticleGetRes> getArticleDetail(@PathVariable("articleId") Long articleId){

        Long userId = 1L;
        Article article = communityService.getArticle(articleId);

        //TODO : userService 연결 후 수정
        boolean isFollow = false;

        boolean isLike = communityService.checkLike(userId, articleId);
        boolean isMe = article.getUser().getId() == userId ? true : false;

        return ResponseEntity.status(201).body(ArticleGetRes.of(201, "정상적으로 조회되었습니다", article, isFollow, isLike, isMe));
    }

    @GetMapping("/article/list")
    @ApiOperation(value = "게시글 목록 조회", notes = "게시글 목록를 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "게시글 목록 조회 성공"),
            @ApiResponse(code = 500, message = "게시글 목록 조회 실패")
    })
    public ResponseEntity<? extends ArticlesGetRes> getArticleList(){

        Long userId = 1L;

        //TODO : userService 연결 후 수정
        User user = new User();

        List<Article> articles = communityService.getArticles();

        return ResponseEntity.status(201).body(ArticlesGetRes.of(201, "정상적으로 작성되었습니다", articles, user));
    }
}
