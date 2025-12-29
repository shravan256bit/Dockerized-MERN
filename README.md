

```markdown
## 📖 Description

This project is a simple **Employee Todo MERN application** built with React, Node.js/Express, and MongoDB.  
It is primarily designed as a learning project to practice **DevOps-related workflows** such as containerization with Docker, environment variable management, networking between services, and deployment on AWS EC2.  
The focus is not on application complexity, but on using a real-world stack to explore DevOps best practices.
```

```markdown
# Employee Todo MERN Application

A simple **Employee Todo** application built with the MERN stack:

- **Frontend:** React  
- **Backend:** Node.js + Express  
- **Database:** MongoDB  
- **Configuration:** Environment variables  
- **Deployment:** Local system (default) or AWS EC2 (with `.env` setup)  

---

## 📦 Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed on your system
- AWS EC2 instance (if deploying remotely)

---

## 🗄️ Database Setup
Run MongoDB container (same for local and EC2):

```bash
docker volume create mongo_data
docker run -d --name mongodb --network mern-network -p 27017:27017 -v mongo_data:/data/db mongo:6.0
```

Create Docker network:

```bash
docker network create mern-network
```

---

## 🚀 Running on EC2
1. Uncomment `.env` details in both frontend and backend.
2. Add your **EC2 Public IP** in the environment variables.
3. Run:

```bash
docker compose up -d
```

---

## 🐳 Running Without Compose

### Frontend
```bash
cd employee-todo-frontend
docker build -t employee-frontend .
docker run -d \
  --name frontend \
  --network mern-network \
  -p 3000:3000 \
  -e REACT_APP_API_URL=http://<EC2-PUBLIC-IP>:5000/api/todos \
  employee-frontend
```

### Backend
```bash
cd employee-todo-backend
docker build -t employee-backend .
docker run -d \
  --name backend \
  --network mern-network \
  -p 5000:5000 \
  -e MONGO_URL=mongodb://mongodb:27017/employee_todo \
  employee-backend
```

### MongoDB (with volume)
```bash
docker volume create mongo_data
docker run -d \
  --name mongodb \
  --network mern-network \
  -p 27017:27017 \
  -v mongo_data:/data/db \
  mongo:6.0
```

---

## 💻 Running Locally (Without Docker)

### Backend
```bash
cd employee-todo-backend
npm install
npm run dev
```

### Frontend
```bash
cd employee-todo-frontend
npm install
npm start
```

---

## 🌍 Accessing the Application
- **Frontend:** `http://<EC2-PUBLIC-IP>:3000`
- **Backend API:** `http://<EC2-PUBLIC-IP>:5000/api/todos`
- **MongoDB:** `mongodb://<EC2-PUBLIC-IP>:27017/employee_todo`

---

## 📖 Notes
- Use `mern-network` for container communication.
- Replace `<EC2-PUBLIC-IP>` with your actual EC2 instance public IP.
- MongoDB data is persisted in the `mongo_data` Docker volume.
- To reset the database completely:
  ```bash
  docker rm -f mongodb
  docker volume rm mongo_data
  ```
```