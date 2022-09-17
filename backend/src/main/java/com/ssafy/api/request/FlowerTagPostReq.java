package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("FlowerTagRequest")
public class FlowerTagPostReq {

    @ApiModelProperty(name = "품종 id")
    Long kindId;
    @ApiModelProperty(name = "태그 id")
    Long tagId;
    @ApiModelProperty(name = "좋아요 상태")
    boolean tagStatus;

}
