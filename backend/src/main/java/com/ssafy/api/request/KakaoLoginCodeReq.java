package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("KakaoLoginCodeRequest")
public class KakaoLoginCodeReq {
    @ApiModelProperty(name = "카카오 로그인 코드")
    String code;
}
