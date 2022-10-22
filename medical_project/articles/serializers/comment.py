from rest_framework import serializers
from articles.models.comment import Comment
from user.serializers import UserInfoSerializer


class RecursiveSerializer(serializers.Serializer):
    def to_representation(self, instance):
        serializer = self.parent.parent.__class__(
            instance, context=self.context)
        return serializer.data


class CommentSerializer(serializers.ModelSerializer):
    replies = RecursiveSerializer(many=True, read_only=True)
    owner = UserInfoSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'body', 'reply', 'replies', 'owner')


class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'body', 'reply')

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        validated_data['article_id'] = self.context['view'].kwargs['id']
        return super().create(validated_data)
