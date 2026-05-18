import sqlite3 


connection =  None 

def get_connection() : 
    if connection is None : 
        try : 
            connection = sqlite3.connect("db/__db__.db") 
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
                roles TEXT  
            ); 
        """
        cursor.execute(sql) 
        get_connection().commit()
        print("Tables created successfully!")
    except Exception as ex : 
        print("cannot create tables")
    finally : 
        cursor.close()