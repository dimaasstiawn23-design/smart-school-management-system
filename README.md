# 🏫 Smart School Management System (Backend)

Enterprise-grade backend system built with NestJS, TypeScript, PostgreSQL, and Docker. Designed with clean architecture, strict role-based access control (RBAC), and secure JWT authentication.

## 🚀 Tech Stack
* **Framework:** NestJS (v10)
* **Language:** TypeScript
* **Database:** PostgreSQL & TypeORM
* **Authentication:** Passport.js, JWT, bcrypt
* **Authorization:** Role-Based Access Control (RBAC) via Custom Guards & Decorators
* **Containerization:** Docker & Docker Compose
* **Validation:** `class-validator`, `class-transformer`

---

## 📂 Project Progress & Changelog

### **Phase 1: Foundation & Infrastructure (Completed)**
* [x] Initialized Dockerized NestJS and PostgreSQL environment.
* [x] Configured TypeORM database connection and entity synchronization.

### **Phase 2: User Management (Completed)**
* [x] Created `User` and `Student` entities with proper relations.
* [x] Implemented secure user registration with password hashing (`bcrypt`).
* [x] Added input validation using `class-validator` and `class-transformer`.

### **Phase 3: Authentication & JWT (Completed)**
* [x] Implemented `AuthModule`, `AuthService`, and `AuthController`.
* [x] Created secure login endpoint (`POST /auth/login`) with credential verification.
* [x] Integrated `Passport-JWT` strategy for token-based route protection.

### **Phase 4: Security, Guards & RBAC (Completed)**
* [x] Implemented `JwtAuthGuard` for securing private endpoints.
* [x] Created custom `@Roles` decorator and `RolesGuard` for role-based authorization (`admin` vs `student`).
* [x] Verified strict access control (`401 Unauthorized` and `403 Forbidden` responses).

### **Phase 5: Class Management Module (Completed)**
* [x] Created `ClassEntity`, DTO, Service, and Controller.
* [x] Implemented class creation and retrieval endpoints restricted exclusively to administrators.

### **Phase 6: Subject Management Module (Completed)**
* [x] Created `SubjectEntity`, DTO, Service, and Controller for curriculum management.
* [x] Added strict duplicate validation for subject codes and names.

### **Phase 7: Grades & Student Portal Module (Completed)**
* [x] Created `GradeEntity` with `ManyToOne` relations linking students, subjects, and classes.
* [x] Implemented score validation (range 0 to 100) using `class-validator`.
* [x] Added self-service portal endpoint (`GET /grades/my-grades`) enabling students to securely view their own academic reports using active JWT tokens.

---

## 📌 API Documentation & Endpoints

| Method | Endpoint | Access Role | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Public | Mendaftarkan akun baru |
| `POST` | `/auth/login` | Public | Masuk dan mendapatkan JWT Token |
| `POST` | `/classes` | Admin | Menambah data kelas baru |
| `GET` | `/classes` | Authenticated | Melihat daftar seluruh kelas |
| `POST` | `/subjects` | Admin | Menambah mata pelajaran baru |
| `GET` | `/subjects` | Authenticated | Melihat daftar mata pelajaran |
| `POST` | `/grades` | Admin | Input nilai ujian siswa |
| `GET` | `/grades` | Admin | Melihat seluruh rekap nilai sekolah |
| `GET` | `/grades/my-grades` | Student | Siswa melihat rekap nilai pribadi |

---

## 🛠️ How to Run Locally

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd smart-school-system