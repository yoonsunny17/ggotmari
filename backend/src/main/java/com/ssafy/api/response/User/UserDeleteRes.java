package com.ssafy.api.response.User;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("UserDeleteResponse")
public class UserDeleteRes extends BaseResponseBody {
    @JsonProperty("isSuccess")
    @ApiModelProperty(name = "회원 탈퇴 성공 여부")
    boolean isSuccess;

    public static UserDeleteRes of(Integer statusCode, String message, boolean isSuccess) {
        UserDeleteRes res = new UserDeleteRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setSuccess(isSuccess);
        return res;
    }
}
