package com.ssafy.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Article;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("UserGetLikeArticleResponse")
public class UserGetLikeArticleRes{

    @ApiModelProperty(name = "게시글 ID")
    Long articleId;

    @ApiModelProperty(name = "게시글 이미지")
    String articleImage;

    @ApiModelProperty(name = "게시글 작성자 닉네임")
    String userName;

    @ApiModelProperty(name = "게시글 좋아요 수")
    int likes;

    public static UserGetLikeArticleRes of(Article article){
        UserGetLikeArticleRes res = new UserGetLikeArticleRes();

        res.setArticleId(article.getId());
        res.setArticleImage(article.getPictures().get(0).getImage());
        res.setUserName(article.getUser().getName());
        res.setLikes(article.getLikes().size());

        return res;
    }
    
}
