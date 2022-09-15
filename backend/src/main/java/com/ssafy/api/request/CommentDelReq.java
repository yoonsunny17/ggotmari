package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("CommentDeleteRequest")
public class CommentDelReq {
    @ApiModelProperty(name = "댓글 id")
    Long commentId;
}
