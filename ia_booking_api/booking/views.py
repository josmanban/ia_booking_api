from django.shortcuts import render
from booking.serializers import PropertySerializer
from rest_framework import viewsets
from google import genai
from rest_framework.decorators import action
from rest_framework.response import Response
from booking.models import Property
import json
from google.genai.errors import ClientError

# Create your views here.
class PropertyViewSet(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    queryset = Property.objects.all()
    
    def get_queryset(self):        
        to_search = self.request.query_params.get('search', '')
        if not to_search:
            return super().get_queryset()  # Si no hay parámetro de búsqueda, retornar el queryset completo
        try:
            client = genai.Client()
            response = client.models.generate_content(
                model="gemini-3-flash-preview",
                contents=f'''Del siguiente texto quiero que identifiques los filtros 
                de numero de cuartos, numero de baños, ciudad, tipo (apartment,house, PH),
                operacion (RENT,BUY), precio, precio desde, precio hasta y devolver una 
                estructura de filtros en formato json de la siguiente forma (ejemplo): 
                {{
                    'status':'ok',
                    'filters':{{
                        'room_count':2, 
                        'bathroom_count':3,
                        'city':'cordoba',
                        'type':'apartment',
                        'price':1000,
                        'price_greater_than':500,'
                        operation':'RENT'}}
                }}.
                El campo price funciona como precio hasta, si el texto contiene la palabra 
                "desde" o "mayor a" se debe interpretar como precio desde, si el texto contiene 
                la palabra "hasta" o "menor a" "o alrededor" se debe interpretar como 
                precio hasta y utilizar el campo "price". Si el texto no compara y solo menciona 
                un precio se debe interpretar como precio exacto y utilizar el campo "price".
                La respuesta solo debe ser un objeto json, en caso de error retornar un objeto 
                json de la forma {{'status':'error','message': 'el error aqui'}}.
                El texto en cuestion es:{to_search}''',
                config={
                        "response_mime_type": "application/json",
                },
            )

            filters = response.text
            print("Filters response from Gemini:", filters)  # Debug: print the raw response
            filters_dict = json.loads(filters)  # Convertir la cadena JSON a un diccionario

        except ClientError as e:
            print("Error from Gemini API:", e)  # Debug: print the error message
            return Response({"error": "Failed to process the search query."}, status=500)        

        if filters_dict.get('status') == 'error':
            return Response({"error": filters_dict.get('message', 'Unknown error')}, status=400)
        
        filters_data = filters_dict.get('filters', {})
        queryset = Property.objects.all()
        if 'room_count' in filters_data and filters_data['room_count'] is not None:            
            queryset = queryset.filter(room_count=filters_data['room_count'])                        
        if 'bathroom_count' in filters_data and filters_data['bathroom_count'] is not None:                        
            queryset = queryset.filter(bathroom_count=filters_data['bathroom_count'])                        
        if 'city' in filters_data and filters_data['city'] is not None:                        
            queryset = queryset.filter(city=filters_data['city'])                        
        if 'type' in filters_data and filters_data['type'] is not None:                        
            queryset = queryset.filter(type=filters_data['type'])                        
        if 'operation' in filters_data and filters_data['operation'] is not None:                        
            queryset = queryset.filter(operation=filters_data['operation'])                                
        if 'price' in filters_data and filters_data['price'] is not None:                    
            queryset = queryset.filter(price__lte=filters_data['price'])            
        if 'price_greater_than' in filters_data and filters_data['price_greater_than'] is not None:                        
            queryset = queryset.filter(price__gte=filters_data['price_greater_than'])        
        return queryset
