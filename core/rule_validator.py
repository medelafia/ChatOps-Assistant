from auth.auth import get_current_user
from services.user_services import get_user_by_username
from services.role_services import get_role_by_name
def validate_rule(commands) : 
    username = get_current_user()['username'] 
    user = get_user_by_username(username)
