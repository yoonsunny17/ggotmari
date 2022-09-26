package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("KindResponse")
public class KindRes {

    @ApiModelProperty(name = "품목 id")
    Long subjectId;
    @ApiModelProperty(name = "품종 id")
    Long kindId;
    @ApiModelProperty(name = "품종 이미지")
    String kindImage;
}
