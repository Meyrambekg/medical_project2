from django.urls import path
from articles.views.article import ArticleDetail, ArticleList
from articles.views.comment import CommentDetail, CommentList


urlpatterns = [
    path('', ArticleList.as_view()),
    path('<int:id>/', ArticleDetail.as_view()),
    path('<int:id>/comments/', CommentList.as_view()),
    path('<int:article_id>/comments/<int:id>/', CommentDetail.as_view()),
]
