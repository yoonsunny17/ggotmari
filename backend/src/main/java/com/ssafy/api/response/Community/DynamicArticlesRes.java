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
@ApiModel("DynamicArticlesResponse")
public class DynamicArticlesRes extends BaseResponseBody {
    @ApiModelProperty(name = "댓글 ID")
    List<Long> articlesId = new ArrayList<>();

    public static DynamicArticlesRes of(Integer statusCode, String message, List<Article> articles) {
        DynamicArticlesRes res = new DynamicArticlesRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setArticlesId(articles);
        return res;
    }

    public void setArticlesId(List<Article> articles){
        for(Article article : articles){
            this.articlesId.add(article.getId());
        }
    }
}
