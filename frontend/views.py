"""
frontend views
"""
from django.shortcuts import render

# Create your views here.


def index(request):
    """fronted class index (default)"""
    return render(request, "frontend/index.html")
