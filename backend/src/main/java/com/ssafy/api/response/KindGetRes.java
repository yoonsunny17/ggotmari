package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Article;
import com.ssafy.db.entity.DailyFlower;
import com.ssafy.db.entity.Kind;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("KindGetResponse")
public class KindGetRes {

    @ApiModelProperty(name = "품목 id")
    Long subjectId;
    @ApiModelProperty(name = "품목명")
    String subjectName;
    @ApiModelProperty(name = "품종 id")
    Long kindId;
    @ApiModelProperty(name = "품종명")
    String kindName;
    @ApiModelProperty(name = "품종 이미지")
    String kindImage;


    public static KindGetRes of(Kind flower) {

        KindGetRes res = new KindGetRes();

        res.setSubjectId(flower.getSubject().getId());
        res.setSubjectName(flower.getSubject().getSubjectName());
        res.setKindId(flower.getId());
        res.setKindName(flower.getKindName());
        res.setKindImage(flower.getFlowerImage());

        return res;
    }

}
