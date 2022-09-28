package com.ssafy.api.response.Flower;

import com.ssafy.db.entity.Subject;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("SubjectResponse")
public class SubjectRes implements Comparable<SubjectRes>{

    @ApiModelProperty(name = "품목 id", example = "1")
    Long subjectId;
    @ApiModelProperty(name = "품목명", example = "거베라")
    String subjectName;
    @ApiModelProperty(name = "품종 id", example = "1")
    Long kindId;

    public static SubjectRes of(Subject subject) {
        SubjectRes res = new SubjectRes();

        res.setSubjectId(subject.getId());
        res.setSubjectName(subject.getSubjectName());
        res.setKindId(subject.getKinds().get(0).getId());

        return res;
    }

    @Override
    public int compareTo(SubjectRes o) {
        return subjectName.compareTo(o.subjectName);
    }
}
