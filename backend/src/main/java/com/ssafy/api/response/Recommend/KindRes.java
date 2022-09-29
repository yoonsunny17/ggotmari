package com.ssafy.api.response.Recommend;

import com.ssafy.api.response.Flower.TagPostRes;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Subject;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
@ApiModel("KindResponse")
public class KindRes{

    @ApiModelProperty(name = "품목 id")
    Long subjectId;
    @ApiModelProperty(name = "품종 id")
    Long kindId;
    @ApiModelProperty(name = "품종 이미지")
    String kindImage;
    @ApiModelProperty(name = "품종 이름")
    String kindName;

}
