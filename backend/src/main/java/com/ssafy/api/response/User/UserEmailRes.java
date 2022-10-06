package com.ssafy.api.response.User;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("UserEmailResponse")
public class UserEmailRes extends BaseResponseBody {

    @ApiModelProperty(name = "회원 이메일")
    String userName;

    public static UserEmailRes of(Integer statusCode, String message, String userName) {
        UserEmailRes res = new UserEmailRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setUserName(userName);
        return res;
    }
}
