from django.urls import path

from .view import PollListView, PollDetailView

urlpatterns = [
    path('', PollListView.as_view()),
    path('<pk>', PollDetailView.as_view())
]