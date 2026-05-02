from rest_framework.exceptions import NotAuthenticated
from .models import Proposal
from jobs.models import JobRequest

def create_proposal(user, data):
    if user.is_anonymous:
        raise NotAuthenticated

    if user.role != 'contractor':
        raise Exception("Only Contractor can send Proposals")

    job = data.get('job')

    if job.status != JobRequest.Status.OPEN:
        raise Exception("Cannot respond to non-open job")

    return Proposal.objects.cretae(contractor = user, **data)

def accept_proposal(user, proposal_id):
    if user.role != "client":
        raise Exception("Only client can accept proposal")
    proposal = Proposal.objects.get(id=proposal_id)
    job = proposal.job

    #only client-owner
    if job.client != user:
        raise Exception("Not your job")

    #нельзя если уже not open
    if job.status != JobRequest.Status.OPEN:
        raise Exception("Job is alredy taken")

    proposal.status = Proposal.Status.ACCEPTED
    proposal.save()

        #отклоняем остальные 
    Proposal.objects.filter(job = job).exclude(id = proposal.id).update(
        status = Proposal.Status.Rejected
    )

    job.status = JobRequest.Status.IN_PROGRESS
    job.save()
    return proposal 

