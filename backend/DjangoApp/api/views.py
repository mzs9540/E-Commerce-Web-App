from django.contrib.auth.models import User
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response

from .Serializers import ItemSerializer, AddressSerializer, CartSerializer, UserSerializer, OrderSerializer
from DjangoApp.models import Item, Address, CartItem, Order


class ItemViewSet(viewsets.ModelViewSet):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()


class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerializer
    queryset = Address.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    queryset = CartItem.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        query = CartItem.objects.filter(user=self.request.user)
        return query

    def destroy(self, request, *args, **kwargs):
        if self.request.data['delete_all']:
            cartitems = CartItem.objects.filter(user=self.request.user)
            if cartitems.exists():
                # Raw delete with the convenience of using Django QuerySet
                cartitems._raw_delete(cartitems.db)
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            instance = CartItem.objects.get(user_id__exact=self.request.user.id, item_id__exact=self.request.data['item_id'])
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        query = Order.objects.filter(user=self.request.user)
        return query

    def create(self, request, *args, **kwargs):
        is_many = True if isinstance(request.data['items'], list) else False
        data = request.data['items']
        for d in data:
            d['user_id'] = request.user.id
            d['user'] = request.user
        serializer = self.get_serializer(data=data, many=is_many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CurrentUserView(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
