from db.sqlite_connection import get_connection 
import bcrypt
from schemas.schemas import User
from utils.env_factory import get_config


def get_user_by_username(username : str) : 
    try : 
        cursor = get_connection().cursor() 
        sql = "SELECT * FROM users WHERE username=?"
        cursor.execute(sql , (username , )) 
        return cursor.fetchone()
    except Exception as ex :
        print(f"Error : {ex}") 
    finally : 
        cursor.close()

def save_user(user : User) : 
    try : 
        cursor = get_connection().cursor() 
        sql = "INSERT INTO users VALUES (?,?,?)" 
        cursor.execute(sql , (user.username , bcrypt.hashpw(user.password.encode("utf-8") , bcrypt.gensalt()) , ",".join(user.roles))) 
        get_connection().commit()
    except Exception as ex :
        print(f"Error : {ex}") 
    finally : 
        cursor.close()


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

