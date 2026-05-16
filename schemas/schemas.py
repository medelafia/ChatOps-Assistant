from pydantic import BaseModel , Field
from typing import List


class Step(BaseModel) : 
    step_name : str = Field(description="Short title of the step")
    step_desciption : str = Field(description="Explanation of the command")
    command : str = Field(description="Linux command to execute")
    risk : str = Field(description="potential system impact")

class Plan(BaseModel) : 
    steps : List[Step]


class StepResult(BaseModel) :
    step_name : str = Field(description="Short title of the step")
    command : str = Field(description="Linux command to execute")
    output : str = Field(description="Stdout of command")

class PlanResult(BaseModel) : 
    steps_result : List[StepResult]

