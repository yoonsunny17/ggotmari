package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Article;
import com.ssafy.db.entity.ArticleLike;
import com.ssafy.db.entity.FlowerLike;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@ApiModel("FollowGetResponse")
public class FollowGetRes extends BaseResponseBody {
    @ApiModelProperty(name = "팔로워 목록")
    List<FollowGetFollowerRes> followers = new ArrayList<>();

    public static FollowGetRes of(Integer statusCode, String message , User user, String loginUserEmail){
        FollowGetRes res = new FollowGetRes();

        res.setStatusCode(statusCode);
        res.setMessage(message);


        return res;
    }
}
