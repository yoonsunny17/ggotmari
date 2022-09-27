package com.ssafy.api.response.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("UserGetLikeFlowerResponse")
public class UserGetLikeFlowerRes {

    @ApiModelProperty(name = "태그")
    String tag;

    @ApiModelProperty(name = "꽃 목록")
    List<UserGetFlowerRes> flowers = new ArrayList<>();

    public static UserGetLikeFlowerRes of(String tag, List<UserGetFlowerRes> flowers){
        UserGetLikeFlowerRes res = new UserGetLikeFlowerRes();

        res.setTag(tag);
        res.setFlowers(flowers);

        return res;
    }
}
