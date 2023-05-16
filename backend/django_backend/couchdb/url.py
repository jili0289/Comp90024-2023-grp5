from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('health', views.HealthCheckView.as_view(), name="HealthCheck"),
    path('sample', views.SampleView.as_view(), name="Sample"),
]