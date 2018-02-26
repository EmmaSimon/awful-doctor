import json

from django.test import TestCase
from django.urls import reverse

from api.models import Diagnosis, Sickness, Symptom


class ModelTests(TestCase):
    def setUp(self):
        plague = Sickness.objects.create(name='  Terrellian plague ')
        flu = Sickness.objects.create(name='Levodian flu')
        pain = Symptom.objects.create(name=' excruciating discomfort ')
        sneeze = Symptom.objects.create(name='sneezing')
        Diagnosis.objects.create(symptom=pain, sickness=plague)
        Diagnosis.objects.create(symptom=sneeze, sickness=plague)
        Diagnosis.objects.create(symptom=sneeze, sickness=flu)

    def check_stripped_sickness_name(self):
        """Check that sickness names are being properly trimmed"""
        sickness = Sickness.objects.get(name='Terrellian plague')
        self.assertEqual(sickness.name, 'Terrellian plague')

    def check_stripped_symptom_name(self):
        """Check that symptom names are being properly trimmed"""
        symptom = Symptom.objects.get(name='excruciating discomfort')
        self.assertEqual(symptom.name, 'excruciating discomfort')

    def test_diagnosis_association(self):
        """Check that diagnoses are properly created"""
        sickness = Sickness.objects.get(name='Terrellian plague')
        symptom = Symptom.objects.get(name='excruciating discomfort')
        diagnosis = Diagnosis.objects.get(symptom=symptom, sickness=sickness)
        self.assertEqual(diagnosis.frequency, 0)
        self.assertEqual(diagnosis.symptom, symptom)
        self.assertEqual(diagnosis.sickness, sickness)

    def test_frequency_increment(self):
        """Check that diagnosis frequency is updating properly"""
        sickness = Sickness.objects.get(name='Levodian flu')
        symptom = Symptom.objects.get(name='sneezing')
        diagnosis = Diagnosis.objects.get(symptom=symptom, sickness=sickness)
        original_frequency = diagnosis.frequency
        diagnosis.frequency += 1
        diagnosis.save()
        self.assertEqual(diagnosis.frequency, original_frequency + 1)


class ViewTests(TestCase):
    def setUp(self):
        plague = Sickness.objects.create(name='  Terrellian plague ')
        flu = Sickness.objects.create(name='Levodian flu')
        pain = Symptom.objects.create(name=' excruciating discomfort ')
        sneeze = Symptom.objects.create(name='sneezing')
        Diagnosis.objects.create(symptom=pain, sickness=plague)
        Diagnosis.objects.create(symptom=sneeze, sickness=plague)
        Diagnosis.objects.create(symptom=sneeze, sickness=flu)

    def test_get_symptoms(self):
        """Check that symptoms is returning a response"""
        response = self.client.get(reverse('symptoms'))
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content.decode('utf8'))
        self.assertIsNotNone(response_data.get('symptoms'))

    def test_post_symptoms(self):
        """Check that posting to symptoms is failing"""
        response = self.client.post(reverse('symptoms'))
        self.assertEqual(response.status_code, 405)

    def test_get_diagnosis_no_params(self):
        """Check that getting diagnosis with no params fails"""
        response = self.client.get(reverse('diagnosis'))
        self.assertEqual(response.status_code, 400)

    def test_get_diagnosis(self):
        """Check that getting diagnosis is returning a response"""
        flu = Sickness.objects.create(name='Levodian flu')
        sneeze = Symptom.objects.create(name='sneezing')
        Diagnosis.objects.create(symptom=sneeze, sickness=flu)
        response = self.client.get(
            reverse('diagnosis'), {'symptom': sneeze.id},
        )
        self.assertEqual(response.status_code, 200)
        response_data = json.loads(response.content.decode('utf8'))
        self.assertIsNotNone(response_data.get('diagnoses'))
        self.assertIsNotNone(response_data.get('most_likely'))
