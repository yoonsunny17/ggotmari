package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("DislikePostRequest")
public class DislikePostReq {
    @ApiModelProperty(name = "품종 id")
    Long kindId;
}
