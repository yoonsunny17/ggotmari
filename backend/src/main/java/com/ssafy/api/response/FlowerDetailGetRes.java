package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
@ApiModel("FlowerDetailGetResponse")
public class FlowerDetailGetRes extends BaseResponseBody {

    @ApiModelProperty(name = "품목 id")
    Long subjectId;
    @ApiModelProperty(name = "품목 이름")
    String subjectName;
    @ApiModelProperty(name = "꽃말")
    String subjectLanguage;
    @ApiModelProperty(name = "품종 목록")
    List<KindDetailRes> kinds;
    @ApiModelProperty(name = "게시글 목록")
    List<SubjectArticleRes> articles;

}
