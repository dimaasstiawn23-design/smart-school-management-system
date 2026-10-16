# 🏫 Smart School Management System (SIMASTER-Lite)

Sistem manajemen sekolah modern, modular, dan *scalable* terinspirasi dari arsitektur SIMASTER, dirancang untuk mengelola operasional institusi pendidikan secara digital secara end-to-end.

## 🚀 Tech Stack

### **Backend**
* **Framework:** NestJS (v10, TypeScript)
* **Database:** PostgreSQL & TypeORM (via Docker / Docker Compose)
* **Authentication:** Passport.js, JSON Web Token (JWT) Guard & Strategy, bcrypt
* **Authorization:** Role-Based Access Control (RBAC) via Custom Guards & Decorators (`admin` vs `student`)
* **Validation:** `class-validator`, `class-transformer`

### **Frontend**
* **Framework:** Next.js 16 (App Router, TypeScript)
* **Styling:** Tailwind CSS
* **HTTP Client:** Axios dengan Interceptor Terpusat (Automatic Bearer Token Injection dari `localStorage`)

---

## 📂 Project Progress & Changelog

### **Phase 1: Foundation & Infrastructure (Completed)**
- [x] Initialized Dockerized NestJS and PostgreSQL environment.
- [x] Configured TypeORM database connection and entity synchronization.

### **Phase 2: User Management (Completed)**
- [x] Created `User` and `Student` entities with proper relational mapping.
- [x] Implemented secure user registration with password hashing (`bcrypt`).
- [x] Added strict input validation using `class-validator`.

### **Phase 3: Authentication & JWT (Completed)**
- [x] Implemented `AuthModule`, `AuthService`, and `AuthController`.
- [x] Created secure login endpoint (`POST /auth/login`) with credential verification and flexible token response handling (`access_token`, `accessToken`, `token`).
- [x] Integrated `Passport-JWT` strategy for token-based route protection.

### **Phase 4: Security, Guards & RBAC (Completed)**
- [x] Implemented `JwtAuthGuard` for securing private endpoints.
- [x] Created custom `@Roles` decorator and `RolesGuard` for role-based authorization.

### **Phase 5: Class Management Module (Completed)**
- [x] Created `ClassEntity`, DTO, Service, and Controller.
- [x] Implemented class creation and retrieval endpoints with admin restriction.

### **Phase 6: Subject Management Module (Completed)**
- [x] Created `SubjectEntity`, DTO, Service, and Controller for curriculum management.
- [x] Added strict duplicate validation for subject codes and names.

### **Phase 7: Grades & Student Portal Module (Completed)**
- [x] Created `GradeEntity` with `ManyToOne` relations linking students, subjects, and classes.
- [x] Implemented score validation (range 0 to 100) using `class-validator`.
- [x] Added self-service portal endpoint (`GET /grades/my-grades`) enabling students to securely view their academic reports.

### **Phase 8: Schedules / Jadwal Pelajaran Module (Completed)**
- [x] Created `ScheduleEntity` with relations linking classes and subjects.
- [x] Implemented schedule creation restricted to administrators (`POST /schedules`).
- [x] Added authenticated endpoints to view all schedules or filter by class ID (`GET /schedules/class/:classId`).

### **Phase 9: Attendance / Kehadiran Siswa Module (Completed)**
- [x] Created `AttendanceEntity` and `AttendanceStatus` enum (Hadir, Sakit, Izin, Alpa).
- [x] Implemented attendance creation (`POST /attendance`) and admin overview (`GET /attendance`).
- [x] Added student self-service portal endpoint (`GET /attendance/my-attendance`).

---

## ✨ Fitur Frontend & Modul Selesai
1. **Sistem Autentikasi (`/login`):**
   * Login aman dengan token JWT dan penanganan ekstraksi token fleksibel.
   * Token disimpan di `localStorage` dan otomatis disisipkan ke setiap HTTP Request melalui Axios Interceptor.
2. **Dashboard Utama (`/dashboard`):**
   * Layout terpusat dengan navigasi Sidebar yang responsif.
3. **Manajemen Kelas (`/dashboard/classes`):**
   * Fitur Lihat (GET) dan Tambah (POST) data kelas.
4. **Manajemen Mata Pelajaran (`/dashboard/subjects`):**
   * Full CRUD (Create, Read, Update, PATCH, Delete) lengkap dengan penanganan error interaktif.
5. **Manajemen Guru & Siswa (`/dashboard/teachers` & `/dashboard/students`):**
   * Pendataan NIP/NISN, spesialisasi, relasi kelas, dan penghapusan data.

---

## 📡 API Endpoints Reference

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
| `POST` | `/schedules` | Admin | Menambah jadwal pelajaran baru |
| `GET` | `/schedules` | Authenticated | Melihat seluruh daftar jadwal pelajaran |
| `GET` | `/schedules/class/:classId` | Authenticated | Melihat jadwal berdasarkan kelas tertentu |
| `POST` | `/attendance` | Admin | Mencatat status kehadiran siswa |
| `GET` | `/attendance` | Admin | Melihat seluruh rekap kehadiran sekolah |
| `GET` | `/attendance/my-attendance` | Student | Siswa melihat riwayat kehadiran pribadi |

---

## 🛠️ How to Run Locally

### 1. Clone Repositori & Setup Environment
Pastikan Anda sudah menginstal **Node.js**, **Docker**, dan **Git**.

```bash
git clone <repository-url>
cd smart-school-system