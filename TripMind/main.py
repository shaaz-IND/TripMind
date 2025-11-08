import os
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from agent.travel_agent import TravelPlannerAgent, user_preferences_store
import uvicorn

# Initialize FastAPI app
app = FastAPI(title="Travel Planner AI Agent")

# Initialize the AI agent
agent = TravelPlannerAgent()

# In-memory storage
bookings_store: List[Dict[str, Any]] = []

# Request/Response models
class TravelQuery(BaseModel):
    query: str

class TravelResponse(BaseModel):
    status: str
    response: str
    request: str = ""
    error: str = ""

class Booking(BaseModel):
    id: Optional[str] = None
    destination: str
    start_date: str
    end_date: str
    budget: float
    status: str = "planned"
    description: str = ""
    created_at: Optional[str] = None

class PreferencesUpdate(BaseModel):
    preferences: Dict[str, Any]

# Serve static files
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def read_root():
    """Serve the main HTML page."""
    return FileResponse("static/index.html")

@app.post("/api/plan", response_model=TravelResponse)
async def plan_trip(query: TravelQuery):
    """
    Main endpoint for travel planning.
    Accepts natural language queries and returns AI-generated travel plans.
    """
    try:
        result = agent.plan_trip(query.query)
        
        return TravelResponse(
            status=result.get("status", "success"),
            response=result.get("response", ""),
            request=result.get("request", query.query),
            error=result.get("error", "")
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/reset")
async def reset_memory():
    """Reset the agent's conversation memory."""
    try:
        agent.reset_memory()
        return {"status": "success", "message": "Memory cleared"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/history")
async def get_history():
    """Get conversation history."""
    try:
        history = agent.get_conversation_history()
        return {"status": "success", "history": history}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/preferences")
async def get_preferences():
    """Get saved user preferences."""
    try:
        return {
            "status": "success",
            "preferences": user_preferences_store
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/preferences/update")
async def update_preferences(update: PreferencesUpdate):
    """Update user preferences."""
    try:
        user_preferences_store.update(update.preferences)
        return {
            "status": "success",
            "message": "Preferences updated successfully",
            "preferences": user_preferences_store
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/bookings")
async def get_bookings():
    """Get all bookings."""
    try:
        return {
            "status": "success",
            "bookings": bookings_store
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/bookings")
async def create_booking(booking: Booking):
    """Create a new booking."""
    try:
        booking_dict = booking.dict()
        booking_dict["id"] = f"booking_{len(bookings_store) + 1}"
        booking_dict["created_at"] = datetime.now().isoformat()
        bookings_store.append(booking_dict)
        return {
            "status": "success",
            "message": "Booking created successfully",
            "booking": booking_dict
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "Travel Planner AI Agent"}

if __name__ == "__main__":
    # Run the server on 0.0.0.0:8000 (frontend on 5000 will proxy to this)
    uvicorn.run(app, host="0.0.0.0", port=8000)
