from fastapi import FastAPI 
from core.llm_services import generate_commands , analyse_plan_and_launch_execution  
from schemas.schemas import PlanResult , Plan

app = FastAPI() 

@app.get("/chat") 
def chat_route(message : str) -> Plan : 
    return generate_commands(message)


@app.get("/executePlan")
def execute_plan_route(plan : Plan) -> PlanResult :
    return analyse_plan_and_launch_execution(plan)