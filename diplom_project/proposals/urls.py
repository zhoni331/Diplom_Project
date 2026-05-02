from rest_framework.routers import DefaultRouter
from .views import ProposalViewSet

router = DefaultRouter()
router.register('', ProposalViewSet, basename = 'proposals')

urlpatterns = router.urls