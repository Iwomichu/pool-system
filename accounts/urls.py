"""
accounts apps url patterns
"""
from django.urls import path, include

urlpatterns = [
    path('', include('djoser.urls')),
    path('', include('djoser.urls.authtoken')),

]
