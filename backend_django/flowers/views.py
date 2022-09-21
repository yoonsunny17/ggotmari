from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Subject, Kind, User
from .serializers import SubjectSerializer, KindSerializer, UserSerializer


@api_view(['GET'])
def subjects(requset):

    # f = get_object_or_404(Subject, pk=1)
    # serializer = SubjectSerializer(f)

    # f = get_object_or_404(Kind, pk=1)
    # serializer = KindSerializer(f)

    f = get_object_or_404(User, pk=1)
    serializer = UserSerializer(f)

    return Response(serializer.data, status=status.HTTP_200_OK)