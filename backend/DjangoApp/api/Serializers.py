from django.contrib.auth.models import User
from requests import Response
from rest_framework import serializers, status

from DjangoApp.models import Item, Address, CartItem, Order


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    item_id = serializers.PrimaryKeyRelatedField(queryset=Item.objects.all(),
                                                 source='item',
                                                 write_only=True)
    
    class Meta:
        model = CartItem
        fields = ['item', 'quantity', 'item_id']
        depth = 1

    def create(self, validated_data):
        quan = validated_data.get('quantity', None)
        response, created = CartItem.objects.update_or_create(user=self.context['request'].user,
                                                              item=validated_data.get('item', None),
                                                              defaults={'quantity': quan})
        return response


class OrderSerializer(serializers.ModelSerializer):
    item_id = serializers.PrimaryKeyRelatedField(queryset=Item.objects.all(),
                                                 source='item',
                                                 write_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(),
                                                 source='user',
                                                 write_only=True)

    class Meta:
        model = Order
        fields = '__all__'
        depth = 1


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

