package com.ssafy.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("DislikePostResponse")
public class DislikePostRes extends BaseResponseBody {

    @JsonProperty("isSuccess")
    @ApiModelProperty(name = "싫어요 성공 여부")
    boolean isSuccess;

    public static DislikePostRes of(Integer statusCode, String message, boolean isSuccess) {
        DislikePostRes res = new DislikePostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setSuccess(isSuccess);
        return res;
    }
}
