from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('health', views.HealthCheckView.as_view(), name="HealthCheck"),
    path('sample', views.SampleView.as_view(), name="Sample"),
    path('lgbt-couples', views.LgbtCouplesView.as_view(), name="lgbt-couples"),
    path('couples-living', views.CouplesLivingView.as_view(), name="couples-living"),
    path('weekly-rent', views.WeeklyRentView.as_view(), name="weekly-rent"),
    path('transport-stops', views.TransportVicstopsView.as_view(), name="transport-stops"),
    path('twitter-transport', views.TwitterTransportView.as_view(), name="twitter-transport"),
    path('twitter-lgbt', views.TwitterLgbtView.as_view(), name="twitter-lgbt"),
    path('twitter-rent', views.TwitterRentView.as_view(), name="twitter-rent"),
    path('mastodon-transport', views.MastodonTransportView.as_view(), name="twitter-transport"),
    path('mastodon-lgbt', views.MastodonLgbtView.as_view(), name="twitter-lgbt"),
    path('mastodon-rent', views.MastodonRentView.as_view(), name="twitter-rent"),
]