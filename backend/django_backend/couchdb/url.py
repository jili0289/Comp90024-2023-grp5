from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
# router.register(r'health', views.HealthCheckView, 'MyModel')

urlpatterns = [
    path('', include(router.urls)),
    path('health', views.HealthCheckView.as_view(), name="MyModel"),
]