package com.ssafy.api.response;

import com.ssafy.db.entity.Article;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("SubjectArticleResponse")
public class SubjectArticleRes {

    @ApiModelProperty(name = "게시글 id")
    Long articleId;
    @ApiModelProperty(name = "게시글 이미지 1개")
    String articleImage;
    @ApiModelProperty(name = "게시글 작성자")
    String userName;
    @ApiModelProperty(name = "좋아요 수")
    int likeCount;

    public static SubjectArticleRes of(Article article) {
        SubjectArticleRes res = new SubjectArticleRes();

        res.setArticleId(article.getId());
        res.setArticleImage(article.getPictures().get(0).getImage());
        res.setUserName(article.getUser().getName());
        res.setLikeCount(article.getLikes().size());

        return res;
    }
}
