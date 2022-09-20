package com.ssafy.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.db.entity.Article;
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

    public static FollowGetFollowerRes of(Follow follower, String loginUserEmail){
        FollowGetFollowerRes res = new FollowGetFollowerRes();

        res.setUserName(follower.getFollowUser().getName());
        res.setUserImage(follower.getFollowUser().getProfileImage());
        //todo : 팔로워중에 내가 팔로잉한 사람인지 체크하기
//        if(follower.get)

        return res;
    }

}
