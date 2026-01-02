from django.urls import path
from .views import NutritionCreateView

urlpatterns = [
    path('dashboard/', NutritionCreateView.as_view(), name='nutrition-create'),
]
