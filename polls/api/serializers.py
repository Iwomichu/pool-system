from rest_framework import serializers
from polls.models import Poll, PollOption, Vote
from django.contrib.auth.models import User

class PollSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Poll
        fields = '__all__'

class PollOptionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = PollOption
        fields = '__all__'

class VoteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Vote
        fields = '__all__'