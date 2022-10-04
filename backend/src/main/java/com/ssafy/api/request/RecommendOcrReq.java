package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("RecommendOcrRequest")
public class RecommendOcrReq {
    @ApiModelProperty(name = "이미지 포맷")
    String format;

    @ApiModelProperty(name = "이미지 이름")
    String name;

}
