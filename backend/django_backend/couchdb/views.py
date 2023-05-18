from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
import couchdb2

# Create your views here.
server = couchdb2.Server(href="http://172.26.129.246:5984/", username="admin", password="admin", use_session=True)
lgbt_residence_db = server.get("lgbt_residence")


class HealthCheckView(APIView):
    def get(self, request):
        memebership = server.get_membership()
        return Response({'status': 'running', "membership" : memebership})
    
class SampleView(APIView):
   def get(self, request):
        return Response({
            "_id": "0e976397b36cd829c9120b3176e729a4",
            "_rev": "1-73ecd1dd7c114e4a37caf646e6e2ac14",
            "New South Wales": 31.8,
            "Victoria": 25.6,
            "Queensland": 20.3,
            "South Australia": 7,
            "Western Australia": 10.5,
            "Tasmania": 2.2,
            "Northern Territory": 0.9,
            "Australian Capital Territory": 1.8
            })
   
class LgbtCouplesView(APIView):
    def get(self, request):
        data = lgbt_residence_db["0e976397b36cd829c9120b3176e729a4"]
        return Response({'data': data})
    
class CouplesLivingView(APIView):
    def get(self, request):
        data = lgbt_residence_db["4789dae991c9ae7504a75c0820d88bcf"]
        return Response({'data': data})