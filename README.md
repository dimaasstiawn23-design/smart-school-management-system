# 🏫 Smart School Management System (Backend)

Enterprise-grade backend system built with NestJS, TypeScript, PostgreSQL, and Docker. Designed with clean architecture, strict role-based access control (RBAC), and secure JWT authentication.

## 🚀 Tech Stack
* **Framework:** NestJS (v10)
* **Language:** TypeScript
* **Database:** PostgreSQL & TypeORM
* **Authentication:** Passport.js, JWT, bcrypt
* **Containerization:** Docker & Docker Compose

---

## 📂 Project Progress & Changelog

### **Phase 1: Foundation & Infrastructure (Completed)**
* [x] Initialized Dockerized NestJS and PostgreSQL environment.
* [x] Configured TypeORM database connection and entity synchronization.

### **Phase 2: User Management & RBAC (Completed)**
* [x] Created `User` and `Student` entities with proper relations.
* [x] Implemented secure user registration (`POST /users/register`) with password hashing (`bcrypt`).
* [x] Added input validation using `class-validator` and `class-transformer`.

### **Phase 3: Authentication & JWT (Completed)**
* [x] Implemented `AuthModule`, `AuthService`, and `AuthController`.
* [x] Created secure login endpoint (`POST /auth/login`) with credential verification.
* [x] Integrated `Passport-JWT` strategy for token-based route protection.

---

## 🛠️ How to Run Locally

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd smart-school-system