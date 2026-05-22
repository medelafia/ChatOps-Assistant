import sqlite3 


connection =  None 

def get_connection() : 
    global connection
    if connection is None : 
        try : 
            connection = sqlite3.connect("db/__db__.db" , check_same_thread=False) 
        except Exception as ex : 
            print(f"cannot connect to database cause : {ex}")
    return connection 



def create_all_tables() :
    try : 
        cursor = get_connection().cursor() 
        sql = """
            CREATE TABLE IF NOT EXISTS users (
                username TEXT PRIMARY KEY , 
                password TEXT , 
                roles TEXT ,
                isSudoer BOOLEAN,
                isActive BOOLEAN 
            ); 
            CREATE TABLE IF NOT EXISTS roles (
                roleName TEXT PRIMARY KEY , 
                roles TEXT  
            ); 
        """
        cursor.executescript(sql) 
        get_connection().commit()
        print("Tables created successfully!")
        cursor.close()
    except Exception as ex : 
        print("cannot create tables")