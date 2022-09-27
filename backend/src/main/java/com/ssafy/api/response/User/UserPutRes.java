package com.ssafy.api.response.User;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("UserPostResponse")
public class UserPutRes extends BaseResponseBody {
    @JsonProperty("isSuccess")
    @ApiModelProperty(name = "회원 정보 수정 성공 여부")
    boolean isSuccess;

    public static UserPutRes of(Integer statusCode, String message, boolean isSuccess) {
        UserPutRes res = new UserPutRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setSuccess(isSuccess);
        return res;
    }
}
