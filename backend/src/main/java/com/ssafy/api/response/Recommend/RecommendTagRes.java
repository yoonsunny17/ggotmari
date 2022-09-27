package com.ssafy.api.response.Recommend;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
@ApiModel("RecommendTagResponse")
public class RecommendTagRes {

    @ApiModelProperty(name = "태그 id")
    Long tagId;
    @ApiModelProperty(name = "태그 이름")
    String tagName;
    @ApiModelProperty(name = "태그 이름")
    List<KindRes> flowers;

}
