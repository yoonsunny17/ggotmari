from django.urls import path
from . import views


urlpatterns = [
    path('recommend/tag/<int:user_pk>/<int:tag>', views.tag),
    path('test', views.test),
]
