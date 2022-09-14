package com.ssafy.api.response;

import com.ssafy.db.entity.Article;
import com.ssafy.db.entity.Hashtag;
import com.ssafy.db.entity.Subject;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
    @ApiModelProperty(name = "팔로우 여부")
    boolean isFollow;


    public static UserRes of(User user, boolean isFollow) {
        UserRes res = new UserRes();

        res.setUserId(user.getId());
        res.setUserName(user.getName());
        res.setUserImage(user.getProfileImage());
        res.setFollower(user.getFollowers().size());
        res.setFollowing(user.getFollowings().size());
        res.setFollow(isFollow);

        return res;
    }
}
