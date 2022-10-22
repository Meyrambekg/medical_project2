from rest_framework import generics
from rest_framework import permissions
from articles.models.comment import Comment
from articles.permissions import ObjectOwnerOrAdmin
from articles.serializers.comment import CommentSerializer, CommentCreateSerializer


class CommentList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    lookup_field = 'id'

    def get_queryset(self):
        return Comment.objects.filter(article_id=self.kwargs.get(self.lookup_field), reply__isnull=True)

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CommentCreateSerializer
        return CommentSerializer


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, ObjectOwnerOrAdmin)

    def get_serializer_class(self):
        edit_methods = ("POST", "PUT", "PATCH", "DELETE")
        if self.request.method in edit_methods:
            return CommentCreateSerializer
        return CommentSerializer

    def get_queryset(self):
        return Comment.objects.all()
