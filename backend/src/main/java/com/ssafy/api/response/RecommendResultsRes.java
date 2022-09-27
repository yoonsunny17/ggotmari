package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
@ApiModel("RecommendLetterResponse")
public class RecommendResultsRes {

    @ApiModelProperty(name = "결과")
    List<Long> result;
}
