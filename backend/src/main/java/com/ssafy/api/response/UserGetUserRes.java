package com.ssafy.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Follow;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
@ApiModel("UserGetUserResponse")
public class UserGetUserRes {
    @ApiModelProperty(name = "유저 닉네임")
    String userName;

    @ApiModelProperty(name = "팔로잉 수")
    int followingCount;

    @ApiModelProperty(name = "팔로워 수")
    int followerCount;

    @ApiModelProperty(name = "유저 프로필")
    String userImage;

    @ApiModelProperty(name = "팔로우 여부")
    boolean isFollow = false;

    public static UserGetUserRes of(User user, User loginUser){
        UserGetUserRes res = new UserGetUserRes();

        res.setUserName(user.getName());
        res.setFollowingCount(user.getFollowings().size());
        res.setFollowerCount(user.getFollowers().size());
        res.setUserImage(user.getProfileImage());

        if(loginUser.getId() == user.getId()){
            res.setFollow(true);
        }else{
            List<Follow> followings = loginUser.getFollowings();
            for(Follow follow : followings){
                if(follow.getFollowingUser().equals(user)){
                    res.setFollow(true);
                }
            }
        }

        return res;
    }
    
}
