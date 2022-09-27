package com.ssafy.api.response.Flower;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.DailyFlower;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("DailyFlowerGetResponse")
public class DailyFlowerGetRes extends BaseResponseBody {

    @ApiModelProperty(name = "꽃 이름")
    String dailyFlowerName;
    @ApiModelProperty(name = "꽃말")
    String dailyFlowerLanguage;
    @ApiModelProperty(name = "꽃 내용")
    String dailyFlowerContent;
    @ApiModelProperty(name = "꽃 이미지")
    String dailyFlowerImage;


    public static DailyFlowerGetRes of(Integer statusCode, String message, DailyFlower dailyFlower) {
        DailyFlowerGetRes res = new DailyFlowerGetRes();

        if(dailyFlower == null){
            return null;
        }

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setDailyFlowerName(dailyFlower.getFlowerName());
        res.setDailyFlowerLanguage(dailyFlower.getFlowerLanguage());
        res.setDailyFlowerContent(dailyFlower.getFlowerContent());
        res.setDailyFlowerImage("https://ggotmari.s3.ap-northeast-2.amazonaws.com/" + dailyFlower.getFlowerImage());
        return res;
    }
}
