package com.ssafy.api.response.Community;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Article;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("PopularArticlesGetResponse")
public class PopularArticleGetRes extends BaseResponseBody {
    @ApiModelProperty(name = "품목 리스트")
    List<PopularArticleRes> articles = new ArrayList<>();

    public static PopularArticleGetRes of(Integer statusCode, String message, List<Article> articles) {
        PopularArticleGetRes res = new PopularArticleGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setArticles(articles);
        return res;
    }

    public void setArticles(List<Article> articles){
        for(Article article : articles){
            this.articles.add(PopularArticleRes.of(article));
        }
    }
}
