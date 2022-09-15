package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("CommentDeleteResponse")
public class CommentDelRes extends BaseResponseBody {
    @ApiModelProperty(name = "삭제 성공 여부")
    boolean isSuccess;

    public static CommentDelRes of(Integer statusCode, String message, boolean isSuccess) {
        CommentDelRes res = new CommentDelRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setSuccess(isSuccess);
        return res;
    }
}
