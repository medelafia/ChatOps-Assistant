from db.sqlite_connection import get_connection 
from schemas.schemas import Role

def get_role_by_name(roleName : str) : 
    try : 
        cursor = get_connection().cursor() 
        sql = "SELECT * FROM roles WHERE roleName=?"
        cursor.execute(sql , (roleName , )) 

        role_tuple = cursor.fetchone()
        print(role_tuple)
        return Role(roleName=role_tuple[0] , allowedCommands=role_tuple[1].split(","))
    except Exception as ex :
        print(f"Error : {ex}") 

def get_all_roles() : 
    try : 
        cursor = get_connection().cursor() 
        sql = "SELECT * FROM roles"
        cursor.execute(sql) 
        data = cursor.fetchall()
        return [Role(roleName=row[0] , allowedCommands=row[1].split(",")) for row in data]
    except Exception as ex :
        print(f"Error : {ex}") 


def save_role(role : Role) : 
    try : 
        cursor = get_connection().cursor() 
        sql = "INSERT INTO roles VALUES (?,?)" 
        cursor.execute(sql , (role.roleName , ",".join(role.allowedCommands))) 
        get_connection().commit()
    except Exception as ex :
        print(f"Error : {ex}") 



def create_super_role() : 
    roleName = "SUPER" 
    if get_role_by_name(roleName) : 
        print("Super role alredy added")
        return 
    save_role(Role(roleName=roleName , allowedCommands=["*"]))
    print("Super role created successfully")

