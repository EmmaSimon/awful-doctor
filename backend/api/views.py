from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

from api.models import Symptom, Diagnosis
from api.utils import diagnosis_data_for_symptom


@require_http_methods(["GET"])
def symptoms(request):
    return JsonResponse({'symptoms': list(Symptom.objects.values())})


@require_http_methods(["GET", "POST"])
def diagnosis(request):
    if request.method == 'GET':
        symptom_id = request.GET.get('symptom')
    elif request.method == 'POST':
        symptom_id = request.POST.get('symptom')
        diagnosis_id = request.POST.get('diagnosis')
        diagnosis = Diagnosis.objects.filter(id=diagnosis_id)
        # Add one to the frequency of the posted diagnosis
        diagnosis.update(frequency=diagnosis[0].frequency + 1)

    return JsonResponse(diagnosis_data_for_symptom(symptom_id))
