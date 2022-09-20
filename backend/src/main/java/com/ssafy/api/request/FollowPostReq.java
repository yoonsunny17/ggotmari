package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("FollowPostRequest")
public class FollowPostReq {

    @JsonProperty("isFollow")
    @ApiModelProperty(name = "팔로우 상태")
    boolean isFollow;

    @ApiModelProperty(name = "대상 닉네임")
    String userName;
}
