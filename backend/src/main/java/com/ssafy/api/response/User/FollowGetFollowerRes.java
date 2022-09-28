package com.ssafy.api.response.User;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.db.entity.Follow;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("FollowGetFollowerResponse")
public class FollowGetFollowerRes {
    @ApiModelProperty(name = "글 ID")
    String userName;

    @ApiModelProperty(name = "글 이미지")
    String userImage;

    @JsonProperty("isFollowing")
    @ApiModelProperty(name = "맞팔 여부")
    boolean isFollowing;

    @JsonProperty("isMe")
    @ApiModelProperty(name = "본인 여부")
    boolean isMe = false;

    public static FollowGetFollowerRes of(Follow follower, String loginUserEmail){
        FollowGetFollowerRes res = new FollowGetFollowerRes();

        res.setUserName(follower.getFollowUser().getName());
        res.setUserImage(follower.getFollowUser().getProfileImage());

        return res;
    }

}
