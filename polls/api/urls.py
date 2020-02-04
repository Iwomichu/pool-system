from django.urls import path

from .view import PollListView, PollDetailView, VoteListView

urlpatterns = [
    path('poll/', PollListView.as_view()),
    path('poll/<pk>/', PollDetailView.as_view()),
    path('poll/<pk>/votes/', VoteListView.as_view())
]
