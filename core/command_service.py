import subprocess
from schemas.schemas import Plan, StepResult, PlanResult
def execute_plan(plan : Plan) : 
    results = []
    for step in plan.steps : 
        process = subprocess.run(step.command , capture_output=True)
        results.append(StepResult(step_name=step.step_name , command=step.command ,output=process.stdout))
    
    return  PlanResult(steps_result=results)