from django.db import models
from django.contrib.auth.models import User


class Poll(models.Model):
    title = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, related_name='polls', on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class PollOption(models.Model):
    text = models.CharField(max_length=100)
    poll = models.ForeignKey(Poll, related_name="poll_options", on_delete=models.CASCADE)

    class Meta:
        unique_together = ("text", "poll")

    def __str__(self):
        return self.text
    
class Vote(models.Model):
    user = models.ForeignKey(User, related_name="votes", on_delete=models.CASCADE, null=True)
    poll_option = models.ForeignKey(PollOption, related_name="votes", on_delete=models.CASCADE)
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    class Meta:
        unique_together = (("user", "poll_option"),("ip_address", "poll_option"))

    def __str__(self):
        return self.user.username + " -> " + self.poll_option.poll.title

class PollPreference(models.Model):
    MULTIPLECHOICE = 'MC'
    SINGLECHOICE = 'SC'
    ANONYMOUSPOLL = 'AP'
    TYPE_OF_POLL = [
        (MULTIPLECHOICE, 'Multiple choice'),
        (SINGLECHOICE, 'Single choice'),
        (ANONYMOUSPOLL, 'Anonymous poll'),
    ]
    type_of_poll = models.CharField(max_length=2, choices=TYPE_OF_POLL, default=SINGLECHOICE)

    def __str__(self):
        return self.type_of_poll


class PollPreferenceRelation(models.Model):
    poll = models.ForeignKey(Poll, related_name="poll_preferences", on_delete=models.CASCADE)
    poll_preference = models.ForeignKey(PollPreference, related_name="poll_preferences", on_delete=models.CASCADE)

    def __str__(self):
        return self.poll.title + " -> " + self.poll_preference.type_of_poll