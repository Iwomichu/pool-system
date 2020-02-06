"""
polls models
"""
from django.db import models
from django.contrib.auth.models import User


class Poll(models.Model):
    """Poll contains (title, descriptin, question, created, owner)"""
    title = models.CharField(max_length=100)
    descriptin = models.CharField(max_length=300)
    question = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        User, related_name='polls', on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class PollOption(models.Model):
    """PollOption contains (text, poll)"""
    text = models.CharField(max_length=100)
    poll = models.ForeignKey(
        Poll, related_name="poll_options", on_delete=models.CASCADE)

    class Meta:
        unique_together = ("text", "poll")

    def __str__(self):
        return self.text


class Vote(models.Model):
    """Vote contains (user, poll_option, ip_address)"""
    user = models.ForeignKey(User, related_name="votes",
                             on_delete=models.CASCADE)
    poll_option = models.ForeignKey(
        PollOption, related_name="votes", on_delete=models.CASCADE)
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    def __str__(self):
        return self.user.username + " -> " + self.poll_option.poll.title


class PollPreference(models.Model):
    """PollPreference contains (type_of_poll)"""
    MULTIPLECHOICE = 'MC'
    SINGLECHOICE = 'SC'
    ANONYMOUSPOLL = 'AP'
    TYPE_OF_POLL = [
        (MULTIPLECHOICE, 'Multiple choice'),
        (SINGLECHOICE, 'Single choice'),
        (ANONYMOUSPOLL, 'Anonymous poll'),
    ]
    type_of_poll = models.CharField(
        max_length=2, choices=TYPE_OF_POLL, default=SINGLECHOICE)

    def __str__(self):
        return self.type_of_poll


class PollPreferenceRelation(models.Model):
    """PollPreferenceRelation contains (poll, poll_preference)"""
    poll = models.ForeignKey(
        Poll, related_name="poll_preferences", on_delete=models.CASCADE)
    poll_preference = models.ForeignKey(PollPreference,
                                        related_name="poll_preferences",
                                        on_delete=models.CASCADE)

    class Meta:
        unique_together = ("poll", "poll_preference")

    def __str__(self):
        return self.poll.title + " -> " + self.poll_preference.type_of_poll
