package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

@Data
@ApiModel("UserPutRequest")
public class UserPutReq {

    @ApiModelProperty(name = "회원 닉네임")
    String userName;

    @DateTimeFormat(pattern = "yyyyMMdd")
    @ApiModelProperty(name = "회원 생일")
    LocalDate birthday;

    @JsonProperty("sex")
    @ApiModelProperty(name = "성별")
    boolean sex;
}
