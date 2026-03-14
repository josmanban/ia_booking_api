from django.db import models

class PropertyType(models.TextChoices):
    APARTMENT = "apartment"
    HOUSE = "house"
    PH = "PH"


class Operation(models.TextChoices):
    BUY = "BUY"
    RENT = "RENT"

# Create your models here.
class Property(models.Model):
    room_count = models.IntegerField()
    bathroom_count = models.IntegerField()
    type = models.CharField(max_length=100, choices=PropertyType.choices)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    city = models.CharField(max_length=150)
    address = models.CharField(max_length=255)
    operation = models.CharField(max_length=100, choices=Operation.choices, default=Operation.RENT) 
    name = models.CharField(max_length=255, default="")

    def __str__(self):
        return f"{self.type} in {self.city} with {self.room_count} rooms and {self.bathroom_count} bathrooms for ${self.price}" 

    def save(self, *args, **kwargs):
        self.name = f"{self.type} in {self.city} with {self.room_count} rooms and {self.bathroom_count} bathrooms for ${self.price}"
        super().save(*args, **kwargs)