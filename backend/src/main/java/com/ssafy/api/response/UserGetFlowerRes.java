package com.ssafy.api.response;

import com.ssafy.db.entity.Kind;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("UserGetLikeFlowerResponse")
public class UserGetFlowerRes {
    @ApiModelProperty(name = "꽃 이미지")
    String flowerImage;

    @ApiModelProperty(name = "꽃 품목 ID")
    Long subjectId;

    @ApiModelProperty(name = "꽃 품종 ID")
    Long kindId;

    @ApiModelProperty(name = "꽃 품종 이름")
    String kindName;

    public static UserGetFlowerRes of(Kind kind){
        UserGetFlowerRes res = new UserGetFlowerRes();

        res.setFlowerImage("https://ggotmari.s3.ap-northeast-2.amazonaws.com/" + kind.getFlowerImage());
        res.setSubjectId(kind.getSubject().getId());
        res.setKindId(kind.getId());
        res.setKindName(kind.getKindName());

        return res;
    }
}
