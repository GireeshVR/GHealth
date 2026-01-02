from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('dashboard.urls')),
    path('api/profile/', include('user_profile.urls')),
    path("api/", include("Register.urls")),
    path("api/", include("Login.urls")),
]
