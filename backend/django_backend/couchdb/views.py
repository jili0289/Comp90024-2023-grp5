from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
import couchdb2
import os

# Create your views here.
db_ip = os.environ.get('DATABASE', "172.26.131.14")
username = os.environ.get('DB_USER', "admin")
password = os.environ.get('DB_PASS', "admin")
server = couchdb2.Server(href="http://" + db_ip + ":5984/", username=username, password=password)

class HealthCheckView(APIView):
    def get(self, request):
        server = couchdb2.Server(href="http://" + db_ip + ":5984/", username=username, password=password)
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
        server = couchdb2.Server(href="http://" + db_ip + ":5984/", username=username, password=password)
        lgbt_residence_db = server.get("lgbt_residence")
        same_sex_couple = map(lambda x: x.value, lgbt_residence_db.view("residence", "same_sex_couple").rows)
        return Response({"same_sex_couple": same_sex_couple})
    
class CouplesLivingView(APIView):
    def get(self, request):
        server = couchdb2.Server(href="http://" + db_ip + ":5984/", username=username, password=password)
        lgbt_residence_db = server.get("lgbt_residence")
        # State part
        state_dict = {}
        female_couple_livingtogether = map(lambda x: x.value, lgbt_residence_db.view("residence", "female_couple_livingtogether").rows)
        male_couple_livingtogether = map(lambda x: x.value, lgbt_residence_db.view("residence", "male_couple_livingtogether").rows)
        total_couple_livingtogether = map(lambda x: x.value, lgbt_residence_db.view("residence", "total_couple_livingtogether").rows)
        state_dict["female_couple_livingtogether"] = female_couple_livingtogether
        state_dict["male_couple_livingtogether"] = male_couple_livingtogether
        state_dict["total_couple_livingtogether"] = total_couple_livingtogether
        # City Part
        city_dict = {}
        female_couple_city = map(lambda x: x.value, lgbt_residence_db.view("residence", "female_couple_city").rows)
        male_couple_city = map(lambda x: x.value, lgbt_residence_db.view("residence", "male_couple_city").rows)
        total_couple_city = map(lambda x: x.value, lgbt_residence_db.view("residence", "total_couple_city").rows)
        city_dict["female_couple_city"] = female_couple_city
        city_dict["male_couple_city"] = male_couple_city
        city_dict["total_couple_city"] = total_couple_city
        return Response({'State': state_dict, "City": city_dict})
    
class WeeklyRentView(APIView):
    def get(self, request):
        server = couchdb2.Server(href="http://" + db_ip + ":5984/", username=username, password=password)
        weekly_rent_db = server.get("rental_weeklyrent")
        data = map(lambda x: x.value, weekly_rent_db.view("rent", "rent").rows)
        return Response({'data': data})
    
class TransportVicstopsView(APIView):
    def get(self, request):
        server = couchdb2.Server(href="http://" + db_ip + ":5984/", username=username, password=password)
        transport_vicstops_db = server.get("trans_combined_vic")
        transport_nswstops_db = server.get("trans_combined_nsw")

        vic_raw_data = transport_vicstops_db.view(r"stops", "vic_stops").rows
        nsw_raw_data = transport_nswstops_db.view(r"stops", "nsw_stops").rows
        vic_data = list(map(lambda x: x.value, vic_raw_data))
        nsw_data = list(map(lambda x: x.value, nsw_raw_data))
        return Response({'data': vic_data+nsw_data})
    
class TwitterRentView(APIView):
    def get(self, request):
        server = couchdb2.Server(href="http://" + db_ip + ":5984/", username=username, password=password)
        twitter_rent_db = server.get("twitter_rent")
        twitter_rent = map(lambda x: x.value, twitter_rent_db.view("rent", "rent_view").rows)
        return Response({'data': twitter_rent})
    
class TwitterTransportView(APIView):
    def get(self, request):
        server = couchdb2.Server(href="http://" + db_ip + ":5984/", username=username, password=password)
        twitter_transport_db = server.get("twitter_transport")
        twitter_transport = map(lambda x: x.value, twitter_transport_db.view("transport", "transport_view").rows)
        return Response({'data': twitter_transport})

class TwitterLgbtView(APIView):
    def get(self, request):
        server = couchdb2.Server(href="http://" + db_ip + ":5984/", username=username, password=password)
        twitter_lgbt_db = server.get("twitter_lgbt")
        twitter_lgbt = map(lambda x: x.value, twitter_lgbt_db.view("view", "lgbt_view").rows)
        return Response({'data': twitter_lgbt})
    

class MastodonRentView(APIView):
    def get(self, request):
        server = couchdb2.Server(href="http://" + db_ip + ":5984/", username=username, password=password)
        rent_mastodon_db = server.get("rent_mastodon")
        mastodon_rent = map(lambda x: x.value, rent_mastodon_db.view("location", "rent_mastodon").rows)
        return Response({'data': mastodon_rent})
    
class MastodonTransportView(APIView):
    def get(self, request):
        server = couchdb2.Server(href="http://" + db_ip + ":5984/", username=username, password=password)
        trans_mastodon_db = server.get("trans_mastodon")
        mastodon_transport = map(lambda x: x.value, trans_mastodon_db.view("location", "trans_mastodon").rows)
        return Response({'data': mastodon_transport})

class MastodonLgbtView(APIView):
    def get(self, request):
        server = couchdb2.Server(href="http://" + db_ip + ":5984/", username=username, password=password)
        lgbt_mastodon_db = server.get("lgbt_mastodon")
        mastodon_lgbt = map(lambda x: x.value, lgbt_mastodon_db.view("location", "lgbt_mastodon").rows)
        return Response({'data': mastodon_lgbt})
    
class LgbtCombinedView(APIView):
    def get(self, request):
        server = couchdb2.Server(href="http://" + db_ip + ":5984/", username=username, password=password)
        lgbt_combined_db = server.get("lgbt_combined")
        data = map(lambda x: x.value, lgbt_combined_db.view("sentiment", "lgbt_sentiment").rows)
        return Response({'data': data})
    
class RentCombinedView(APIView):
    def get(self, request):
        server = couchdb2.Server(href="http://" + db_ip + ":5984/", username=username, password=password)
        rent_combined_db = server.get("rent_combined")
        data = map(lambda x: x.value, rent_combined_db.view("sentiment", "rent_sentiment").rows)
        return Response({'data': data})
    
class TransCombinedView(APIView):
    def get(self, request):
        server = couchdb2.Server(href="http://" + db_ip + ":5984/", username=username, password=password)
        trans_combined_db = server.get("trans_combined")
        data = map(lambda x: x.value, trans_combined_db.view("sentiment", "trans_sentiment").rows)
        return Response({'data': data})