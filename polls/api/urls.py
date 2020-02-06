"""
api urls patterns
"""
from django.urls import path

from .views import PollList, PollItem, VoteListView

urlpatterns = [
    path('poll/', PollList.as_view()),
    path('poll/<pk>/', PollItem.as_view()),
    path('poll/<pk>/votes/', VoteListView.as_view()),
]
