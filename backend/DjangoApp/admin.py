from django.contrib import admin
from DjangoApp.models import Item, CartItem, Order, Address

admin.site.register(Item)
admin.site.register(CartItem)
admin.site.register(Order)
admin.site.register(Address)
