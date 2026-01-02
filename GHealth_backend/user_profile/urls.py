# from django.urls import path
# from .views import ProfileNutritionView

# urlpatterns = [
#     path('profile/', ProfileNutritionView.as_view(), name='profile-nutrition'),
# ]

from django.urls import path
from .views import ProfileNutritionView, NutritionDeleteView, NutritionEditView

urlpatterns = [
    path('profile/', ProfileNutritionView.as_view(), name='profile-nutrition'),
    path('profile/delete/<int:pk>/', NutritionDeleteView.as_view(), name='nutrition-delete'),
    path('profile/edit/<int:pk>/', NutritionEditView.as_view(), name='nutrition-edit'),
]
