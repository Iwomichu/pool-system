"""
api urls patterns
"""
from django.urls import path

from .views import PollList, PollItem, VoteListView, PollOptionsList, PollOptionItem, PollListText

urlpatterns = [
    path('poll/', PollList.as_view()),
    path('poll/vote/', VoteListView.as_view()),
    path('poll/options/', PollOptionsList.as_view()),
    path('poll/options/<p_k>/', PollOptionItem.as_view()),
    path('poll/<p_k>/', PollItem.as_view()),
    path('poll/<p_k>/votes/', VoteListView.as_view()),
    path('poll/<p_k>/only_options/', PollListText.as_view()),

]
