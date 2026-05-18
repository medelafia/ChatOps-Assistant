
ACCEPTED_COMMANDS = ["ls" , "cat" , "pwd" ,"grep" , "less" , 'tail' , 'cd' , 'mkdir' , 'uname' , 'locate' , 'touch' , 'ps' , 'man' , 'echo' , 'whoami' , 'sort' , 'cal' , 'whereis' , 'wc' ] 
NOT_ACCEPTED_COMMANDS = ['rm','dd','sudo','chmod','sh' ,'bash']


def verify(command) : 
    if '|' in command : 
        commands = command.split("|") 
    elif '&' in command : 
        commands = command.split("&") 

    for subcommand in commands : 
        if subcommand.split()[0] in NOT_ACCEPTED_COMMANDS : 
            return False
    
    return True