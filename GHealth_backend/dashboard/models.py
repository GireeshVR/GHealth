from django.db import models

class Nutrition(models.Model):
    MEALS = [
        ('Breakfast', 'Breakfast'),
        ('Lunch', 'Lunch'),
        ('Dinner', 'Dinner'),
        ('Snacks', 'Snacks'),
    ]
    meal = models.CharField(max_length=20, choices=MEALS, default='Breakfast')
    calories = models.FloatField(default=0)
    protein = models.FloatField(default=0)
    carbs = models.FloatField(default=0)
    fat = models.FloatField(default=0)
    date = models.DateField()

    def __str__(self):
        return f"{self.meal} - {self.date}"
