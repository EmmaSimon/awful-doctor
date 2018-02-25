from django.forms.models import model_to_dict

from api.models import Symptom, Diagnosis


def diagnosis_data_for_symptom(symptom_id):
    symptom = Symptom.objects.get(id=symptom_id)
    possibilities = Diagnosis.objects.filter(symptom=symptom)
    return {
        # Sort disagnoses by most likely, then randomly and take the first
        'most_likely': possibilities.order_by('-frequency', '?')[0].id,
        # Object of diagnoses keyed by id, for accessing on the frontend
        'diagnoses': {
            diagnosis.get('id'): diagnosis
            for diagnosis in possibilities.values()
        },
        # List of diagnoses ordered by frequency then sickness name
        'diagnosis_ids': [
            diagnosis.get('id')
            for diagnosis in possibilities.order_by(
                '-frequency', 'sickness__name'
            ).values()
        ],
        # Object of sicknesses keyed by id, for accessing from diagnoses
        'sickness': {
            diagnosis.sickness.id: model_to_dict(diagnosis.sickness)
            for diagnosis in possibilities
        },
    }
