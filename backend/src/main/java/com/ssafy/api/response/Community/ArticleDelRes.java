package com.ssafy.api.response.Community;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("ArticleDeleteResponse")
public class ArticleDelRes extends BaseResponseBody {
    @ApiModelProperty(name = "삭제 성공 여부")
    boolean isSuccess;

    public static ArticleDelRes of(Integer statusCode, String message, boolean isSuccess) {
        ArticleDelRes res = new ArticleDelRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setSuccess(isSuccess);
        return res;
    }
}
