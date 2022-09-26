package com.ssafy.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Article;
import com.ssafy.db.entity.Kind;
import com.ssafy.db.entity.Subject;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("RecommendArticleResponse")
public class RecommendArticleRes extends BaseResponseBody {

    @ApiModelProperty(name = "로그인한 유저")
    String userName;
    @ApiModelProperty(name = "추천 게시글")
    List<ArticleRes> articles;

    public static RecommendArticleRes of(Integer statusCode, String message, List<Article> articles, String userName) {
        RecommendArticleRes res = new RecommendArticleRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setArticles(articles);
        res.setUserName(userName);
        return res;
    }

    public void setArticles(List<Article> articles){
        for(Article article : articles){
            this.articles.add(ArticleRes.of(article));
        }
    }

}
