# Generated by Django 3.0.3 on 2020-02-05 10:00
"""inital migrations"""
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    """Migrations"""
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Poll',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=300)),
                ('question', models.CharField(max_length=100)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                            related_name='polls', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PollOption',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=100)),
                ('poll', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                           related_name='poll_options', to='polls.Poll')),
            ],
            options={
                'unique_together': {('text', 'poll')},
            },
        ),
        migrations.CreateModel(
            name='PollPreference',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('type_of_poll', models.CharField(choices=[('MC', 'Multiple choice'), (
                    'SC', 'Single choice'), ('AP', 'Anonymous poll')], default='SC', max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('ip_address', models.GenericIPAddressField(blank=True, null=True)),
                ('poll_option', models.ForeignKey(
                    on_delete=django.db.models.deletion.CASCADE,
                    related_name='votes', to='polls.PollOption')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                           related_name='votes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PollPreferenceRelation',
            fields=[
                ('id', models.AutoField(auto_created=True,
                                        primary_key=True, serialize=False, verbose_name='ID')),
                ('poll', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                           related_name='poll_preferences', to='polls.Poll')),
                ('poll_preference', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                                      related_name='poll_preferences',
                                                      to='polls.PollPreference')),
            ],
            options={
                'unique_together': {('poll', 'poll_preference')},
            },
        ),
    ]
