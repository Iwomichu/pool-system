"""
api views
"""
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django import http
from django.shortcuts import get_object_or_404

from polls.models import Poll, Vote, PollOption
from .serializers import CurrentUserSerializer, PollSerializer, VoteUserSerializer,\
    PollOptionSerializer, PollCreateSerializer, VoteCreateSerializer
from .permissions import IsOwnerOrReadOnly


class UserView(APIView):
    """UserView from id get user information"""

    def get_user(self, p_k):
        """get user"""
        try:
            return User.objects.get(pk=p_k)
        except User.DoesNotExist:
            raise http.Http404

    def get(self, request, p_k):
        """get method"""
        user = self.get_user(p_k)
        serializer = CurrentUserSerializer(user)
        return Response(serializer.data)


class PollListText(APIView):
    """ List all polls with only options"""
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_object(self, p_k):
        """get objects"""
        obj = get_object_or_404(Poll, pk=p_k)
        self.check_object_permissions(self.request, obj)
        return obj

    def get(self, request, p_k):
        """get method"""
        poll = self.get_object(p_k)
        options = poll.poll_options.all().values_list('text', flat=True)
        options = [{"text": el} for el in options]
        return Response({"title": poll.title,
                         "question": poll.question,
                         "description": poll.description,
                         "options": options})


class PollList(APIView):
    """ List all polls, or create new poll"""
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request):
        """show all polls (everyone can)"""
        questions = Poll.objects.all()
        serializer = PollSerializer(questions, many=True)
        return Response(serializer.data)

    def get_poll(self, p_k):
        """get poll"""
        try:
            return Poll.objects.get(pk=p_k)
        except Poll.DoesNotExist:
            raise http.Http404

    def post(self, request):
        """create new poll (only for authenticated)"""
        list_poll_options = []
        if request.data["poll_options"][1:-1].split(",") != [""]:
            list_poll_options = request.data["poll_options"][1:-1].split(",")
        serializer = PollCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            if len(list_poll_options) > 0:
                poll_id = self.get_poll(serializer.data["id"])
                for text in list_poll_options:
                    PollOption.objects.create(text=text.replace(
                        "\"", ""), poll=poll_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PollItem(APIView):
    """ Get or delete a single poll"""
    permission_classes = (
        IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
    )

    def get_object(self, p_k):
        """get objects permissions"""
        obj = get_object_or_404(Poll, pk=p_k)
        self.check_object_permissions(self.request, obj)
        return obj

    def get(self, request, p_k):
        """get method"""
        poll = self.get_object(p_k)
        serializer = PollSerializer(poll)
        return Response(serializer.data)

    def delete(self, request, p_k):
        """deleted method"""
        question = self.get_object(p_k)
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PollOptionsList(APIView):
    """Create new option"""
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        """post method"""
        serializer = PollOptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PollOptionItem(APIView):
    """ Get, delete a option"""
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_object(self, p_k):
        """get objects poll option"""
        try:
            return PollOption.objects.get(pk=p_k)
        except PollOption.DoesNotExist:
            raise http.Http404

    def get(self, request, p_k):
        """get method"""
        poll_option = self.get_object(p_k)
        serializer = PollOptionSerializer(poll_option)
        return Response(serializer.data)

    def delete(self, request, p_k):
        """delete method"""
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


class UserVotesView(APIView):
    """User votes"""
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        """get method"""
        votes = request.user.votes.all()
        list_votes = []
        for vote in votes:
            list_votes.append(
                {"poll_option_text": vote.poll_option.text,
                 "poll_title": vote.poll_option.poll.title,
                 "poll_id": vote.poll_option.poll.id
                 }
            )
        return Response(list_votes)


class VoteListView(APIView):
    """VoteListView class"""
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, p_k):
        """get all votes from poll id"""
        questions = Vote.objects.filter(
            poll_option__poll=Poll.objects.get(pk=p_k))
        serializer = VoteUserSerializer(questions, many=True)
        return Response(serializer.data)

    def get_user(self, p_k):
        """get user"""
        try:
            return User.objects.get(pk=p_k)
        except User.DoesNotExist:
            raise http.Http404

    def put(self, request):
        """create new vote"""
        serializer = VoteCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
