package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("RecommendTagRequest")
public class RecommendTagReq {
    @ApiModelProperty(name = "회원 id")
    Long userId;
    @ApiModelProperty(name = "태그 id")
    Long tagId;
}
