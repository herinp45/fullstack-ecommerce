# 🛍️ Full-Stack E-commerce Application

## 📌 Overview

This project is a full-featured e-commerce website built using modern backend and frontend technologies. It supports core functionalities like product management, user authentication, cart and order management, secure payments, and more.

---

## 🎯 Core Features

- User Authentication (JWT)
- Product Listing & Filtering
- Product Categories
- Cart Management
- Checkout & Order Placement
- Stripe Payment Gateway Integration
- Responsive Frontend (React)
- Secure Backend (Spring Boot)
- Dockerized Microservices
- CI/CD Pipeline
- AWS Deployment

---

## 🛠 Tech Stack

### 🔙 Backend:
- Java 17
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Spring Security + JWT
- Stripe SDK
- Docker
- Maven

### 🔜 Frontend:
- React.js
- Axios
- React Router
- Tailwind CSS

### 🚀 Deployment:
- AWS EC2 / S3 / RDS
- GitHub Actions for CI/CD
- Docker Compose

---

## ⚡️ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/herinp45/fullstack-ecommerce.git
cd fullstack-ecommerce
```

---

## 🖥️ Local Installation

### Backend Setup

#### Prerequisites
- Java 17+
- Maven
- PostgreSQL (or use Docker, see below)

#### Environment Variables
Copy the example file and fill in values:
```bash
cp backend/.env.example backend/.env
```

Main variables:
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `JWT_SECRET`
- `STRIPE_SECRET_KEY`
- (others as required)

#### Run Backend

```bash
cd backend
mvn spring-boot:run
```

---

### Frontend Setup

#### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

#### Environment Variables
Copy the example file and fill in values:
```bash
cp frontend/.env.example frontend/.env
```
Main variables:
- `REACT_APP_API_URL`
- (others as required)

#### Run Frontend

```bash
cd frontend
npm install
npm start
```
App will run at `http://localhost:3000`.

---

## 🐳 Docker Setup (Recommended)

You can run the entire stack using Docker and Docker Compose:

```bash
docker-compose up --build
```

This will start frontend, backend, and the database containers. Update environment variables as needed in the respective `.env` files or in `docker-compose.yml`.

---

## 🧪 Running Tests

### Backend

```bash
cd backend
mvn test
```

### Frontend

```bash
cd frontend
npm test
```

---

## ☁️ Deployment

The project is ready to deploy on AWS using EC2, S3 (for static assets), and RDS (for the database). Docker images can be pushed to ECR for production. CI/CD is set up with GitHub Actions.

---

## 🗂️ Project Structure

```
fullstack-ecommerce/
├── backend/         # Spring Boot application
├── frontend/        # React application
├── docker-compose.yml
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for features, fixes, or improvements.

1. Fork this repo
2. Create your branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add a new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

---

## 📬 Contact

For any questions or support, open an issue or contact [herinp45](https://github.com/herinp45).
