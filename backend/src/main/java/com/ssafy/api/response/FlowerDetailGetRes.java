package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Article;
import com.ssafy.db.entity.Subject;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("FlowerDetailGetResponse")
public class FlowerDetailGetRes extends BaseResponseBody {

    @ApiModelProperty(name = "품목 id")
    Long subjectId;
    @ApiModelProperty(name = "품목 이름")
    String subjectName;
    @ApiModelProperty(name = "꽃말")
    String subjectLanguage;
    @ApiModelProperty(name = "품종 목록")
    List<KindDetailRes> kinds;
    @ApiModelProperty(name = "게시글 목록")
    List<SubjectArticleRes> articles = new ArrayList<>();

    public static FlowerDetailGetRes of(Integer statusCode, String message, Subject subject, List<KindDetailRes> kinds, List<Article> articles) {
        FlowerDetailGetRes res = new FlowerDetailGetRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setSubjectId(subject.getId());
        res.setSubjectName(subject.getSubjectName());
        res.setSubjectLanguage(subject.getFlowerLanguage());
        res.setKinds(kinds);
        res.setArticles(articles);
        return res;
    }

    public void setArticles(List<Article> articles){
        if(articles.size() != 0){
            for(Article article : articles){
                this.articles.add(SubjectArticleRes.of(article));
            }
        }
    }
}
