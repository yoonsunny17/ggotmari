package com.ssafy.api.response.Flower;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("KindDetailGetResponse")
public class KindDetailRes {
    @ApiModelProperty(name = "품종 id")
    Long kindId;
    @ApiModelProperty(name = "품종 이름")
    String kindName;
    @ApiModelProperty(name = "품종 이미지")
    String kindImage;
    @ApiModelProperty(name = "태그 상태 리스트")
    List<TagRes> kinds = new ArrayList<>();
}
