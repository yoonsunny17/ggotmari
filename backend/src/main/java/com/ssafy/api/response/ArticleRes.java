package com.ssafy.api.response;

import com.ssafy.db.entity.Article;
import com.ssafy.db.entity.Subject;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel("SubjectResponse")
public class ArticleRes {

    @ApiModelProperty(name = "게시글 id")
    Long articleId;
    @ApiModelProperty(name = "게시글 이미지")
    String articleImage;
    @ApiModelProperty(name = "작성자")
    String writter;
    @ApiModelProperty(name = "좋아요 수")
    int likeCount;

    public static ArticleRes of(Article article) {
        ArticleRes res = new ArticleRes();
        res.setArticleId(article.getId());
        res.setArticleImage(article.getPictures().get(0).getImage());
        res.setWritter(article.getUser().getName());
        res.setLikeCount(article.getLikes().size());
        return res;
    }
}
