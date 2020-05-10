from rest_framework.routers import DefaultRouter
from .views import ItemViewSet, AddressViewSet, CartViewSet, OrderViewSet

router = DefaultRouter()
router.register(r'items', ItemViewSet, basename='Items',)
router.register(r'address', AddressViewSet, basename='Address')
router.register(r'cart', CartViewSet, basename='Cart')
router.register(r'order', OrderViewSet, basename='Order')

urlpatterns = router.urls
