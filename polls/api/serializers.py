"""api serializers"""
from rest_framework import serializers
from django.contrib.auth.models import User
from polls.models import Poll, PollOption, Vote


class CurrentUserSerializer(serializers.ModelSerializer):
    """CurrentUserSerializer"""
    class Meta:
        model = User
        fields = ('username', 'email', 'id')


class VoteSerializer(serializers.ModelSerializer):
    """VoteSerializer"""
    class Meta:
        model = Vote
        fields = '__all__'


class VoteUserSerializer(serializers.ModelSerializer):
    """VoteUserSerializer"""
    user = CurrentUserSerializer()

    class Meta:
        model = Vote
        fields = '__all__'


class PollOptionSerializer(serializers.ModelSerializer):
    """PollOptionSerializer"""
    votes = VoteUserSerializer(many=True, read_only=True)

    class Meta:
        model = PollOption
        fields = '__all__'


class PollSerializer(serializers.ModelSerializer):
    """PollSerializer"""
    poll_options = PollOptionSerializer(many=True, read_only=True)

    class Meta:
        model = Poll
        fields = ('__all__')


class PollCreateSerializer(serializers.ModelSerializer):
    """PollCreateSerializer"""
    class Meta:
        model = Poll
        exclude = ('owner', )


class VoteCreateSerializer(serializers.ModelSerializer):
    """VoteCreateSerializer"""
    class Meta:
        model = Vote
        exclude = ('user', )
