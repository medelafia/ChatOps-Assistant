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


def plan(message : str) : 
    response = llm.invoke(
        [(
            "system" , 
            """
                You are an expert Linux system administrator.
                Given a user request, generate the exact Linux command(s) required to complete the task.
                Ensure:
                - Commands are safe and follow best practices
                - Prefer non-destructive operations when possible
                - Identify risky operations (e.g., deletion, system modification)

                Each command must include:
                - step: short title
                - description: explanation of what the command does
                - command: the exact Linux command
                - risk: low, medium, high or critical (based on potential system impact)
                Return ONLY valid JSON. No markdown, no explanations.
                
            """
        ),
        (
            "user" , 
            message 
        )]
    )
    return response


