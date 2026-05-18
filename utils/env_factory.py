from dotenv import load_dotenv 
import os
load_dotenv() 


variables = {
    "SECRET_KEY": None , 
    "SUPER_USER_USERNAME" : None , 
    "SUPER_USER_PASSWORD" : None
} 

def get_config(variable_key) : 
    global variables 

    if any([val is None for key , val in variables.items()]) : 
        for key in variables : 
            variables[key]= os.environ.get(key)
    
    return variables[variable_key]


