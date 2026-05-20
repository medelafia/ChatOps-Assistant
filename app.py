from fastapi import FastAPI , HTTPException, Depends, Response 
from fastapi.security import OAuth2PasswordRequestForm 
from core.planner import plan
from schemas import schemas
from fastapi.middleware.cors import CORSMiddleware
from core.sandbox_executor import execute_plan_in_sandbox 
from auth.auth import create_access_token  , get_current_user
from services.user_services import check_user_password , get_user_by_username, create_super_user
from contextlib import asynccontextmanager
from db.sqlite_connection import create_all_tables



@asynccontextmanager 
async def lifespan(app : FastAPI) : 
    print("StartUp Now")
    print("StartUp Now")
    create_all_tables()
    create_super_user()
    yield
    print("ShuttingDown Now")

app = FastAPI(lifespan=lifespan) 

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # Use ["*"] to allow all (not recommended for production)
    allow_credentials=True,      # Set to True if you need to support cookies
    allow_methods=["*"],         # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],         # Allow all request headers
)

@app.get("/chat") 
def generate_plan(message : str) -> schemas.Response : 
    return schemas.Response(type="PLAN" , content=plan(message))

@app.post("/executePlan")
def execute_plan_route(plan : schemas.Plan) -> schemas.Response :
    return schemas.Response(type="PLAN_RESULT" , content=execute_plan_in_sandbox(plan))

@app.post("/api/v1/auth/token")
async def login_for_access_token(response : Response , form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user_by_username(form_data.username)
    if user is None or not check_user_password( form_data.password , user.password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": user.username , "role" : user.roles})

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False, # HTTPS only
        samesite="lax",
        max_age=1800
    )
    return {"status" : "success"}


@app.get("/api/v1/auth/me")
async def verify_me(user : dict = Depends(get_current_user)):
    user.update({"status" : "success" })
    return user

