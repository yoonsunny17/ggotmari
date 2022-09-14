package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Article;
import com.ssafy.db.entity.Comment;
import com.ssafy.db.entity.Hashtag;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("ArticleGetREs")
public class ArticleGetRes extends BaseResponseBody {
    @ApiModelProperty(name = "작성자 정보")
    UserRes user;
    @ApiModelProperty(name = "게시글 사진")
    String articleImage;
    @ApiModelProperty(name = "게시글 제목")
    String articleTitle;
    @ApiModelProperty(name = "게시글 내용")
    String articleContent;
    @ApiModelProperty(name = "게시글 작성 날짜")
    String articleDate;
    @ApiModelProperty(name = "태그")
    List<SubjectRes> tags = new ArrayList<>();
    @ApiModelProperty(name = "좋아요 여부")
    boolean isLike;
    @ApiModelProperty(name = "좋아요 수")
    int likeCount;
    @ApiModelProperty(name = "댓글 수")
    int commentCount;
    @ApiModelProperty(name = "댓글")
    List<CommentRes> comments = new ArrayList<>();


    public static ArticleGetRes of(Integer statusCode, String message, Article article, boolean isFollow, boolean isLike) {
        ArticleGetRes res = new ArticleGetRes();

        res.setStatusCode(statusCode);
        res.setMessage(message);

        res.setUser(article.getUser(), isFollow);
        res.setArticleImage(article.getImage());
        res.setArticleTitle(article.getTitle());
        res.setArticleContent(article.getContent());
        res.setArticleDate(article.getDate().toString());
        res.setTags(article.getHashtags());
        res.setLike(isLike);
        res.setLikeCount(article.getLikes().size());
        res.setCommentCount(article.getComments().size());
        res.setComments(article.getComments());

        return res;
    }

    public void setUser(User user, boolean isFollow){
            UserRes userRes = new UserRes();

            userRes.setUserId(user.getId());
            userRes.setUserName(user.getName());
            userRes.setUserImage(user.getProfileImage());
            userRes.setFollower(user.getFollowers().size());
            userRes.setFollowing(user.getFollowings().size());
            userRes.setFollow(isFollow);

            this.user = userRes;
    }

    public void setTags(List<Hashtag> hashtags){
        if(hashtags.size() != 0){
            for(Hashtag hashtag : hashtags){
                this.tags.add(SubjectRes.of(hashtag.getSubject()));
            }
        }
    }

    public void setComments(List<Comment> comments){
        if(comments.size() != 0){
            for(Comment comment : comments){
                this.comments.add(CommentRes.of(comment));
            }
        }
    }
}
