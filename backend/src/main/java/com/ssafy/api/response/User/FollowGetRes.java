package com.ssafy.api.response.User;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("FollowGetResponse")
public class FollowGetRes extends BaseResponseBody {
    @ApiModelProperty(name = "팔로워 목록")
    List<FollowGetFollowerRes> followers = new ArrayList<>();
    @ApiModelProperty(name = "팔로잉 목록")
    List<FollowGetFollowerRes> followings = new ArrayList<>();

    public static FollowGetRes of(Integer statusCode, String message, List<FollowGetFollowerRes> followers, List<FollowGetFollowerRes> followings){
        FollowGetRes res = new FollowGetRes();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        if(followers != null){
            res.setFollowers(followers);
        }
        if(followings != null){
            res.setFollowings(followings);
        }

        return res;
    }
}
