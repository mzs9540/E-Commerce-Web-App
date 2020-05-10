from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Item(models.Model):
    name = models.CharField(max_length=100)
    stock = models.IntegerField(default=0)
    img_url = models.URLField()
    model_no = models.IntegerField()
    type = models.CharField(max_length=500)
    cost = models.FloatField()
    rating = models.FloatField()

    def __str__(self):
        return self.name


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50, default="Enter")
    last_name = models.CharField(max_length=50, default="Enter")
    email = models.EmailField(max_length=200, null=True)
    phone = models.CharField(max_length=30, default="Enter")
    h_no = models.CharField(max_length=1000)
    street = models.CharField(max_length=1000)
    city = models.CharField(max_length=1000)
    state = models.CharField(max_length=50)
    pincode = models.IntegerField()
    landmark = models.CharField(max_length=50, null=True)

    def __str__(self):
        return '{} - {} - {}'.format(self.user, self.h_no, self.city)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    item = models.ForeignKey(Item, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField(default=5)
    first_name = models.CharField(max_length=50, default="Enter")
    last_name = models.CharField(max_length=50, default="Enter")
    email = models.EmailField(max_length=200)
    phone = models.CharField(max_length=30, default="Enter")
    h_no = models.CharField(max_length=1000)
    street = models.CharField(max_length=1000)
    city = models.CharField(max_length=1000)
    state = models.CharField(max_length=50)
    pincode = models.IntegerField()
    landmark = models.CharField(max_length=50, null=True)

    def __str__(self):
        return '{} - {} - {} - {} - {}'.format(self.item.name, self.item.model_no, self.user, self.h_no, self.city)


class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return '{}-{}-{}'.format(self.user, self.item.name, self.item.model_no)



