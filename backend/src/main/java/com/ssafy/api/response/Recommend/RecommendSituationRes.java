package com.ssafy.api.response.Recommend;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("RecommendSituationResponse")
public class RecommendSituationRes extends BaseResponseBody {

    @ApiModelProperty(name = "태그별 꽃 추천")
    List<KindRes> tags = new ArrayList<>();

    public static RecommendSituationRes of(Integer statusCode, String message, List<KindRes> tags) {
        RecommendSituationRes res = new RecommendSituationRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setTags(tags);
        return res;
    }

}
