from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse

# Create your views here.
class HealthCheckView(APIView):
    def get(self, request):
        return Response({'some': 'data'})