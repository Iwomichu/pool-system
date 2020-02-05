"""
api views
"""
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response

from polls.models import Poll, Vote
from .serializers import PollSerializer, VoteSerializer


class PollListView(ListAPIView):
    """PollListView class"""
    queryset = Poll.objects.all()
    serializer_class = PollSerializer


class PollDetailView(RetrieveAPIView):
    """PollDetailView class"""
    queryset = Poll.objects.all()
    serializer_class = PollSerializer


class VoteListView(APIView):
    """VoteListView class"""

    def get(self, request, p_k):
        """get all votes from poll id"""
        questions = Vote.objects.filter(
            poll_option__poll=Poll.objects.get(pk=p_k))
        serializer = VoteSerializer(questions, many=True)
        return Response(serializer.data)
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
