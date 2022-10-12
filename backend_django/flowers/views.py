from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Kind, User, FlowerLike, FlowerDislike, ArticleLike, Article, Subject, Popular
from .serializers import UserSerializer, FlowerLikeSerializer, FlowerDislikeSerializer, ArticleLikeSerializer, ArticleSerializer
import numpy as np
from dateutil.relativedelta import *
from datetime import *
import time
from sklearn.metrics.pairwise import cosine_similarity
import redis
import my_settings
from sklearn.feature_extraction.text import TfidfVectorizer
from konlpy.tag import Okt


# 컬렉션 태그 기반 상황별 꽃 추천
@api_view(['POST'])
def situation(request):
    start = time.time()

    user_pk = int(request.data['userId'])
    tag = int(request.data['tagId'])


    # 추천 요청한 유저가 태그별 좋아하는 꽃과 싫어하는 꽃 목록
    user_like = FlowerLike.objects.filter(tag=tag, user=user_pk)

    user_like_serializer = FlowerLikeSerializer(user_like, many=True).data

    like_lst = []
    for like in user_like_serializer:
        like_lst.append(like['kind'])

    user_dislike = FlowerDislike.objects.filter(user=user_pk)
    user_dislike_serializer = FlowerDislikeSerializer(user_dislike, many=True).data

    dislike_lst = []
    for dislike in user_dislike_serializer:
        dislike_lst.append(dislike['kind'])


    # 요청자 포함 모든 사람들의 좋아요 정보
    all_user_like = get_list_or_404(FlowerLike, tag=tag)
    all_user_like_serializer = FlowerLikeSerializer(all_user_like, many=True).data


    # 품종 수, 유저 수
    kind_len = Kind.objects.all().count()

    tmp = User.objects.all().values('user_id')
    user_lst = []
    for user in tmp:
        user_lst.append(user['user_id'])
    user_last = max(user_lst)  # 마지막 유저의 pk

    matrix = np.zeros((user_last, kind_len))  # [[0,0,0...], [0,0,0,...], ...]

    for like in all_user_like_serializer:
        matrix[like['user']-1][like['kind']-1] = 1

    cosine_sim = cosine_similarity(matrix, matrix)[user_pk-1]

    like_flower = FlowerLike.objects.filter(tag=tag).values_list('kind_id', 'user_id')

    flower_dic = dict()  # 추천할 꽃 후보들

    all_kind = np.array(Kind.objects.all())


    yesterday = (datetime.now() + timedelta(days=-1)).strftime('%Y-%m-%d')
    yesterday_one_year_ago = str(int(yesterday[0:4])-1) + yesterday[4:]
    yesterday_two_years_ago = str(int(yesterday[0:4])-2) + yesterday[4:]

    with redis.StrictRedis(host='172.17.0.1', port=6379, db=2, charset='utf-8', decode_responses=True, password=my_settings.mysql_password) as connect:
    # with redis.StrictRedis(host='j7a303.p.ssafy.io', port=6379, db=2, charset='utf-8', decode_responses=True, password=my_settings.mysql_password) as connect:
        subject_sales = connect.hgetall(yesterday)
        subject_sales_one_year_ago = connect.hgetall(yesterday_one_year_ago)
        subject_sales_two_years_ago = connect.hgetall(yesterday_two_years_ago)

    for flower in like_flower:
        if flower[1] != user_pk:  # flower[0]==품종pk, flower[1]==유저pk

            if cosine_sim[flower[1]-1] >= 0.3:  # 유사도 0.3 이상


                # 판매점수
                subject_id_of_flower = str(all_kind[flower[0]-1].subject.subject_id)  # 품종의 품목번호

                subject_sale_point = int(subject_sales.get(subject_id_of_flower, 0))
                subject_sale_point_one_year_ago = int(subject_sales_one_year_ago.get(subject_id_of_flower, 0))
                subject_sale_point_two_years_ago = int(subject_sales_two_years_ago.get(subject_id_of_flower, 0))
                

                # 유사도:판매점수 == 7:3, 판매점수는 올해:작년:재작년 == 6:3:1
                if flower_dic.get(flower[0]) == None:
                    flower_dic[flower[0]] = [cosine_sim[flower[1]-1]*0.7 + (subject_sale_point*0.6+subject_sale_point_one_year_ago*0.3+subject_sale_point_two_years_ago*0.1)*0.3/10]
                
                else:
                    flower_dic[flower[0]].append(cosine_sim[flower[1]-1]*0.7 + (subject_sale_point*0.6+subject_sale_point_one_year_ago*0.3+subject_sale_point_two_years_ago*0.1)*0.3/10)

    for key in flower_dic.keys():
        flower_dic[key].sort(reverse=True)

    sorted_flower_dic = sorted(flower_dic.items(), key=lambda item: item[1], reverse=True)


    # 추천 결과 result에 담기
    result = []
    cnt = 0
    ggotmari = [3356, 3357, 3358, 3359, 3360, 3361]

    for flower in sorted_flower_dic:
        if flower[0] in like_lst or flower[0] in dislike_lst or flower[0] in ggotmari:  # 좋아요에 이미 있으면 제외, 싫어요에 있으면 제외, 꽃마리 제외
            continue
        else:
            result.append(flower[0])
            cnt += 1
        if cnt == 18:  # 18개까지 추천
            break

    
    popular_flowers_dic = dict()

    for flower in all_user_like_serializer:
        if popular_flowers_dic.get(flower['kind']) == None:
            popular_flowers_dic[flower['kind']] = 1
        else:
            popular_flowers_dic[flower['kind']] += 1

    popular_flowers_lst = list(popular_flowers_dic.items())

    popular_flowers_lst.sort(key=lambda x: (x[1], -x[0]), reverse=True)

    idx = 0
    while len(result) < 18:
        result.append(popular_flowers_lst[idx][0])
        idx += 1
        

    return Response({'time': time.time() - start, 'result': result}, status=status.HTTP_200_OK)


