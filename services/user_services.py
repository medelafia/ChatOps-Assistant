from db.sqlite_connection import get_connection 
import bcrypt
from schemas.schemas import User
from utils.env_factory import get_config


def get_user_by_username(username : str) : 
    try : 
        cursor = get_connection().cursor() 
        sql = "SELECT * FROM users WHERE username=?"
        cursor.execute(sql , (username , )) 

        user_tuple = cursor.fetchone()
        print(user_tuple)
        return User(username=user_tuple[0] , password=user_tuple[1] , roles=user_tuple[2].split(","))
    except Exception as ex :
        print(f"Error : {ex}") 

def save_user(user : User) : 
    try : 
        cursor = get_connection().cursor() 
        sql = "INSERT INTO users VALUES (?,?,?)" 
        cursor.execute(sql , (user.username , bcrypt.hashpw(user.password.encode("utf-8") , bcrypt.gensalt()), ",".join(user.roles))) 
        get_connection().commit()
    except Exception as ex :
        print(f"Error : {ex}") 


def check_user_password(password , user_password) : 
    return bcrypt.checkpw(password.encode("utf-8") , user_password.encode("utf-8"))


def create_super_user() : 
    username = get_config("SUPER_USER_USERNAME") 
    if get_user_by_username(username) : 
        print("Super user alredy added")
        return 
    password = get_config("SUPER_USER_PASSWORD") 
    save_user(User(username=username , password=password , roles=["ALL"]))
    print("Super user created successfully")

