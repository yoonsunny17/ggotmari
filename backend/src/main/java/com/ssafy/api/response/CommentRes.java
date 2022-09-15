package com.ssafy.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.db.entity.*;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("CommentResponse")
public class CommentRes {

    @ApiModelProperty(name = "유저 id", example = "1")
    Long userId;
    @ApiModelProperty(name = "유저 이름")
    String userName;
    @ApiModelProperty(name = "유저 프로필 이미지")
    String userImage;
    @ApiModelProperty(name = "댓글 id")
    Long commentId;
    @ApiModelProperty(name = "댓글 내용")
    String commentContent;

    @JsonProperty("isMe")
    @ApiModelProperty(name = "작성자 동일 여부")
    boolean isMe;


    public static CommentRes of(Comment comment, User loginUser) {
        CommentRes res = new CommentRes();

        res.setUserId(comment.getUser().getId());
        res.setUserName(comment.getUser().getName());
        res.setUserImage(comment.getUser().getProfileImage());
        res.setCommentId(comment.getId());
        res.setCommentContent(comment.getContent());

        if(comment.getUser() == loginUser){
            res.setMe(true);
        }else{
            res.setMe(false);
        }

        return res;
    }
}
