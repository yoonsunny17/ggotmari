package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("RecommendTagRequest")
public class RecommendTagReq {
    @ApiModelProperty(name = "ํ์ id")
    Long userId;
    @ApiModelProperty(name = "ํ๊ทธ id")
    Long tagId;
}
