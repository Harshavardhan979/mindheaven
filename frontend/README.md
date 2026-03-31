# Online Mental Health Support & Therapy Web Application

Welcome to the Online Mental Health platform repository! 
This project is an end-to-end full-stack web application designed for mental well-being, connecting patients with licensed therapists through a premium, modern dashboard environment.

## Tech Stack
- **Frontend**: React (Vite), React Router, Axios, Vanilla CSS (Glassmorphism layout)
- **Backend**: Python (Django), Django REST Framework, Simple JWT Authentication
- **Database**: SQLite (default Django DB)

---

## 🚀 How to Run the Project Locally

The project uses a decoupled architecture, so the **Backend API** and the **Frontend Client** need to be run separately. Open two terminal instances to run them simultaneously:

### 1. Start the Django Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Activate the virtual environment:
   ```bash
   # On Windows
   .\venv\Scripts\activate
   
   # On Mac/Linux
   source venv/bin/activate
   ```
3. Run the Django development server:
   ```bash
   python manage.py runserver
   ```
The backend API is now running locally at: `http://127.0.0.1:8000/`.

### 2. Start the React Frontend

Open a **new terminal tab/window** and run everything relative to the project root:

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Make sure you have the required Node packages installed:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
The frontend is now running at `http://localhost:5173/`. 
_Navigate to this URL in your browser to interact with the application!_

---

## 💡 Quick Tips
- To test the workflows, click **"Sign Up"** and create at least one `Patient` account and one `Therapist` account. 
- A patient can log into the Patient Dashboard to take assessments, track moods, and browse/book sessions from the Therapist Directory.
- A therapist can log into the Therapist Dashboard, instantiate their qualifications/availability, and accept incoming booking requests.
