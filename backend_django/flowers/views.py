from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Subject, Kind, User, Sale
from .serializers import SubjectSerializer, KindSerializer, UserSerializer, SaleSerializer
import numpy as np
from dateutil.relativedelta import *
from datetime import *
from django.db.models import Sum


# 코사인 유사도
# 유저1(v1)과 유저2(v2)의 코사인 유사도 구하기
def cosine_simillarity(v1, v2):

    try:
        A = np.sqrt(np.sum(np.square(v1)))
        B = np.sqrt(np.sum(np.square(v2)))
        return np.dot(v1, v2) / (A * B)

    except:
        pass


# 컬렉션 태그별 품종 추천
@api_view(['GET'])
def tag(requset, user_pk, tag):

    """
    스프링에서
    로그인 상태 확인 - 로그인 안되면 로그인으로 리다이렉트, 로그인 상태면 추천으로
    태그 확인 - 각 태그마다 5개 이상이면 추천 가능, 미만이면 추천 못하도록

    장고에서
    KNN을 사용하여 타 유저와의 유사도에 따른 추천
    (직관적, 간단, 유저나 아이템이 늘어도 안정적으로 진행, 속도 느림, 메모리 과다, 유사유저 없으면 추천 불가능)

    유저 정보 받기
    해당 유저의 태그별 컬렉션 담은 flowerlike_set 받기
    flowerlike_set에서 해당 유저가 선택한 태그에 해당하는 품종 번호만 추출 => 1로 표시, 없는 품종은 0으로 표시

    해당 유저를 포함한 모든 유저 정보 받기
    모든 유저들의 태그별 컬렉션 담은 꽃 정보 받기 users_flowerlike_set

    유저별로 코사인 유사도 구하기

    """

    user = get_object_or_404(User, pk=user_pk)
    user_flowerlike_set = UserSerializer(user).data['flowerlike_set']
    user_flowerlike_set_tag = []
    for t in user_flowerlike_set:
        if t['tag'] == tag:
            user_flowerlike_set_tag.append(t['kind'])
    # user_flowerlike_set_tag = [1, 2]

    users = User.objects.all()
    users_serializer = UserSerializer(users, many=True).data
    users_flowerlike_set = dict()
    for another_user in users_serializer:
        """
        another_user = 
        {
            "user_id": 2,
            "flowerlike_set": [
                {
                    "flower_like_id": 5,
                    "kind": 1,
                    "tag": 1,
                    "user": 2
                },
                {
                    "flower_like_id": 6,
                    "kind": 2,
                    "tag": 1,
                    "user": 2
                },
                {
                    "flower_like_id": 7,
                    "kind": 4,
                    "tag": 2,
                    "user": 2
                },
                {
                    "flower_like_id": 8,
                    "kind": 4,
                    "tag": 3,
                    "user": 2
                }
            ]
        }
        """
        another_user_flowerlike_set_tag = []

        if len(another_user['flowerlike_set']) >= 1:
            for a_t in another_user['flowerlike_set']:
                if a_t['tag'] == tag:
                    another_user_flowerlike_set_tag.append(a_t['kind'])
            users_flowerlike_set[another_user['user_id']] = another_user_flowerlike_set_tag

    """
    users_flowerlike_set = 
    {
        "1": [1, 2], 0.9999999999999998  => 제외
        "2": [1, 2], 0.9999999999999998  => 제외
        "3": [1, 2, 3], 0.8164965809277259
        "4": [1], 0.7071067811865475
        "5": [2], 0.7071067811865475
        "6": [5], 0  => 제외
        "7": [1, 2, 3, 4] 0.6324555320336759
    }
    """

    # 최근 일주일의 판매량
    yesterday = (datetime.now() + timedelta(days=-1)).strftime('%Y-%m-%d')  # 2022-09-24
    before_7days = (datetime.now() + timedelta(days=-7)).strftime('%Y-%m-%d')  # 2022-09-18

    # sale_data_7days = Sale.objects.filter(sale_date__range=[before_7days, yesterday]).values('subject').annotate(Sum('sale_size'))
    sale_data_7days = Sale.objects.filter(sale_date__range=['2022-08-14', '2022-08-20']).values('subject').annotate(Sum('sale_size')).order_by('-sale_size__sum')
    # <QuerySet [{'subject': 1, 'sale_size__sum': 55016}, {'subject': 12, 'sale_size__sum': 50898}, {'subject': 16, 'sale_size__sum': 22661}, ...]>

    kinds_len = len(get_list_or_404(Kind))  # 3215
    users_len = len(get_list_or_404(User))  # 11
    matrix_list = []

    for i in range(1, users_len+1):  # 1번유저부터 전체 인원 수까지
        user_list = [0 for _ in range(kinds_len)]  # [0, 0, 0, 0, ...]

        if users_flowerlike_set.get(i) != None:
            for j in users_flowerlike_set.get(i):

                subject_sale_point = 0  # 품목별 할당할 점수에 대한 변수 선언
                subject_id_of_flower = Kind.objects.get(pk=j).subject.subject_id
                
                try:
                    subject_sale_size = sale_data_7days.filter(subject=subject_id_of_flower).values('sale_size__sum')[0]['sale_size__sum']
                    if subject_sale_size >= 10000:  # 판매량이 1만 이상이면
                        subject_sale_point = 0.6
                    elif subject_sale_size >= 5000:  # 5천 이상이면
                        subject_sale_point = 0.3
                    elif subject_sale_size >= 1000:  #1천 이상이면
                        subject_sale_point = 0.1

                except:
                    pass

                user_list[j-1] = 1 * 0.7 + subject_sale_point * 0.3  # j는 1 이상의 번호이기 때문에 인덱스로 사용하기 위해 -1, 컬렉션 태그와 판매량 7:3비율

        matrix_list.append(user_list)

    matrix = np.array(matrix_list)

    # 유저의 컬렉션 기반 코사인 유사도
    similarity_lst = []
    max_similarity = 0

    for idx, vec in enumerate(matrix):  # 매트릭스의 각 사용자 별 벡터를 뽑아 vec에 넣기
        similarity = cosine_simillarity(vec, matrix[user_pk - 1])  # matrix[user_pk] = 추천 요청한 유저pk
        similarity_lst.append((idx + 1, similarity))

        if idx != (user_pk - 1) and max_similarity < similarity:  # 더 높은 유사도로 갱신
            max_similarity = similarity

    print(similarity_lst)

    # 유사도 * 품목별 점수 계산

    # return Response(sale_serializer.data, status=status.HTTP_200_OK)
    return Response({}, status=status.HTTP_200_OK)

    """
    key(꽃): value(유사도점수)
    싫어요에 있는 꽃은 빼고 상위에서 슬라이싱
    {
        1번꽃: [0.9]
        2번꽃: [0.8]
        3번꽃: [0.9 0.9]
        1번 3번 2번
    }
    """