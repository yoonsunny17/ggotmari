package com.ssafy.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Article;
import com.ssafy.db.entity.ArticleLike;
import com.ssafy.db.entity.FlowerLike;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.*;

@Data
@ApiModel("UserGetResponse")
public class UserGetRes extends BaseResponseBody {
    @JsonProperty("isMe")
    @ApiModelProperty(name = "본인 여부")
    boolean isMe;

    @ApiModelProperty(name = "유저 정보")
    UserGetUserRes user;

    @ApiModelProperty(name = "유저가 쓴 글 목록")
    List<UserGetArticleRes> articles = new ArrayList<>();

    @ApiModelProperty(name = "유저가 좋아하는 꽃 목록")
    List<UserGetLikeFlowerRes> likeFlowers = new ArrayList<>();

    @ApiModelProperty(name = "유저가 좋아하는 글 목록")
    List<UserGetLikeArticleRes> likeArticles = new ArrayList<>();

    public static UserGetRes of(Integer statusCode, String message ,User user, User loginUser){
        UserGetRes res = new UserGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        if(user == null){
            return res;
        }

        if(user.getId() == loginUser.getId()){
            res.setMe(true);
        }else{
            res.setMe(false);
        }

        res.setUser(UserGetUserRes.of(user));

        res.setArticles(user.getArticles());

        res.setLikeFlowers(user.getFlowers());

        res.setLikeArticle(user.getLikes());

        return res;
    }

    public void setArticles(List<Article> articles) {
        if(articles.size() > 0) {
            for (Article article : articles) {
                this.articles.add(UserGetArticleRes.of(article));
            }
        }
    }

    public void setLikeFlowers(List<FlowerLike> flowers){
        Map<String, List<UserGetFlowerRes>> tagMap = new HashMap<>();

        if(flowers.size() > 0) {
            for (FlowerLike flower : flowers) {
                if(tagMap.get(flower.getTag().getDear()) == null){
                    List<UserGetFlowerRes> list = new ArrayList<>();
                    list.add(UserGetFlowerRes.of(flower.getKind()));
                    tagMap.put(flower.getTag().getDear(), list);
                }else{
                    tagMap.get(flower.getTag().getDear()).add(UserGetFlowerRes.of(flower.getKind()));
                }
            }
        }

        for(String key : tagMap.keySet()){
            likeFlowers.add(UserGetLikeFlowerRes.of(key, tagMap.get(key)));
        }
    }

    public void setLikeArticle(List<ArticleLike> articleLikes) {
        if(articleLikes.size() > 0) {
            for (ArticleLike articleLike : articleLikes) {
                this.likeArticles.add(UserGetLikeArticleRes.of(articleLike.getArticle()));
            }
        }
    }
}
