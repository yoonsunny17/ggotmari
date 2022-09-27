# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
# from django.conf import settings


class User(models.Model):
    user_id = models.BigAutoField(primary_key=True)
    age = models.IntegerField()
    birthday = models.DateField(blank=True, null=True)
    email = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField()
    login_count = models.BigIntegerField()
    name = models.CharField(max_length=255, blank=True, unique=True)
    profile_image = models.CharField(max_length=255, blank=True)
    sex = models.BooleanField()

    class Meta:
        managed = True
        db_table = 'user'


class Subject(models.Model):
    subject_id = models.BigAutoField(primary_key=True)
    flower_language = models.CharField(max_length=255, blank=True)
    subject_name = models.CharField(max_length=255, unique=True)

    class Meta:
        managed = True
        db_table = 'subject'


class Article(models.Model):
    article_id = models.BigAutoField(primary_key=True)
    content = models.TextField(blank=True)
    date = models.DateTimeField()
    image = models.CharField(max_length=255, blank=True)
    title = models.CharField(max_length=255)
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'article'


class ArticleLike(models.Model):
    article_like_id = models.BigAutoField(primary_key=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, models.PROTECT)
    user = models.ForeignKey(User, models.PROTECT)

    class Meta:
        managed = True
        db_table = 'article_like'


class Comment(models.Model):
    comment_id = models.BigAutoField(primary_key=True)
    content = models.TextField()
    date = models.DateTimeField()
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'comment'


class DailyFlower(models.Model):
    daily_flower_id = models.BigAutoField(primary_key=True)
    flower_name = models.CharField(max_length=255)
    flower_content = models.CharField(max_length=255)
    flower_date = models.CharField(max_length=255)
    flower_image = models.CharField(max_length=255)
    flower_language = models.CharField(max_length=255)

    class Meta:
        managed = True
        db_table = 'daily_flower'


class Kind(models.Model):
    kind_id = models.BigAutoField(primary_key=True)
    flower_image = models.CharField(max_length=255, blank=True)
    kind_name = models.CharField(max_length=255)
    subject = models.ForeignKey(Subject, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'kind'


class Tag(models.Model):
    tag_id = models.BigAutoField(primary_key=True)
    dear = models.CharField(max_length=255)

    class Meta:
        managed = True
        db_table = 'tag'


class FlowerLike(models.Model):
    flower_like_id = models.BigAutoField(primary_key=True)
    kind = models.ForeignKey(Kind, on_delete=models.PROTECT)
    tag = models.ForeignKey(Tag, on_delete=models.PROTECT)
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'flower_like'


class FlowerDislike(models.Model):
    flower_dislike_id = models.BigAutoField(primary_key=True)
    kind = models.ForeignKey(Kind, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'flower_dislike'


class Follow(models.Model):
    follow_id = models.BigAutoField(primary_key=True)
    following_user_user = models.ManyToManyField('self', symmetrical=False, related_name='follow_user_user')

    class Meta:
        managed = True
        db_table = 'follow'


class Hashtag(models.Model):
    hashtag_id = models.BigAutoField(primary_key=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'hashtag'


class Picture(models.Model):
    picture_id = models.BigAutoField(primary_key=True)
    image = models.CharField(max_length=255, blank=True)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)

    class Meta:
        managed = True
        db_table = 'picture'


class Popular(models.Model):
    popular_id = models.BigAutoField(primary_key=True)
    popular_date = models.DateField()
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'popular'


class Sale(models.Model):
    sale_id = models.BigAutoField(primary_key=True)
    sale_date = models.DateField()
    sale_size = models.IntegerField()
    subject = models.ForeignKey(Subject, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'sale'


class Survey(models.Model):
    survey_id = models.BigAutoField(primary_key=True)
    question = models.TextField()
    tag = models.ForeignKey(Tag, on_delete=models.PROTECT)

    class Meta:
        managed = True
        db_table = 'survey'



