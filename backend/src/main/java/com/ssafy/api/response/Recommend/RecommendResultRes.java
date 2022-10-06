package com.ssafy.api.response.Recommend;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
@ApiModel("RecommendLetterResponse")
public class RecommendResultRes {

    @ApiModelProperty(name = "결과")
    Long result;
}
