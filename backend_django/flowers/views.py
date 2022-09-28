from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Kind, User, FlowerLike, FlowerDislike, ArticleLike, Article
from .serializers import UserSerializer, FlowerLikeSerializer, FlowerDislikeSerializer, ArticleLikeSerializer
import numpy as np
from dateutil.relativedelta import *
from datetime import *
import time
from sklearn.metrics.pairwise import cosine_similarity
import redis
import my_settings


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

    kind_len = Kind.objects.all().count()
    user_len = User.objects.all().count()

    matrix = np.zeros((user_len, kind_len))  # [[0,0,0...], [0,0,0,...], ...]

    for like in all_user_like_serializer:
        matrix[like['user']-1][like['kind']-1] = 1

    cosine_sim = cosine_similarity(matrix, matrix)[user_pk-1]

    like_flower = FlowerLike.objects.filter(tag=tag).values_list('kind_id', 'user_id')

    flower_dic = dict()  # 추천할 꽃 후보들

    all_kind = np.array(Kind.objects.all())


    # yesterday = (datetime.now() + timedelta(days=-1)).strftime('%Y-%m-%d')
    yesterday = '2022-09-05' # 임시

    with redis.StrictRedis(host='172.17.0.1', port=6379, db=2, charset='utf-8', decode_responses=True, password=my_settings.mysql_password) as connect:
        subject_sales = connect.hgetall(yesterday)

    for flower in like_flower:
        if flower[1] != user_pk:  # flower[0]==품종pk, flower[1]==유저pk

            if cosine_sim[flower[1]-1] >= 0.5:  # 유사도 0.5 이상


                # 판매점수
                subject_id_of_flower = str(all_kind[flower[0]-1].subject.subject_id)  # 품종의 품목번호
                subject_sale_point = int(subject_sales.get(subject_id_of_flower, 0))


                # 유사도:판매점수 == 7:3
                if flower_dic.get(flower[0]) == None:
                    flower_dic[flower[0]] = [cosine_sim[flower[1]-1]*0.7 + subject_sale_point*0.3/10]
                
                else:
                    flower_dic[flower[0]].append(cosine_sim[flower[1]-1]*0.7 + subject_sale_point*0.3/10)

    for key in flower_dic.keys():
        flower_dic[key].sort(reverse=True)

    sorted_flower_dic = sorted(flower_dic.items(), key=lambda item: item[1], reverse=True)


    # 추천 결과 result에 담기
    result = []
    cnt = 0

    for flower in sorted_flower_dic:
        if flower[0] in like_lst or flower[0] in dislike_lst:  # 좋아요에 이미 있으면 제외, 싫어요에 있으면 제외
            continue
        else:
            result.append(flower[0])
            cnt += 1
        if cnt == 18:  # 18개까지 추천
            break

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

    article_len = Article.objects.all().count()
    user_len = User.objects.all().count()

    matrix = np.zeros((user_len, article_len))  # [[0,0,0...], [0,0,0,...], ...]

    for like in all_user_like_serializer:
        matrix[like['user']-1][like['article']-1] = 1

    cosine_sim = cosine_similarity(matrix, matrix)[user_pk-1]

    like_article = ArticleLike.objects.values_list('article_id', 'user_id')

    article_dic = dict()  # 추천할 게시글 후보들

    for article in like_article:
        if article[1] != user_pk:  # article[0]==게시글pk, article[1]==유저pk

            if cosine_sim[article[1]-1] >= 0.5:  # 유사도 0.5 이상

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

    for article in sorted_article_dic:
        if article[0] in like_lst:  # 좋아요에 이미 있으면 제외
            continue
        else:
            result.append(article[0])
            cnt += 1
        if cnt == 4:  # 4개까지 추천
            break

    return Response({'time': time.time() - start, 'result': result}, status=status.HTTP_200_OK)