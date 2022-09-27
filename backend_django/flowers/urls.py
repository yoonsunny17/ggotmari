from django.urls import path
from . import views


urlpatterns = [
    path('situation', views.situation),
    path('article', views.article),
]
