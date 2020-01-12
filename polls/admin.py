from django.contrib import admin

from .models import Poll, PollOption, Vote, PollPreference, PollPreferenceRelation

admin.site.register(Poll)
admin.site.register(PollOption)
admin.site.register(Vote)
admin.site.register(PollPreference)
admin.site.register(PollPreferenceRelation)