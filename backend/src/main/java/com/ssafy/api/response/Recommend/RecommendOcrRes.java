package com.ssafy.api.response.Recommend;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Subject;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("RecommendOcrResponse")
public class RecommendOcrRes extends BaseResponseBody {

    @ApiModelProperty(name = "ocr 추출 텍스트")
    String ocrText;


    public static RecommendOcrRes of(Integer statusCode, String message, String ocrText) {
        RecommendOcrRes res = new RecommendOcrRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setOcrText(ocrText);
        return res;
    }

}
