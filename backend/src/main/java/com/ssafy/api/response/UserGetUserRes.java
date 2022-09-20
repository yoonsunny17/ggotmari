package com.ssafy.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("UserGetUserResponse")
public class UserGetUserRes {
    @ApiModelProperty(name = "유저 닉네임")
    String userName;

    @ApiModelProperty(name = "팔로잉 수")
    int followingCount;

    @ApiModelProperty(name = "팔로워 수")
    int followerCount;

    public static UserGetUserRes of(User user){
        UserGetUserRes res = new UserGetUserRes();

        res.setUserName(user.getName());
        res.setFollowingCount(user.getFollowings().size());
        res.setFollowerCount(user.getFollowers().size());

        return res;
    }
    
}
