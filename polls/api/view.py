from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.http import Http404
from rest_framework.response import Response

from polls.models import Poll, Vote
from .serializers import PollSerializer, VoteSerializer

class PollListView(ListAPIView):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer

class PollDetailView(RetrieveAPIView):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer

class VoteListView(APIView):

    def get(self, request, pk):
        questions = Vote.objects.filter(poll_option__poll=Poll.objects.get(pk=pk))
        serializer = VoteSerializer(questions, many=True)
        return Response(serializer.data)
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer