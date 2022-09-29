package com.ssafy.api.response.Community;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Article;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("ArticlesGetResponse")
public class ArticlesGetRes extends BaseResponseBody {
    @ApiModelProperty(name = "품목 리스트")
    List<ArticlesRes> articles = new ArrayList<>();

    public static ArticlesGetRes of(Integer statusCode, String message, List<Article> articles, User user) {
        ArticlesGetRes res = new ArticlesGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        if(articles != null && user != null){
            res.setArticles(articles, user);
        }
        return res;
    }

    public void setArticles(List<Article> articles, User user){
        for(Article article : articles){
            this.articles.add(ArticlesRes.of(article, user));
        }
    }
}
