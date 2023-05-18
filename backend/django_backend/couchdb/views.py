from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
import couchdb2

# Create your views here.
server = couchdb2.Server(href="http://172.26.129.246:5984/", username="admin", password="admin", use_session=True)
lgbt_residence_db = server.get("lgbt_residence")
weekly_rent_db = server.get("rental_weeklyrent")
transport_vicstops_db = server.get("transport_vicstops")
transport_nswstops_db = server.get("transport_nswstops")
twitter_lgbt_db = server.get("twitter_lgbt")
twitter_rent_db = server.get("twitter_rent")
twitter_transport_db = server.get("twitter_transport")


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
        # data = lgbt_residence_db["0e976397b36cd829c9120b3176e729a4"]["couples"]
        same_sex_couple = map(lambda x: x.value, lgbt_residence_db.view("couple", "same_sex_couple").rows)
        return Response({"same_sex_couple": same_sex_couple})
    
class CouplesLivingView(APIView):
    def get(self, request):
        # State part
        state_dict = {}
        female_couple_livingtogether = map(lambda x: x.value, lgbt_residence_db.view("couple", "female_couple_livingtogether").rows)
        male_couple_livingtogether = map(lambda x: x.value, lgbt_residence_db.view("couple", "male_couple_livingtogether").rows)
        total_couple_livingtogether = map(lambda x: x.value, lgbt_residence_db.view("couple", "total_couple_livingtogether").rows)
        state_dict["female_couple_livingtogether"] = female_couple_livingtogether
        state_dict["male_couple_livingtogether"] = male_couple_livingtogether
        state_dict["total_couple_livingtogether"] = total_couple_livingtogether
        # City Part
        city_dict = {}
        female_couple_city = map(lambda x: x.value, lgbt_residence_db.view("couple", "female_couple_city").rows)
        male_couple_city = map(lambda x: x.value, lgbt_residence_db.view("couple", "male_couple_city").rows)
        total_couple_city = map(lambda x: x.value, lgbt_residence_db.view("couple", "total_couple_city").rows)
        city_dict["female_couple_city"] = female_couple_city
        city_dict["male_couple_city"] = male_couple_city
        city_dict["total_couple_city"] = total_couple_city
        return Response({'State': state_dict, "City": city_dict})
    
class WeeklyRentView(APIView):
    def get(self, request):
        # data = weekly_rent_db["4789dae991c9ae7504a75c0820d7b4c2"]["rent"]
        data = map(lambda x: x.value, weekly_rent_db.view("rent", "rent").rows)
        return Response({'data': data})
    
class TransportVicstopsView(APIView):
    def get(self, request):
        vic_raw_data = transport_vicstops_db.view(r"location", "latitude_longitude").rows
        nsw_raw_data = transport_nswstops_db.view(r"location", "latitude_longitude").rows
        vic_data = list(map(lambda x: (x.value["latitude"], x.value["longitude"]), vic_raw_data))
        nsw_data = list(map(lambda x: (x.value["latitude"], x.value["longitude"]), nsw_raw_data))
        return Response({'data': vic_data+nsw_data})
    
class TwitterRentView(APIView):
    def get(self, request):
        twitter_rent = map(lambda x: x.value, twitter_rent_db.view("rent", "rent_view").rows)
        return Response({'data': twitter_rent})
    
class TwitterTransportView(APIView):
    def get(self, request):
        twitter_transport = map(lambda x: x.value, twitter_transport_db.view("transport", "transport_view").rows)
        return Response({'data': twitter_transport})

class TwitterLgbtView(APIView):
    def get(self, request):
        twitter_lgbt = map(lambda x: x.value, twitter_lgbt_db.view("view", "lgbt_view").rows)
        return Response({'data': twitter_lgbt})