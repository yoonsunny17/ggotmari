package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

@Data
@ApiModel("ArticleCreatePostRequest")
public class ArticleCreatePostReq {
    @ApiModelProperty(name = "게시글 제목")
    String title;
    @ApiModelProperty(name = "게시글 내용")
    String content;

//    @ApiModelProperty(name = "게시글 사진")
//    List<String> images;

    @ApiModelProperty(name = "해시태그(꽃 품목)", example = "1")
    List<Long> subjects;
}
