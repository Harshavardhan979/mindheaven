# Online Mental Health Support & Therapy Web Application

Welcome to the **MindHaven** repository! 

This decoupled full-stack project serves as a comprehensive online platform for mental health and well-being. It provides user authentication, dashboards, an interactive therapist directory, appointment bookings, self-assessments, and a curated resource library.

## 🏗️ Architecture

The project is structured into two completely independent environments:

- **`/backend`**: The Django REST API (handles database, authentication, and logic).
- **`/frontend`**: The Vite + React Single Page Application (handles UI, routing, and visuals).

## 🚀 Getting Started Locally

You must run both the backend API and the frontend client simultaneously to fully use the application.

### 1. Run the Django Backend
Open a terminal and navigate to the backend directory:
```bash
cd backend
```
Activate the virtual environment (if you haven't already):
```bash
# On Windows
.\venv\Scripts\activate

# On Mac/Linux
source venv/bin/activate
```
Start the server:
```bash
python manage.py runserver
```

### 2. Run the React Frontend
Open a **new** terminal tab/window and navigate to the frontend directory:
```bash
cd frontend
```
Install the node packages (only needed the first time):
```bash
npm install
```
Start the Vite development server:
```bash
npm run dev
```

### 3. Usage
Navigate to the local Vite URL outputted in your console (usually `http://localhost:5173/`).
Register two accounts (one as a Patient and one as a Therapist) to test the booking and dashboard features!

---
*Developed with modern React, Django REST Framework, and beautiful Vanilla CSS aesthetics.*
