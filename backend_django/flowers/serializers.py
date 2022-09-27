from rest_framework import serializers
from .models import Subject, Kind, Sale, User, FlowerLike, Article, ArticleLike, FlowerDislike


class SubjectSerializer(serializers.ModelSerializer):

    class KindSerializer(serializers.ModelSerializer):

        class Meta:
            model = Kind
            fields = '__all__'

    kind_set = KindSerializer(many=True, read_only=True)

    class Meta:

        model = Subject
        fields = '__all__'


class KindSerializer(serializers.ModelSerializer):

    class SubjectSerializer(serializers.ModelSerializer):
        
        class Meta:
            model = Subject
            fields = '__all__'

    subject = SubjectSerializer(read_only=True)

    class Meta:
        model = Kind
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):

    class FlowerlikeSerializer(serializers.ModelSerializer):

        class Meta:
            model = FlowerLike
            fields = '__all__'

    class FlowerdislikeSerializer(serializers.ModelSerializer):

        class Meta:
            model = FlowerDislike
            fields = '__all__'

    class ArticleLikeSerializer(serializers.ModelSerializer):

        class Meta:
            model = ArticleLike
            fields = '__all__'

    flowerlike_set = FlowerlikeSerializer(many=True, read_only=True)
    flowerdislike_set = FlowerdislikeSerializer(many=True, read_only=True)
    articlelike_set = ArticleLikeSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = '__all__'


class SaleSerializer(serializers.ModelSerializer):
    
    class SubjectSerializer(serializers.ModelSerializer):

        class Meta:
            model = Subject
            fields = '__all__'

    subject = SubjectSerializer(read_only=True)

    class Meta:
        model = Sale
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):
    
    class UserSerializer(serializers.ModelSerializer):

        class Meta:
            model = User
            fields = '__all__'

    class ArticleLikeSerializer(serializers.ModelSerializer):

        class Meta:
            model = ArticleLike
            fields = '__all__'

    user = UserSerializer(read_only=True)
    articlelike_set = ArticleLikeSerializer(many=True, read_only=True)

    class Meta:
        model = Article
        fields = '__all__'


class ArticleLikeSerializer(serializers.ModelSerializer):

    # class ArticleSerializer(serializers.ModelSerializer):
        
    #     class Meta:
    #         model = Article
    #         fields = '__all__'

    # class UserSerializer(serializers.ModelSerializer):

    #     class Meta:
    #         model = User
    #         fields = '__all__'

    # article = ArticleSerializer(read_only=True)
    # user = UserSerializer(read_only=True)

    class Meta:
        model = ArticleLike
        fields = '__all__'

    
class FlowerLikeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = FlowerLike
        fields = ('kind', 'user', )


class FlowerDislikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = FlowerDislike
        fields = ('kind', )