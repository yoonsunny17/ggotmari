package com.ssafy.api.response.Community;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.api.response.Flower.SubjectRes;
import com.ssafy.api.response.User.UserRes;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.*;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Data
@ApiModel("ArticleGetResponse")
public class ArticleGetRes extends BaseResponseBody {
    @ApiModelProperty(name = "작성자 정보")
    UserRes user;
    @ApiModelProperty(name = "게시글 사진")
    List<String> articleImages = new ArrayList<>();
    @ApiModelProperty(name = "게시글 제목")
    String articleTitle;
    @ApiModelProperty(name = "게시글 내용")
    String articleContent;
    @ApiModelProperty(name = "게시글 작성 날짜")
    String articleDate;
    @ApiModelProperty(name = "태그")
    List<SubjectRes> tags = new ArrayList<>();

    @JsonProperty("isLike")
    @ApiModelProperty(name = "좋아요 여부")
    boolean isLike;
    @ApiModelProperty(name = "좋아요 수")
    int likeCount;
    @ApiModelProperty(name = "댓글 수")
    int commentCount;
    @ApiModelProperty(name = "댓글")
    List<CommentRes> comments = new ArrayList<>();


    public static ArticleGetRes of(Integer statusCode, String message, Article article, boolean isFollow, boolean isLike, User loginUser) {
        ArticleGetRes res = new ArticleGetRes();

        res.setStatusCode(statusCode);
        res.setMessage(message);

        res.setUser(article.getUser(), isFollow, loginUser);

        List<Picture> pictures = article.getPictures();
        for(Picture picture : pictures){
            res.getArticleImages().add(picture.getImage());
        }

        res.setArticleTitle(article.getTitle());
        res.setArticleContent(article.getContent());
        res.setArticleDate(article.getDate().toString());
        res.setTags(article.getHashtags());
        res.setLike(isLike);
        res.setLikeCount(article.getLikes().size());
        res.setCommentCount(article.getComments().size());
        res.setComments(article.getComments(), loginUser);

        return res;
    }

    public void setUser(User user, boolean isFollow, User loginUser){
            UserRes userRes = new UserRes();

            userRes.setUserId(user.getId());
            userRes.setUserName(user.getName());
            userRes.setUserImage(user.getProfileImage());
            userRes.setFollower(user.getFollowers().size());
            userRes.setFollowing(user.getFollowings().size());
            userRes.setFollow(isFollow);

            if(loginUser == user){
                userRes.setMe(true);
            }else{
                userRes.setMe(false);
            }

            this.user = userRes;
    }

    public void setTags(List<Hashtag> hashtags){
        if(hashtags.size() != 0){
            for(Hashtag hashtag : hashtags){
                this.tags.add(SubjectRes.of(hashtag.getSubject()));
            }
        }
    }

    public void setComments(List<Comment> comments, User loginUser){
        if(comments.size() != 0){
            Collections.reverse(comments);
            for(Comment comment : comments){
                this.comments.add(CommentRes.of(comment, loginUser));
            }
        }
    }
}
