package com.ssafy.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.*;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.*;
import java.util.stream.Collectors;

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

        res.setUser(UserGetUserRes.of(user, loginUser));

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

        List<UserGetFlowerRes> entire = new ArrayList<>();

        if(flowers.size() > 0) {
            for (FlowerLike flower : flowers) {
                if(tagMap.get(flower.getTag().getDear()) == null){
                    List<UserGetFlowerRes> list = new ArrayList<>();
                    UserGetFlowerRes userGetFlowerRes = UserGetFlowerRes.of(flower.getKind());

                    list.add(userGetFlowerRes);
                    entire.add(userGetFlowerRes);

                    tagMap.put(flower.getTag().getDear(), list);
                }else{
                    UserGetFlowerRes userGetFlowerRes = UserGetFlowerRes.of(flower.getKind());
                    tagMap.get(flower.getTag().getDear()).add(userGetFlowerRes);
                    entire.add(userGetFlowerRes);
                }
            }
            tagMap.put("전체", entire.stream().distinct().collect(Collectors.toList()));
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
