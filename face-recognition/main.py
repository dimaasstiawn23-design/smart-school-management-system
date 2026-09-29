from fastapi import FastAPI

app = FastAPI(title="Smart School Face Recognition Service", version="1.0")

@app.get("/")
def read_root():
    return {"status": "success", "message": "Face Recognition Microservice is running!"}

@app.post("/verify-face")
def verify_face():
    # Placeholder logika face recognition yang akan dikembangkan nanti
    return {"message": "Endpoint for facial verification ready."}