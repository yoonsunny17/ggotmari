package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("DislikePostRequest")
public class LetterPostReq {
    @ApiModelProperty(name = "편지 내용")
    String content;
}
