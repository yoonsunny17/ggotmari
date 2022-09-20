package com.ssafy.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Article;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("UserGetArticleResponse")
public class UserGetArticleRes {
    @ApiModelProperty(name = "글 ID")
    Long articleId;

    @ApiModelProperty(name = "글 이미지")
    String articleImage;

    public static UserGetArticleRes of(Article article){
        UserGetArticleRes res = new UserGetArticleRes();

        res.setArticleId(article.getId());
        if(article.getPictures().size() > 0){
            res.setArticleImage(article.getPictures().get(0).getImage());
        }

        return res;
    }

}
