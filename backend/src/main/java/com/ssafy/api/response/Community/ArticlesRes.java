package com.ssafy.api.response.Community;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.db.entity.*;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("SubjectResponse")
public class ArticlesRes {

    @ApiModelProperty(name = "게시글 id", example = "1")
    Long articleId;
    @ApiModelProperty(name = "게시글 사진 목록")
    List<String> articleImages;
    @ApiModelProperty(name = "유저 이름", example = "ggotmari")
    String userName;
    @ApiModelProperty(name = "게시글 제목")
    String articleTitle;
    @ApiModelProperty(name = "게시글 내용")
    String articleContent;
    @ApiModelProperty(name = "게시글 작성 날짜")
    String articleDate;
    @ApiModelProperty(name = "태그")
    List<String> tags;
    @ApiModelProperty(name = "댓글 수")
    int commentCount;
    @ApiModelProperty(name = "좋아요 수")
    int likeCount;
    @JsonProperty("isFollow")
    @ApiModelProperty(name = "팔로우 여부")
    boolean isFollow = false;

    public static ArticlesRes of(Article article, User user) {
        ArticlesRes res = new ArticlesRes();

        res.setArticleId(article.getId());

        List<String> pictures = new ArrayList<>();
        for(Picture picture : article.getPictures()){
            pictures.add(picture.getImage());
        }
        res.setArticleImages(pictures);

        res.setUserName(article.getUser().getName());
        res.setArticleTitle(article.getTitle());
        res.setArticleContent(article.getContent());
        res.setArticleDate(article.getDate().toString());

        List<String> tags = new ArrayList<>();
        for(Hashtag hashtag : article.getHashtags()){
            tags.add(hashtag.getSubject().getSubjectName());
        }
        res.setTags(tags);

        res.setCommentCount(article.getComments().size());
        res.setLikeCount(article.getLikes().size());

        for(Follow follow : user.getFollowings()){
            if(article.getUser().equals(follow.getFollowingUser())){
                res.setFollow(true);
            }
        }

        return res;
    }
}
