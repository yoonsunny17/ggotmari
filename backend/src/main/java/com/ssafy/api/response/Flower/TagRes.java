package com.ssafy.api.response.Flower;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("TagResponse")
public class TagRes {

    @ApiModelProperty(name = "태그 id")
    Long tagId;
    @ApiModelProperty(name = "태그 이름")
    String tagName;
    @ApiModelProperty(name = "태그 상태")
    boolean tagStatus;
}
