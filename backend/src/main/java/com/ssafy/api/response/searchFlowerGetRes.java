package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Article;
import com.ssafy.db.entity.DailyFlower;
import com.ssafy.db.entity.Kind;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("searchFlowerResponse")
public class searchFlowerGetRes extends BaseResponseBody  {

    @ApiModelProperty(name = "꽃 이름")
    List<KindGetRes> flowers = new ArrayList<>();


    public static searchFlowerGetRes of(Integer statusCode, String message, List<Kind> flowers) {
        searchFlowerGetRes res = new searchFlowerGetRes();

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setFlowers(flowers);

        return res;
    }

    public void setFlowers(List<Kind> flowers){
        for(Kind flower : flowers){
            this.flowers.add(KindGetRes.of(flower));
        }
    }
}
