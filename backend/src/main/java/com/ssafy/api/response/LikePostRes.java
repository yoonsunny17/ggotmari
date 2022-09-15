package com.ssafy.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Comment;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("LikePostResponse")
public class LikePostRes extends BaseResponseBody {
    @JsonProperty("isSuccess")
    @ApiModelProperty(name = "좋아요 전환 성공 여부")
    boolean isSuccess;

    public static LikePostRes of(Integer statusCode, String message, boolean isSuccess) {
        LikePostRes res = new LikePostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setSuccess(isSuccess);
        return res;
    }
}
