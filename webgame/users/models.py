
from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    high_score = models.IntegerField(default=0)
    games_played = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.user.username} Profile'
