from rest_framework.generics import ListAPIView, RetrieveAPIView

from polls.models import Poll
from .serializers import PollSerializer

class PollListView(ListAPIView):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer

class PollDetailView(RetrieveAPIView):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer