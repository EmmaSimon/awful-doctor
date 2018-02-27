from django.urls import path
from . import views

urlpatterns = [
    path('symptoms', views.symptoms, name='symptoms'),
    path('diagnosis', views.diagnosis, name='diagnosis'),
]
