from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
def subjects(requset):
    return Response({'result': 'OK'}, status=status.HTTP_200_OK)