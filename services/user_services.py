from db.sqlite_connection import get_connection 
import bcrypt
from schemas.schemas import User
from utils.env_factory import get_config


def get_user_by_username(username : str) : 
    try : 
        cursor = get_connection().cursor() 
        sql = "SELECT * FROM users WHERE username=?"
        cursor.execute(sql , (username , )) 

        row = cursor.fetchone()
        print(row)
        return User(username=row[0] , password=row[1] , roles=row[2].split(",") , isActive=row[3], isSudoer=row[4])
    except Exception as ex :
        print(f"Error : {ex}") 

def get_all_users() : 
    try : 
        cursor = get_connection().cursor() 
        sql = "SELECT * FROM users"
        cursor.execute(sql) 
        return [ User(username=row[0] , password=row[1] , roles=row[2].split(",") ,isActive=row[3], isSudoer=row[4]) for row in cursor.fetchall() ]
    except Exception as ex :
        print(f"Error : {ex}") 


def save_user(user : User) : 
    try : 
        cursor = get_connection().cursor() 
        sql = "INSERT INTO users VALUES (?,?,?,?,?)" 
        cursor.execute(sql , (user.username , bcrypt.hashpw(user.password.encode("utf-8") , bcrypt.gensalt()), ",".join(user.roles) , user.isActive , user.isSudoer)) 
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
    save_user(User(username=username , password=password , roles=["ALL"] , isActive=True , isSudoer=True))
    print("Super user created successfully")

