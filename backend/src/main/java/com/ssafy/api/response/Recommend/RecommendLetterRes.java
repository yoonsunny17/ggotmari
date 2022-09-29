package com.ssafy.api.response.Recommend;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Subject;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("RecommendLetterResponse")
public class RecommendLetterRes extends BaseResponseBody {

    @ApiModelProperty(name = "품목명")
    String subjectName;
    @ApiModelProperty(name = "꽃말")
    String subjectLanguage;
    @ApiModelProperty(name = "품종 이미지")
    String kindImage;


    public static RecommendLetterRes of(Integer statusCode, String message, Subject subject) {
        RecommendLetterRes res = new RecommendLetterRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        if(subject != null){
            res.setSubjectName(subject.getSubjectName());
            res.setSubjectLanguage(subject.getFlowerLanguage());
            res.setKindImage("https://ggotmari.s3.ap-northeast-2.amazonaws.com/" + subject.getKinds().get(0).getFlowerImage());

        }
        return res;
    }

}
