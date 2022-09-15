package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("ArticlePostResponse")
public class CommentPostRes extends BaseResponseBody {
    @ApiModelProperty(name = "댓글 ID")
    Long commentId;

    public static CommentPostRes of(Integer statusCode, String message, Long commentId) {
        CommentPostRes res = new CommentPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setCommentId(commentId);
        return res;
    }
}
