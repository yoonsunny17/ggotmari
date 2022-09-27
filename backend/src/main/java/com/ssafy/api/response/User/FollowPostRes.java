package com.ssafy.api.response.User;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("FollowPostResponse")
public class FollowPostRes extends BaseResponseBody {
    @JsonProperty("isSuccess")
    @ApiModelProperty(name = "팔로우 전환 성공 여부")
    boolean isSuccess;

    public static FollowPostRes of(Integer statusCode, String message, boolean isSuccess) {
        FollowPostRes res = new FollowPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setSuccess(isSuccess);
        return res;
    }
}
