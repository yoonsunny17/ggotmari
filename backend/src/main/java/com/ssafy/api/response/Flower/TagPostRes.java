package com.ssafy.api.response.Flower;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("LikePostResponse")
public class TagPostRes extends BaseResponseBody {

    @JsonProperty("isSuccess")
    @ApiModelProperty(name = "태그 전환 성공 여부")
    boolean isSuccess;

    public static TagPostRes of(Integer statusCode, String message, boolean isSuccess) {
        TagPostRes res = new TagPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setSuccess(isSuccess);
        return res;
    }
}
