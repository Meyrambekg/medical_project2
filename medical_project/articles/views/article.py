from rest_framework import generics
from rest_framework import permissions
from rest_framework.response import Response
from articles.models.article import Article
from articles.serializers.article import ArticleSerializer, ArticleDetailSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter


class ArticleList(generics.ListAPIView):
    queryset = Article.objects.filter(moderated=True).order_by('-created_at')
    serializer_class = ArticleSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )
    filter_backends = (DjangoFilterBackend, SearchFilter)
    search_fields = ('title', 'body')


class ArticleDetail(generics.RetrieveAPIView):
    lookup_field = 'id'
    queryset = Article.objects.filter(moderated=True).order_by('-created_at')
    serializer_class = ArticleDetailSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.increase_views()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
