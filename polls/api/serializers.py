from rest_framework import serializers
from polls.models import Poll, PollOption, Vote
from django.contrib.auth.models import User


class CurrentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'id')


class VoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vote
        fields = '__all__'


class VoteUserSerializer(serializers.ModelSerializer):
    user = CurrentUserSerializer()

    class Meta:
        model = Vote
        fields = '__all__'


class PollOptionSerializer(serializers.ModelSerializer):
    votes = VoteUserSerializer(many=True, read_only=True)

    class Meta:
        model = PollOption
        fields = '__all__'


class PollSerializer(serializers.ModelSerializer):
    poll_options = PollOptionSerializer(many=True, read_only=True)

    class Meta:
        model = Poll
        fields = ('__all__')


class PollCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Poll
        exclude = ('owner', )


class VoteCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vote
        exclude = ('user', )
