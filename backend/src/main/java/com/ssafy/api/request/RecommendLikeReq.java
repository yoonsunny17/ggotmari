package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("RecommendLikeRequest")
public class RecommendLikeReq {
    @ApiModelProperty(name = "회원 id")
    Long userId;

}
