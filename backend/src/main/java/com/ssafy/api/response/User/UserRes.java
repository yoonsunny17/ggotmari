package com.ssafy.api.response.User;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("UserResponse")
public class UserRes {

    @ApiModelProperty(name = "유저 id", example = "1")
    Long userId;
    @ApiModelProperty(name = "유저 이름")
    String userName;
    @ApiModelProperty(name = "유저 프로필 이미지")
    String userImage;
    @ApiModelProperty(name = "팔로워 수")
    int follower;
    @ApiModelProperty(name = "팔로잉 수")
    int following;

    @JsonProperty("isFollow")
    @ApiModelProperty(name = "팔로우 여부")
    boolean isFollow;

    @JsonProperty("isMe")
    @ApiModelProperty(name = "작성자 동일 여부")
    boolean isMe;


    public static UserRes of(User user, boolean isFollow, boolean isMe) {
        UserRes res = new UserRes();

        res.setUserId(user.getId());
        res.setUserName(user.getName());
        res.setUserImage(user.getProfileImage());
        res.setFollower(user.getFollowers().size());
        res.setFollowing(user.getFollowings().size());
        res.setFollow(isFollow);
        res.setMe(isMe);

        return res;
    }
}
