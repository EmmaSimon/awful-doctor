import json

from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from api.models import Symptom, Diagnosis
from api.utils import diagnosis_data_for_symptom


# These are CSRF exempt only for development, this shouldn't go into production
@csrf_exempt
@require_http_methods(["GET"])
def symptoms(request):
    symptoms = Symptom.objects.values()
    return JsonResponse({
        # Object of symptoms keyed by id, for accessing on the frontend
        'symptoms': {
            symptom.get('id'): symptom
            for symptom in symptoms
        },
        # List of diagnoses ordered by frequency then sickness name
        'symptom_ids': [
            symptom.get('id')
            for symptom in symptoms
        ],
    })


@csrf_exempt
@require_http_methods(["GET", "POST"])
def diagnosis(request):
    if request.method == 'GET':
        symptom_id = request.GET.get('symptom')

        # Error if no symptom provided
        if not symptom_id:
            return HttpResponseBadRequest()
    elif request.method == 'POST':
        post_data = json.loads(request.body.decode('utf8'))
        symptom_id = post_data.get('symptom')
        diagnosis_id = post_data.get('diagnosis')

        # Error if args don't exist
        if not symptom_id or not diagnosis_id:
            return HttpResponseBadRequest()

        diagnosis = Diagnosis.objects.get(id=diagnosis_id)
        # Add one to the frequency of the posted diagnosis
        diagnosis.frequency += 1
        diagnosis.save()

    return JsonResponse(diagnosis_data_for_symptom(symptom_id))