# 좋아요 기반 게시글 추천
@api_view(['POST'])
def article(request):
    start = time.time()

    user_pk = int(request.data['userId'])

    # 추천 요청한 유저가 좋아하는 게시글 목록
    user_like = ArticleLike.objects.filter(user=user_pk)
    user_like_serializer = ArticleLikeSerializer(user_like, many=True).data

    like_lst = []
    for like in user_like_serializer:
        like_lst.append(like['article'])

    # 요청자 포함 모든 사람들의 좋아요 정보
    all_user_like = ArticleLike.objects.all()
    all_user_like_serializer = ArticleLikeSerializer(all_user_like, many=True).data

    tmp = Article.objects.all().values('article_id')
    article_lst = []
    for article in tmp:
        article_lst.append(article['article_id'])
    article_last = max(article_lst)  # 마지막 글의 pk
    
    tmp2 = User.objects.all().values('user_id')
    user_lst = []
    for user in tmp2:
        user_lst.append(user['user_id'])
    user_last = max(user_lst)  # 마지막 유저의 pk

    matrix = np.zeros((user_last, article_last))  # [[0,0,0...], [0,0,0,...], ...]

    for like in all_user_like_serializer:
        matrix[like['user']-1][like['article']-1] = 1

    cosine_sim = cosine_similarity(matrix, matrix)[user_pk-1]

    like_article = ArticleLike.objects.values_list('article_id', 'user_id')

    article_dic = dict()  # 추천할 게시글 후보들

    for article in like_article:
        if article[1] != user_pk:  # article[0]==게시글pk, article[1]==유저pk

            if cosine_sim[article[1]-1] >= 0.3:  # 유사도 0.3 이상

                if article_dic.get(article[0]) == None:
                    article_dic[article[0]] = [cosine_sim[article[1]-1]]
                
                else:
                    article_dic[article[0]].append(cosine_sim[article[1]-1])

    for key in article_dic.keys():
        article_dic[key].sort(reverse=True)

    sorted_article_dic = sorted(article_dic.items(), key=lambda item: item[1], reverse=True)

    # 추천 결과 result에 담기
    result = []
    cnt = 0

    my_article = Article.objects.filter(user_id=user_pk)
    my_article_serializer = ArticleSerializer(my_article, many=True).data
    my_article_lst = []
    for article in my_article_serializer:
        my_article_lst.append(article['article_id'])

    for article in sorted_article_dic:
        if article[0] in like_lst or article[0] in my_article_lst:  # 좋아요에 이미 있으면 제외, 내가 쓴 글 제외
            continue
        else:
            result.append(article[0])
            cnt += 1
        if cnt == 4:  # 4개까지 추천
            break

    result_cnt = len(result)
    if result_cnt < 4:
        today = datetime.now().strftime('%Y-%m-%d')

        popular_articles = Popular.objects.filter(popular_date=today).values('article_id')[:4-result_cnt]

        for article in popular_articles:
            result.append(article['article_id'])

    return Response({'time': time.time() - start, 'result': result}, status=status.HTTP_200_OK)


# 편지 내용 기반 꽃 추천
@api_view(['POST'])
def letter(request):
    start = time.time()

    content = request.data['content']

    okt = Okt()

    text_list = [content]

    all_flower_language = Subject.objects.all().values('flower_language')

    for flower in all_flower_language:
        flower_language = flower['flower_language']

        text_list.append(flower_language)

    text_nouns_list = [' '.join(okt.morphs(text)) for text in text_list]

    tfidf_vectorizer = TfidfVectorizer(min_df=1)
    tfidf_matrix = tfidf_vectorizer.fit_transform(text_nouns_list)
    doc_similarities = (tfidf_matrix * tfidf_matrix.T)

    lst = list(enumerate(doc_similarities.toarray()[0]))
    lst.sort(key=lambda x: (x[1], -x[0]), reverse=True)

    result = lst[1][0]  # 유사도가 가장 높은 꽃품종id
    if lst[1][1] == 0:  # 유사도가 0이면 -1 리턴
        result = -1
    
    if lst[1][0] == 278:  # 꽃마리 제외
        result = -1

    return Response({'result': result})
