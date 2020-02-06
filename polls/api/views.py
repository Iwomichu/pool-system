"""
api views
"""
from django.contrib.auth.models import User
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import status
from django.http import Http404
from django.shortcuts import get_object_or_404

from polls.models import Poll, Vote
from .serializers import PollSerializer, VoteSerializer
from .permissions import IsOwnerOrReadOnly


class PollList(APIView):
    """ List all polls, or create new poll
    """
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request):
        """show all polls (everyone can)"""
        questions = Poll.objects.all()
        serializer = PollSerializer(questions, many=True)
        return Response(serializer.data)

    def post(self, request):
        """create new poll (only for authenticated)"""
        request.data.owner = request.user
        serializer = PollSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PollItem(APIView):
    """ Get or delete a single poll
    """
    permission_classes = (
        IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
    )

    def get_object(self, pk):
        obj = get_object_or_404(Poll, pk=pk)
        self.check_object_permissions(self.request, obj)
        return obj

    def get(self, request, pk):
        poll = self.get_object(pk)
        serializer = PollSerializer(poll)
        return Response(serializer.data)

    def delete(self, request, pk):
        question = self.get_object(pk)
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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
