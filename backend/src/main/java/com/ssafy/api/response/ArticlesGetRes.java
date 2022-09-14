package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Article;
import com.ssafy.db.entity.Subject;
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

    public static ArticlesGetRes of(Integer statusCode, String message, List<Article> articles) {
        ArticlesGetRes res = new ArticlesGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setArticles(articles);
        return res;
    }

    public void setArticles(List<Article> articles){
        for(Article article : articles){
            this.articles.add(ArticlesRes.of(article));
        }
    }
}
