package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("ArticleCreatePostRequest")
public class CommentPutReq {
    @ApiModelProperty(name = "댓글 id")
    Long commentId;
    @ApiModelProperty(name = "댓글 내용")
    String commentContent;
}
