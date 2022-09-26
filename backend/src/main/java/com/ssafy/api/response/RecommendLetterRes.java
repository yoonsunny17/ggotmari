package com.ssafy.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Article;
import com.ssafy.db.entity.Kind;
import com.ssafy.db.entity.Subject;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("RecommendLetterResponse")
public class RecommendLetterRes extends BaseResponseBody {

    @ApiModelProperty(name = "품목명")
    String subjectName;
    @ApiModelProperty(name = "꽃말")
    String subjectLanguage;

    public static RecommendLetterRes of(Integer statusCode, String message, Subject subject) {
        RecommendLetterRes res = new RecommendLetterRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setSubjectName(subject.getSubjectName());
        res.setSubjectLanguage(subject.getFlowerLanguage());
        return res;
    }

}
