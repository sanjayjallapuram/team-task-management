# Team Task Manager

# Live Links:

Frontend URL: https://team-task-managment-frontend.onrender.com

Backend URL: https://team-task-management-backend-1.onrender.com

# GitHub Repository

https://github.com/sanjayjallapuram/team-task-management

# Backend Setup

## 1. Clone Repository

git clone https://github.com/sanjayjallapuram/team-task-management.git

## 2. Navigate to Backend

cd backend

## 3. Configure Environment Variables

Update `application.properties`:

spring.data.mongodb.uri=${MONGO_URI}

jwt.secret=${JWT_SECRET}

frontend.urls=${FRONTEND_URLS}

server.port=${PORT:8080}

## 4. Add Environment Variables

Create environment variables:

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

FRONTEND_URLS=http://localhost:5173,https://your-frontend-url.com


## 5. Build Backend

mvn clean install

## 6. Run Backend

mvn spring-boot:run

Backend runs on:   http://localhost:8080

# Frontend Setup

## 1. Navigate to Frontend

cd frontend

## 2. Install Dependencies

npm install


## 3. Configure Environment Variables

Create `.env`:

VITE_API_URL=http://localhost:8080

## 4. Run Frontend

npm run dev

Frontend runs on:   http://localhost:5173

# Deployment Steps

# Backend Deployment (Render/ Railway)

## 1. Push Backend to GitHub

git add .
git commit -m "backend deployment"
git push

## 2. Create New Project

Open Render
Connect GitHub repository
Select backend repository

## 3. Add Environment Variables

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
FRONTEND_URLS=https://your-frontend-url.com

## 4. Deploy Backend

Platform automatically:

* Builds Maven project
* Runs Spring Boot application

# Frontend Deployment (Render / Vercel)

## 1. Push Frontend to GitHub

git add .
git commit -m "frontend deployment"
git push

## 2. Create Frontend Project

Import GitHub repository
Select frontend repository

## 3. Add Environment Variable

VITE_API_URL=https://your-backend-url.com

## 4. Deploy Frontend

Build command:
npm run build

Publish directory:
dist

# Tech Stack

## Frontend

* React.js (Vite)
* React Router DOM
* Axios
* Plain CSS

## Backend

* Spring Boot
* Spring Security
* JWT Authentication
* MongoDB
* Maven

## Database

* MongoDB Atlas

## Deployment

* Frontend: Render
* Backend: Render 

# Project Structure

## Frontend Structure

frontend/
 ├── src/
 │    ├── api/
 │    ├── components/
 │    ├── context/
 │    ├── pages/
 │    ├── routes/
 │    ├── styles/
 │    └── App.jsx
 ├── public/
 └── package.json

## Backend Structure

backend/
 ├── src/main/java/
 │    ├── config/
 │    ├── controller/
 │    ├── dto/
 │    ├── entity/
 │    ├── repository/
 │    ├── security/
 │    ├── service/
 │    └── util/
 ├── src/main/resources/
 └── pom.xml


# Features

## Authentication

* User Signup
* User Login
* JWT Authentication
* Protected Routes
* Logout Functionality

## Project Management

* Create Projects
* Add Members to Project
* Remove Members from Project
* View Assigned Projects

## Task Management

* Create Tasks
* Assign Multiple Users to Tasks
* Add Users to Existing Tasks
* Remove Users from Tasks
* Update Task Status
* Task Priorities
* Due Dates

## Dashboard

* Total Tasks
* Tasks By Status
* Tasks Per User
* Overdue Tasks

## Role-Based Access Control (RBAC)

### Admin

* Manage Projects
* Manage Members
* Create Tasks
* Assign Users
* Remove Users
* View All Project Tasks

### Member

* View Assigned Projects
* View Assigned Tasks Only
* Update Assigned Task Status

# API Endpoints

## Authentication

http
POST /api/auth/signup
POST /api/auth/login

## Projects

http
POST /api/projects
GET /api/projects/my
PUT /api/projects/{projectId}/members/{userId}
DELETE /api/projects/{projectId}/members/{userId}

## Tasks

http
POST /api/tasks/{projectId}
GET /api/tasks/{projectId}
PUT /api/tasks/{taskId}/status
PUT /api/tasks/{taskId}/add-users
DELETE /api/tasks/{taskId}/remove-user/{userId}

## Dashboard

http
GET /api/dashboard

# Security Features

* JWT Authentication
* Password Encryption using BCrypt
* Protected APIs
* Role-Based Authorization
* Spring Security
* CORS Configuration

# Demo Video

