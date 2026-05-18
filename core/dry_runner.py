from langchain_groq import ChatGroq
import os
from schemas.schemas import Plan 

API_KEY = os.environ.get("GROQ_API_KEY")
custom_profile = {
    "structured_output": True
}
llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0,
    api_key=API_KEY, 
    profile=custom_profile, 
)
llm = llm.with_structured_output(Plan)


def simulate_simple_command() : 
    pass 


def dry_run_devops_command() : 
    pass 