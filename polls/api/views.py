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

from polls.models import Poll, Vote, PollOption
from .serializers import PollSerializer, VoteSerializer, PollOptionSerializer, PollSerializerText, PollOptionSerializerText
from .permissions import IsOwnerOrReadOnly


class PollListText(APIView):
    """ List all polls with only options"""
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_object(self, p_k):
        obj = get_object_or_404(Poll, pk=p_k)
        self.check_object_permissions(self.request, obj)
        return obj

    def get(self, request, p_k):
        poll = self.get_object(p_k)
        x = poll.poll_options.all().values_list('text', flat=True)
        x = [{"text": el} for el in x]
        return Response({"title": poll.title,
                         "question": poll.question,
                         "description": poll.description,
                         "options": [
                             x
                         ]})


class PollList(APIView):
    """ List all polls, or create new poll"""
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
    """ Get or delete a single poll"""
    permission_classes = (
        IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
    )

    def get_object(self, p_k):
        obj = get_object_or_404(Poll, pk=p_k)
        self.check_object_permissions(self.request, obj)
        return obj

    def get(self, request, p_k):
        poll = self.get_object(p_k)
        serializer = PollSerializer(poll)
        return Response(serializer.data)

    def delete(self, request, p_k):
        question = self.get_object(p_k)
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PollOptionsList(APIView):
    """Create new option"""
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        serializer = PollOptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PollOptionItem(APIView):
    """ Get, delete a option"""
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_object(self, p_k):
        try:
            return PollOption.objects.get(pk=p_k)
        except PollOption.DoesNotExist:
            raise Http404

    def get(self, request, p_k):
        poll_option = self.get_object(p_k)
        serializer = PollOptionSerializer(poll_option)
        return Response(serializer.data)

    def delete(self, request, p_k):
        poll_option = self.get_object(p_k)
        poll_option.delete()
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
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, p_k):
        """get all votes from poll id"""
        questions = Vote.objects.filter(
            poll_option__poll=Poll.objects.get(pk=p_k))
        serializer = VoteSerializer(questions, many=True)
        return Response(serializer.data)

    def put(self, request):
        """create new vote"""
        request.data.user = request.user
        serializer = VoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)