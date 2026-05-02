from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from .serializers import ProposalSerializer
from .models import Proposal
from .services import (
    create_proposal,
    accept_proposal
)
from users.permissions import IsContractor, IsClient

class ProposalViewSet(viewsets.ModelViewSet):
    serializer_class = ProposalSerializer
    def get_permissions(self):
        if self.action == "accept":
            return [permissions.IsAuthenticated(), IsClient()]
        return [permissions.IsAuthenticated(), IsContractor()]

    def get_queryset(self):
        user = self.request.user

        if user.role == "contractor":
            return Proposal.objects.filter(contractor = user)

        if user.role == "client":
            return Proposal.objects.filter(job__client = user)

        return Proposal.objects.all()

    def perform_create(self, serializer):
        job = serializer.validated_data.get("job")

        if Proposal.objects.filter(job = job, contractor = self.request.user).exists():
            raise ValidationError("You have already applied for this job")

        serializer.save(contractor=self.request.user)

    #accept
    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        proposal = accept_proposal(request.user, pk)
        return Response(self.get_serializer(proposal).data)
# Create your views here.
