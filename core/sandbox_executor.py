from schemas.schemas import Plan, StepResult, PlanResult
import subprocess 


def execute_plan_in_sandbox(plan : Plan) -> PlanResult : 
    results = [ ]
    for step in plan.steps :
        response = subprocess.run(["docker" , "run" , "--rm" , "ubuntu" , "bash" , "-c" , step.command] , capture_output=True , text=True) 

        results.append(StepResult(step_name=step.step_name , command=step.command , output=response.stdout,error=response.stderr ))
    
    return PlanResult(steps_result=results)