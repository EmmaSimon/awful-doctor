from django.db import models


class Symptom(models.Model):
    """A physical symptom of a sickness"""
    name = models.CharField(max_length=50)


class Sickness(models.Model):
    """A sickness that might cause a symptom"""
    name = models.CharField(max_length=50)


class Diagnosis(models.Model):
    """The relationship between a symptom and a sickness"""
    symptom = models.ForeignKey(Symptom, on_delete=models.CASCADE)
    sickness = models.ForeignKey(Sickness, on_delete=models.CASCADE)
    frequency = models.IntegerField(default=0)
