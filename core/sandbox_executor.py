from schemas.schemas import Plan, StepResult, PlanResult
import subprocess 


def execute_plan_in_sandbox(plan : Plan) -> PlanResult : 
    container_id = subprocess.run(["docker" ,"run" ,"-dit","ubuntu"] , capture_output=True ,text=True ).stdout
    print(container_id)
    results = [ ]
    for step in plan.steps :
        stepResult = None
        try : 
            response = subprocess.run(["docker" , "exec" , "-it" , container_id , "bash", "-c" , step.command.replace("sudo","")] , capture_output=True , text=True , timeout=30) 
            stepResult = StepResult(step_name=step.step_name , command=step.command , output=response.stdout,error=response.stderr )
        except TimeoutError : 
            stepResult = StepResult(step_name=step.step_name , command=step.command , output="",error="Timeout error, Command take time to execute" )
        results.append(stepResult)
    
    subprocess.run(["docker" , "rm" , "-f" , container_id])
    return PlanResult(steps_result=results)