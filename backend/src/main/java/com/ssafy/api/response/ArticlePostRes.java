package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("ArticlePostResponse")
public class ArticlePostRes extends BaseResponseBody {
    @ApiModelProperty(name = "게시글 ID")
    Long articleId;

    public static ArticlePostRes of(Integer statusCode, String message, Long articleId) {
        ArticlePostRes res = new ArticlePostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setArticleId(articleId);
        return res;
    }
}
