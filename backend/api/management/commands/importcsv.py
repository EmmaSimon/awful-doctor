import csv
from django.core.management.base import BaseCommand

from api.models import Symptom, Sickness, Diagnosis


class Command(BaseCommand):
    help = 'Imports symptoms and diagnoses from csv file'

    def handle(self, *args, **options):
        with open('../symptoms.csv') as symptom_file:
            symptom_reader = csv.reader(symptom_file)

            for row in symptom_reader:
                symptom, *sicknesses = row
                print('adding Symptom: {}'.format(symptom))
                symptom_obj, _ = Symptom.objects.get_or_create(
                    name=symptom
                )

                for sickness in sicknesses:
                    print('adding Sickness: {}'.format(sickness))
                    sickness_obj, _ = Sickness.objects.get_or_create(
                        name=sickness
                    )
                    print('adding Diagnosis: {} -> {}'.format(
                        sickness, symptom
                    ))
                    Diagnosis.objects.get_or_create(
                        symptom=symptom_obj,
                        sickness=sickness_obj,
                    )
