from .models import User
from rest_framework.exceptions import NotAuthenticated
from .exceptions import (
    NotAdminException, 
    CannotDeleteSelfException, 
    UserNotFoundException,
    UserHasOrdersException)

def get_all_users():
    return User.objects.all()

def get_user_by_id(user_id):
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return None

def create_user(data):
    data['role'] = 'user'  # Ensure role is always set to 'user' when creating via API
    
    ##if data.get('role') != 'admin':
    ##    raise PermissionError("Only admins can create users(cannot create admin via API).")

    user = User.objects.create(**data)
    return user

def delete_user(current_user, user_id):
    if current_user.is_anonymous:
        raise NotAuthenticated("Authentication required to delete a user.")

    if current_user.role != 'admin':
        raise NotAdminException()

    if current_user.id == user_id:
        raise CannotDeleteSelfException()

    try: 
        user = get_user_by_id(user_id)
    except User.DoesNotExist:
        raise UserNotFoundException()

    if user.orders.exists():
        raise UserHasOrdersException()
    user.delete()

def register_user(data):
    user = User(
         username=data["username"],
        role="client"
    )
    user.set_password(data["password"])
    user.save()
    return user
    