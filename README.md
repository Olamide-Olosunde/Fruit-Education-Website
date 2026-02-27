# Fruit-Education-Website
A production-style full-stack web application that allows users to learn about fruits and manage user accounts via a RESTful API.

# Live Demo
https://fruit.iamola.net/

# Purpose
This project was built to demonstrate full-stack development concepts including REST API design, authentication workflows, containerization, and production-style deployment.

# Architecture Overview
* Client (HTML/CSS/JS)
* Reverse Proxy: **NGINX**
* Backend API: **Node.js** + Express
* Containerized with **Docker**
* Hosted on **DigitalOcean**

# Technical Highlights
* RESTful API architecture
* Full CRUD operations on users (backend)
* Authentication system (registration + login)
* Dockerized multi-service setup
* Reverse proxy configuration with NGINX
* Cloud deployment on DigitalOcean
* Environment-based configuration management
* Modular route/controller structure

# Authentication
Current implementation:
* User registration and login system
* Backend validation
* User management endpoints

Planned security upgrades:
* Password hashing using bcrypt
* JWT-based authentication
* Route protection middleware

# Installation
### 1. Start the docker engine
Simply open the [Docker Desktop App](https://docs.docker.com/desktop/setup/install/windows-install/)
### 2. Pull Images
Run these commands:
```
docker pull ohhhla/fruit:backend
docker pull ohhhla/fruit:frontend
```
### 3. Create docker-compose.yml
Create a file called docker-compose.yml and paste the following in it:
```
version: "3.9"

services:
  backend:
    image: ohhhla/fruit:backend
    container_name: backend
    ports:
      - "3005:3005"

  frontend:
    image: ohhhla/fruit:frontend
    container_name: frontend
    ports:
      - "60:80"
    depends_on:
      - backend

volumes:
  data:
```
### 4. Run the App
Run this command:
```
docker compose up -d
```
### Frontend will be available at
```
http://localhost:60
```

# API Endpoints
Base URL:
```
http://localhost:3005
```
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | /api/user | Create new user |
| GET | /api/user/:Email | Retrieve a user by email |
| GET | /api/user/ | Retrieve all users |
| PUT | /api/user/:id | Update an existing user |
| DELETE | /api/user/:id | Delete a user |

# What I learned
* REST API design principles
* Authentication flow implementation
* Docker container orchestration
* Reverse proxy configuration
* Deploying full-stack apps to cloud infrastructure
* Environment variable management
