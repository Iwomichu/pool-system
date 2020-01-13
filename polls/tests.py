from django.test import TestCase
from django.contrib.auth.models import User
from django.db.utils import IntegrityError

from .models import Poll, PollOption, Vote, PollPreference, PollPreferenceRelation

class PollAndPollOptionModelTests(TestCase):

    def setUp(self):
        self.user1 = User.objects.create(
            username='user1',
            email='user1@example.com',
            password='password'
        )
        self.user2 = User.objects.create(
            username='user2',
            email='user2@example.com',
            password='password'
        )
        self.poll1 = Poll.objects.create(title='Title of the poll_1?', owner=self.user1)
        self.poll2 = Poll.objects.create(title='Title of the poll_2?', owner=self.user1)
        self.poll3 = Poll.objects.create(title='Title of the poll_3?', owner=self.user2)

        self.poll_option1 = PollOption.objects.create(text="option_1 for poll_1", poll=self.poll1)
        self.poll_option2 = PollOption.objects.create(text="option_2 for poll_1", poll=self.poll1)
        self.poll_option3 = PollOption.objects.create(text="Option_3 for poll_2", poll=self.poll2)


    def test_show_poll_options_from_poll(self):
        """
        poll1 contains poll_option1 and poll_option2
        """
        poll_option1 = self.poll1.poll_options.all().values_list('text', flat=True) 

        self.assertEqual(list(poll_option1), [self.poll_option1.text, self.poll_option2.text])


    def test_delete_user(self):
        """
        Deleting users should delete their polls
        """
        self.user1.delete()

        self.assertIs(
            Poll.objects.filter(id=self.poll1.id).exists(),
            Poll.objects.filter(id=self.poll2.id).exists(),
            False
        )


    def test_delete_poll(self):
        """
        Deleting polls should delete all of their own poll options
        """
        self.poll1.delete()

        self.assertIs(
            PollOption.objects.filter(id=self.poll_option1.id).exists(),
            PollOption.objects.filter(id=self.poll_option2.id).exists(),
            False
        )
        

    def test_count_all_user_polls(self):
        """
        user1 has 2 polls, user2 has 1 poll
        """
        user1_polls = self.user1.polls.all()
        user2_polls = self.user2.polls.all()
        
        self.assertEqual(user1_polls.count(), 2)
        self.assertEqual(user2_polls.count(), 1)


    def test_same_poll_option_for_one_poll(self):
        """
        pol_options cannot be duplicates
        """
        with self.assertRaises(Exception) as raised:
            PollOption.objects.create(text="option_2 for poll_1", poll=self.poll1)
        
        self.assertEqual(IntegrityError, type(raised.exception))

class VoteModelTests(TestCase):

    def setUp(self):
        self.user1 = User.objects.create(
            username='user1',
            email='user1@example.com',
            password='password'
        )
        self.user2 = User.objects.create(
            username='user2',
            email='user2@example.com',
            password='password'
        )
        self.poll1 = Poll.objects.create(title='Title of the poll_1?', owner=self.user1)
        self.poll2 = Poll.objects.create(title='Title of the poll_2?', owner=self.user1)

        self.poll_option1 = PollOption.objects.create(text="option_1 for poll_1", poll=self.poll1)
        self.poll_option2 = PollOption.objects.create(text="option_2 for poll_1", poll=self.poll1)
        self.poll_option3 = PollOption.objects.create(text="option_3 for poll_2", poll=self.poll2)

        self.vote1 = Vote.objects.create(user=self.user1, poll_option=self.poll_option1)
        self.vote2 = Vote.objects.create(user=self.user2, poll_option=self.poll_option2)
        self.vote3 = Vote.objects.create(user=self.user1, poll_option=self.poll_option3)
        self.vote3 = Vote.objects.create(user=self.user2, poll_option=self.poll_option1)


    def test_count_vote_from_poll(self):
        """
        poll1 has three votes, poll2 one vote
        """

        sum_votes_poll1 = Vote.objects.select_related('poll_option__poll').filter(poll_option__poll=self.poll1).count()
        sum_votes_poll2 = Vote.objects.select_related('poll_option__poll').filter(poll_option__poll=self.poll2).count()

        self.assertEqual(sum_votes_poll1, 3)
        self.assertEqual(sum_votes_poll2, 1)


    def test_show_user_vote(self):
        """
        user1 has two votes: option_1 for poll_1, option_3 for poll_2
        """
        user_votes = self.user1.votes.count()

        self.assertEqual(user_votes, 2)


    def test_delete_poll_option(self):
        """
        Deleting poll_options should remove voices containing these options
        """
        self.poll_option1.delete()

        self.assertIs(
            Vote.objects.filter(id=self.vote1.id).exists(),
            False
        )


    def test_counting_votes_for_poll_option(self):
        """
        poll_option1 has two votes
        """
        votes_poll_option1_count = self.poll_option1.votes.count()

        self.assertEqual(votes_poll_option1_count, 2)


class PollPreferenceModelTests(TestCase):

    def setUp(self):
        self.user1 = User.objects.create(
            username='user1',
            email='user1@example.com',
            password='password'
        )
        self.poll1 = Poll.objects.create(title='Title of the poll_1?', owner=self.user1)
        self.poll2 = Poll.objects.create(title='Title of the poll_2?', owner=self.user1)
        self.poll3 = Poll.objects.create(title='Title of the poll_3?', owner=self.user1)

        self.poll_preference_1 = PollPreference.objects.create() #default sc (single choice)
        self.poll_preference_2 = PollPreference.objects.create(type_of_poll='MC')

        self.poll_preference_relation1 = PollPreferenceRelation.objects.create(poll=self.poll1, poll_preference=self.poll_preference_1)
        self.poll_preference_relation2 = PollPreferenceRelation.objects.create(poll=self.poll2, poll_preference=self.poll_preference_2)
        self.poll_preference_relation3 = PollPreferenceRelation.objects.create(poll=self.poll3, poll_preference=self.poll_preference_2)

    
    def test_default_poll_preferences(self):
        """
        poll11 is single choice
        """
        poll1_preference= self.poll1.poll_preferences.get().poll_preference.type_of_poll

        self.assertEqual(poll1_preference, 'SC')


    def test_show_all_MC_poll_preference(self):
        """
        poll2 and poll3 are multi choice
        """
        list_MC_polls = list(map(lambda el: el.poll, list(PollPreferenceRelation.objects.filter(poll_preference=self.poll_preference_2))))
    
        self.assertIn(self.poll2, list_MC_polls)
        self.assertIn(self.poll3, list_MC_polls)