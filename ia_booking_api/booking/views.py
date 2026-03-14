from django.shortcuts import render
from booking.serializers import PropertySerializer
from rest_framework import viewsets
from booking.models import Property

# Create your views here.
class PropertyViewSet(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    queryset = Property.objects.all()
