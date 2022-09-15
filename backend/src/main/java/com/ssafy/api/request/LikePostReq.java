package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("LikePostRequest")
public class LikePostReq {

    @JsonProperty("isLike")
    @ApiModelProperty(name = "좋아요 상태")
    boolean isLike;
}
