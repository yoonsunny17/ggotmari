package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("KakaoLoginResponse")
public class KakaoLoginRes extends BaseResponseBody {
    @ApiModelProperty(name = "JWT 토큰")
    String token;

    public static KakaoLoginRes of (Integer statusCode, String message, String token){
        KakaoLoginRes res = new KakaoLoginRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setToken(token);
        return res;
    }
}
