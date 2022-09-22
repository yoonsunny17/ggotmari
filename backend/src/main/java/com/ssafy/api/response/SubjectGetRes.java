package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Subject;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Data
@ApiModel("SubjectGetResponse")
public class SubjectGetRes extends BaseResponseBody {
    @ApiModelProperty(name = "품목 리스트")
    List<SubjectRes> subjects = new ArrayList<>();

    public static SubjectGetRes of(Integer statusCode, String message, List<Subject> subjects) {
        SubjectGetRes res = new SubjectGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setSubjects(subjects);

        return res;
    }

    public void setSubjects(List<Subject> subjects){
        for(Subject subject : subjects){
            this.subjects.add(SubjectRes.of(subject));
        }

        Collections.sort(this.subjects);
    }
}
