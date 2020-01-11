from django.db import models
from django.contrib.auth.models import User


class Poll(models.Model):
    title = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, related_name="polls", on_delete=models.CASCADE)

class PollOption(models.Model):
    text = models.CharField(max_length=100)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)
    
class Vote(models.Model):
    user = models.ForeignKey(User, related_name="votes", on_delete=models.CASCADE, null=True)
    poll_option = models.ForeignKey(PollOption, on_delete=models.CASCADE)
    ip_address = models.GenericIPAddressField()

    class Meta:
        unique_together = (("user", "poll_option"),("ip_address", "poll_option"),)
